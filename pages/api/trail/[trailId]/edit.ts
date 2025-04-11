/* eslint-disable camelcase */
import { NextApiRequest, NextApiResponse } from 'next'
import {
  queryToFloat, queryToInt, queryToStrings, requireAll,
} from '../../../../src/func/queryParsing'
import { requireKnownUser } from '../../../../src/func/ServerHelpers'
import { insertTrail } from '../../../../src/func/trail/InsertTrail'
import { ServerClient } from '../../../../src/graph/hasura'
import { deleteTrail } from '../../../../src/func/trail/deleteTrail'
import { fixCalculatedNumbers } from '../../../../src/func/trail/fixCalculatedNumbers'
import { updateGoogleCalendar } from '../../../../src/func/calendar/updateGoogleCalendar'
import { hareAuthorized } from '../../../../src/func/trail/hareCheck'
import { loginRedirectLink, loginVerificationToken, sendEmails } from '../../../../src/func/email'
import moveAttendance, { reidentifyTrail } from '../../../../src/func/trail/moveAttendance'
import {
  GqlEditTrailInfoDocument, GqlEditTrailInfoQuery, GqlTrailInfoFragment,
  Hares_Insert_Input,
} from '../../../../src/graph/types'
import { ilogError, ilog } from '../../../../src/func/Logging'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    ilog('Trail edit API called', {
      method: req.method,
      url: req.url,
      body: req.body,
      query: req.query,
    })

    const user = await requireKnownUser(req, res)
    if (!user) {
      ilog('No user found for trail edit API')
      return
    }

    const {
      trailId,
      number,
    } = queryToInt(req.query)
    const {
      description,
      directions,
      name,
      start,
    } = queryToStrings(req.query)
    const {
      latitude,
      longitude,
    } = queryToFloat(req.query)
    requireAll({
      trailId, description, directions, latitude, longitude, name, start,
    })

    ilog('Trail edit API input validated', {
      trailId, number, description, directions, name, start, latitude, longitude,
    })

    let hares : Hares_Insert_Input[]
    const qhares = req.query.hares
    if (Array.isArray(qhares)) {
      hares = qhares.map((h) => ({ hasher: parseInt(h, 10) }))
    } else if (typeof qhares === 'string') {
      hares = [{ hasher: parseInt(qhares, 10) }]
    } else {
      hares = []
    }

    const sc = ServerClient()
    const info = await sc.query<GqlEditTrailInfoQuery>({
      query: GqlEditTrailInfoDocument,
      variables: { trailId },
    }).then((r) => {
      if (r.data.trails.length < 1) {
        throw new Error('Unable to find trail')
      }
      return r.data.trails[0]
    })

    ilog('Trail information retrieved', { trailId, info })

    const ot : GqlTrailInfoFragment = info.draftFor ?? info
    const isAuthorized = await hareAuthorized(sc, req, res, ot, user)

    const trailInfo = {
      calculated_number: number,
      description,
      directions,
      draft: null,
      google_calendar: ot.google_calendar,
      kennel: ot.kennel,
      latitude,
      longitude,
      name,
      number,
      start,
      hares,
      ...(ot.draft ? { createdById: user.id } : {}), // Include createdById only for drafts
    }

    if (!isAuthorized) {
      ilog('User not authorized to edit trail, creating draft', { userId: user.id, trailId })

      // Create a new draft for unauthorized users
      const draftId = await insertTrail(sc, {
        ...trailInfo,
        id: null,
        draft: ot.id,
        createdById: user.id,
      })

      res.redirect(`/trail/${draftId}?message=Draft created, a hare must approve`)
      return
    }

    ilog('User authorized to edit trail', { userId: user.id, trailId })

    if (isAuthorized) {
      ilog('Direct edit authorized, proceeding with trail update', { trailId })
      // Make edit directly
      // Insert new trail
      const tempId = await insertTrail(sc, {
        ...trailInfo,
        id: null,
        createdById: user.id,
      })
      await moveAttendance(sc, ot.id, tempId)
      await deleteTrail(sc, ot.id) // Delete original trail
      const reidentifySuccess = await reidentifyTrail(sc, tempId, ot.id) // Reidentify
      if (!reidentifySuccess) {
        res.status(500).json({ error: 'Failed to reidentify trail. Please try again later.' })
        return
      }
      await fixCalculatedNumbers(sc, ot.kennel)
      await updateGoogleCalendar(sc, ot.kennel, 1)

      // Redirect to the original trail ID for authorized users
      res.redirect(`/trail/${ot.id}?message=Trail updated successfully.`)
      return
    }

    ilog('Draft creation required for trail edit', { trailId })

    // Check if a draft already exists and if the user is the creator
    const existingDraft = ot.drafts?.find((draft) => draft.id === ot.id)

    if (existingDraft && existingDraft.createdById === user.id) {
      // Update the existing draft if the user is the creator
      await insertTrail(sc, {
        ...trailInfo,
        id: existingDraft.id,
        draft: ot.id,
        createdById: user.id,
      })
      res.revalidate(`/trail/${existingDraft.id}`) // Revalidate the updated draft
      res.redirect(`/trail/${existingDraft.id}?warning=Your changes have been saved to your draft. This is a draft and not the actual trail.`)
      return
    }

    // Create a new draft if none exists or if the user is not the creator
    const draftId = await insertTrail(sc, {
      ...trailInfo,
      id: null,
      draft: ot.id,
      createdById: user.id,
    })
    const personalizations = []
    for (let x = 0; x < ot.hares.length; x += 1) {
      const h = ot.hares[x]
      const to = h.hasherInfo.email!
      const subject = `${user.name || 'Some wanker'} has suggested some changes to your trail`
      // eslint-disable-next-line no-await-in-loop
      const token = await loginVerificationToken(to)
      personalizations.push({
        to,
        subject,
        dynamicTemplateData: {
          subject,
          body: `${user.name} has suggested some changes to your trail "${ot.name}". Please review the changes, and accept or decline them on the DrunkCircle website.`,
          url: loginRedirectLink(`/trail/${draftId}`, to, token),
          action: 'Review Changes',
        },
      })
    }
    await sendEmails(
      personalizations,
      'action',
      'draft',
    )
    res.revalidate(`/trail/${ot.id}`) // Show the draft on trail page if cached
    res.redirect(`/trail/${draftId}?warning=You don't have permission to edit this trail, but a request has been sent to the hares with your changes. This is a draft and not the actual trail.`)
  } catch (error) {
    ilogError('Error in trail edit API:', error)
    res.status(500).json({ error: 'An unexpected error occurred. Please try again later.' })
  } finally {
    if (!res.headersSent) {
      ilogError('Unexpected response: No redirect or response sent.', {
        method: req.method,
        url: req.url,
        body: req.body,
        query: req.query,
      })
    }
  }
}
