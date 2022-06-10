/* eslint-disable camelcase */
import { gql } from '@apollo/client'
import { NextApiRequest, NextApiResponse } from 'next'
import {
  queryToFloat, queryToInt, queryToStrings, requireAll,
} from '../../../../src/func/queryParsing'
import { requireKnownUser } from '../../../../src/func/ServerHelpers'
import { insertTrail } from '../../../../src/func/trail/InsertTrail'
import { ServerClient } from '../../../../src/graph/hasura'
import {
  GQLEditTrailInfo, GQLTrailInfoFragment,
  hares_insert_input,
} from '../../../../src/graph/types'
import { deleteTrail } from '../../../../src/func/trail/deleteTrail'
import { fixCalculatedNumbers } from '../../../../src/func/trail/fixCalculatedNumbers'
import { updateGoogleCalendar } from '../../../../src/func/calendar/updateGoogleCalendar'

function encodeQueryString(params: {[key: string] : string | number}) {
  return Object.keys(params).map((k) => `${k}=${encodeURIComponent(params[k])}`).join('&')
}

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
  let hares : hares_insert_input[]
  const qhares = req.query.hares
  if (Array.isArray(qhares)) {
    hares = qhares.map((h) => ({ hasher: parseInt(h, 10) }))
  } else if (typeof qhares === 'string') {
    hares = [{ hasher: parseInt(qhares, 10) }]
  } else {
    hares = []
  }

  const sc = ServerClient()
  const info = await sc.query<GQLEditTrailInfo>({
    query: gql`

fragment GQLTrailInfoFragment on trails {
  id
  draft
  google_calendar
  kennel
  hares {
    hasher
  }
}

query GQLEditTrailInfo($trailId: Int) {
  trails(where: {id: {_eq: $trailId}}, limit: 1) {
    ...GQLTrailInfoFragment
    draftFor {
      ...GQLTrailInfoFragment
    }
  }
}
    `,
    variables: { trailId },
  }).then((r) => {
    if (r.data.trails.length < 1) {
      throw new Error('Unable to find trail')
    }
    return r.data.trails[0]
  })

  const ot : GQLTrailInfoFragment = info.draftFor ?? info
  const isAuthorized = !ot.hares || ot.hares.length === 0
  || ot.hares.map((h) => h.hasher).includes(user.id)

  let progress = {
    completed: 0,
    total: 0,
    phase: 'Draft updated.',
  }

  if (isAuthorized) {
    // Make edit directly
    await deleteTrail(sc, ot.id) // Delete original trail
    await insertTrail(sc, {
      id: ot.id,
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
    })
    if (ot.id !== info.id) {
      await deleteTrail(sc, info.id) // Delete draft
    }
    fixCalculatedNumbers(sc, ot.kennel)
    progress = await updateGoogleCalendar(sc, ot.kennel)
  }

  if (progress.completed === progress.total) {
    res.redirect(`/trail/${ot.id}?message="Trail updated."`)
    return
  }

  res.redirect(`/trail/${ot.id}/updating?${encodeQueryString({
    ...progress,
    ...req.query,
  })}`)
}
