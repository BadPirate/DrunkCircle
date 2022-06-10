/* eslint-disable camelcase */
import { ApolloClient, gql, NormalizedCacheObject } from '@apollo/client'
import { NextApiRequest, NextApiResponse } from 'next'
import {
  queryToFloat, queryToInt, queryToStrings, requireAll,
} from '../../../../src/func/queryParsing'
import { requireKnownUser } from '../../../../src/func/ServerHelpers'
import { insertTrail } from '../../../../src/func/trail/InsertTrail'
import { ServerClient } from '../../../../src/graph/hasura'
import {
  GQLCalendarUpdate,
  GQLEditTrailInfo, GQLTrailInfoFragment,
  hares_insert_input,
} from '../../../../src/graph/types'
import { deleteTrail } from '../../../../src/func/trail/deleteTrail'
import { fixCalculatedNumbers } from '../../../../src/func/trail/fixCalculatedNumbers'
import { ProgressResult } from '../../../../src/func/SharedTypes'
import { insertCalendar, updateCalendar } from '../../../../src/func/calendar/updateGcal'
import { GQL_KENNEL_INFO_FRAGMENT, GQL_INSERT_FRAGMENT } from '../../../../src/func/calendar/gcalData'
import { gcal } from '../../../../src/api/google'

async function updateGoogleCalendar(
  ac: ApolloClient<NormalizedCacheObject>,
  kennelId: number,
  limit: number = 10,
) : Promise<ProgressResult> {
  const info = await ac.query<GQLCalendarUpdate>({
    query: gql`
${GQL_INSERT_FRAGMENT}
${GQL_KENNEL_INFO_FRAGMENT}
query GQLCalendarUpdate($kennelId: Int) {
  trails(where: {draft: {_is_null: true}, kennel: {_eq: $kennelId}, _and: {google_calendar: {_is_null: true}, gcal_dirty: {_eq: true}, _or: {draft: {_is_null: true}, start: {_is_null: false}, hares: {hasher: {_is_null: false}}}}}) {
    ...GQLInsertFragment
    google_calendar
    gcal_dirty
    kennelInfo {
      ...GQLKennelInfoFragment
    }
  }
}
    `,
    variables: { kennelId },
  }).then((r) => {
    if (!r.data.trails) {
      throw r.error ?? Error('Unable to fix google calendar information')
    }
    return r.data.trails
  })
  if (info.length === 0) {
    return {
      completed: 0,
      total: 0,
      phase: 'Google calendar update complete.',
    }
  }
  let completed = 0
  const { kennelInfo } = info[0]
  const cal = gcal(kennelInfo.google_token!, kennelInfo.google_refresh!)
  const add = info.filter((i) => i.google_calendar === null)
  for (let index = 0; index < add.length && completed < limit; index += 1) {
    const trail = add[index]
    // eslint-disable-next-line no-await-in-loop
    await insertCalendar(ac, cal, kennelInfo, trail)
    completed += 1
  }
  const update = info.filter((i) => i.google_calendar !== null && i.gcal_dirty)
  for (let index = 0; index < update.length && completed < limit; index += 1) {
    const trail = add[index]
    // eslint-disable-next-line no-await-in-loop
    await updateCalendar(ac, cal, kennelInfo, trail)
    completed += 1
  }
  return {
    completed,
    total: info.length,
    phase: info.length === completed ? 'Google calendar update complete.' : 'Updating google calendar...',
  }
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
    const updateProgress = await updateGoogleCalendar(sc, ot.kennel)
    res.json(updateProgress)
    return
  }

  res.json({
    completed: 0,
    total: 0,
    phase: 'Draft updated.',
  })
}
