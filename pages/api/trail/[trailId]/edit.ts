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
import { encodeQueryString } from '../../../../src/func/encodeQueryString'
import { hareAuthorized } from '../../../../src/func/trail/hareCheck'
import { loginRedirectLink, loginVerificationToken, sendEmails } from '../../../../src/func/email'
import moveAttendance, { reidentifyTrail } from '../../../../src/func/trail/moveAttendance'
import {
  GqlEditTrailInfoDocument, GqlEditTrailInfoQuery, GqlTrailInfoFragment,
  Hares_Insert_Input,
} from '../../../../src/graph/types'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const user = await requireKnownUser(req, res)
  if (!user) return
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

  const ot : GqlTrailInfoFragment = info.draftFor ?? info
  const isAuthorized = await hareAuthorized(sc, req, res, ot, user)

  let progress = {
    completed: 0,
    total: 0,
    phase: 'Draft updated.',
  }

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
  }

  if (isAuthorized) {
    // Make edit directly
    // Insert new trail
    const tempId = await insertTrail(sc, {
      ...trailInfo,
      id: null,
    })
    await moveAttendance(sc, ot.id, tempId)
    await deleteTrail(sc, ot.id) // Delete original trail
    await reidentifyTrail(sc, tempId, ot.id) // Reidentify
    await fixCalculatedNumbers(sc, ot.kennel)
    progress = await updateGoogleCalendar(sc, ot.kennel, 1)
  } else {
    const draftId = await insertTrail(sc, {
      ...trailInfo,
      id: null,
      draft: ot.id,
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
    res.redirect(`/trail/${draftId}?warning=You don't have permission to edit this trail, but a request has been sent to the hares with your changes, once they've approved it will update.`)
    return
  }

  if (progress.completed === progress.total) {
    res.redirect(`/api/trail/${ot.id}/revalidate?message=Trail updated.`)
    return
  }

  res.redirect(`/trail/${ot.id}/updating?${encodeQueryString({
    ...progress,
    kennelId: ot.kennel,
  })}`)
}
