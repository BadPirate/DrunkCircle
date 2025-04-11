import { NextApiRequest, NextApiResponse } from 'next'
import {
  queryToFloat, queryToInt, queryToStrings, requireAll,
} from '../../../../src/func/queryParsing'
import { requireKnownUser } from '../../../../src/func/ServerHelpers'
import { insertTrail, updateTrail } from '../../../../src/func/trail/InsertTrail'
import { ServerClient } from '../../../../src/graph/hasura'
import { hareAuthorized } from '../../../../src/func/trail/hareCheck'
import { ilogError, ilog } from '../../../../src/func/Logging'
import { GqlEditTrailInfoDocument } from '../../../../src/graph/types'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    ilog('Trail edit API called', {
      method: req.method, url: req.url, body: req.body, query: req.query,
    })

    const user = await requireKnownUser(req, res)
    if (!user) {
      ilog('No user found for trail edit API')
      res.status(401).json({ error: 'Unauthorized' })
      return
    }

    const { trailId, number } = queryToInt(req.query)
    const {
      description, directions, name, start,
    } = queryToStrings(req.query)
    const { latitude, longitude } = queryToFloat(req.query)
    requireAll({
      trailId, description, directions, latitude, longitude, name, start,
    })

    ilog('Trail edit API input validated', {
      trailId, number, description, directions, name, start, latitude, longitude,
    })

    const sc = ServerClient()
    const trailInfo = await sc.query({
      query: GqlEditTrailInfoDocument,
      variables: { trailId },
    }).then((r) => {
      if (r.data.trails.length < 1) {
        throw new Error(`Unable to find trail - ${trailId}`)
      }
      return r.data.trails[0]
    })

    ilog('Trail information retrieved', { trailId, trailInfo })

    const isAuthorized = await hareAuthorized(sc, req, res, trailInfo, user)

    const newTrailData = {
      calculated_number: number,
      description,
      directions,
      draft: trailInfo.draft,
      google_calendar: trailInfo.google_calendar,
      kennel: trailInfo.kennel,
      latitude,
      longitude,
      name,
      number,
      start,
      hares: parseHares(req.query.hares),
      createdById: trailInfo.createdById ?? user.id,
    }

    if (trailInfo.draft && trailInfo.createdById === user.id) {
      ilog('User is the creator of the draft, allowing direct editing', { userId: user.id, trailId })

      const updatedTrailId = await updateTrail(sc, newTrailData, trailInfo.id, trailInfo.kennel)

      res.redirect(`/trail/${updatedTrailId}?message=Draft updated successfully.`)
      return
    }

    if (isAuthorized) {
      ilog('User authorized to edit trail', { userId: user.id, trailId })

      const updatedTrailId = await updateTrail(sc, newTrailData, trailInfo.id, trailInfo.kennel)

      res.redirect(`/trail/${updatedTrailId}?message=Trail updated successfully.`)
      return
    }

    ilog('User not authorized to edit trail, creating draft', { userId: user.id, trailId })

    const draftId = await insertTrail(sc, {
      ...newTrailData, id: null, draft: trailInfo.id, createdById: user.id,
    })
    res.redirect(`/trail/${draftId}?warning=Draft created. A hare must approve.`)
  } catch (error) {
    ilogError('Error in trail edit API:', error)
    res.status(500).json({ error: 'An unexpected error occurred. Please try again later.' })
  }
}

// Updated the type to follow camel case and ensure it exists
interface HaresInsertInput {
  hasher: number;
}

function parseHares(haresQuery: any): HaresInsertInput[] {
  if (Array.isArray(haresQuery)) {
    return haresQuery.map((h) => ({ hasher: parseInt(h, 10) }))
  }
  if (typeof haresQuery === 'string') {
    return [{ hasher: parseInt(haresQuery, 10) }]
  }
  return []
}
