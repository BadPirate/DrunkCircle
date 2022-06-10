/* eslint-disable camelcase */
/* eslint-disable no-await-in-loop */
/* eslint-disable import/prefer-default-export */
import { gql } from '@apollo/client'
import { gcal } from '../../api/google'
import { ServerClient } from '../../graph/hasura'
import {
  GQLAddToCalendar, GQLRefreshKennelAddCount,
} from '../../graph/types'
import { GoogleLimit } from '../ServerHelpers'
import { ProgressResult } from '../SharedTypes'
import { insertCalendar } from './updateGcal'
import { GQL_KENNEL_INFO_FRAGMENT, GQL_INSERT_FRAGMENT } from './gcalData'

export async function createCalendarEntries(
  kennelID: string,
  limit: number = GoogleLimit,
): Promise<ProgressResult> {
  const ac = ServerClient()
  const kennelInfo = await ac.query<GQLRefreshKennelAddCount>({
    query: gql`
${GQL_KENNEL_INFO_FRAGMENT}

query GQLRefreshKennelAddCount($kennelID: Int) {
  kennels(where: {id: {_eq: $kennelID}, google_refresh: {_is_null: false}, google_calendar: {_is_null: false}, google_token: {_is_null: false}}) {
    ...GQLKennelInfoFragment
    trails_aggregate(where: {google_calendar: {_is_null: true}, kennel: {_eq: $kennelID}, start: {_is_null: false}, _or: [{hares: {hasher: {_is_null: false}}}, {start: {_gt: "now()"}}], draft: {_is_null: true}}) {
      aggregate {
        count
      }
    }
  }
}
        `,
    variables: { kennelID },
  })
    .then((r) => {
      if (r.data.kennels.length < 1) {
        throw Error(`Kennel not found - ${kennelID}`)
      }
      return r.data.kennels[0]
    })

  const total = kennelInfo.trails_aggregate.aggregate?.count
  if (!total || total < 1) {
    return {
      completed: 0,
      total: 0,
      phase: 'No trails to add to calendar',
    }
  }

  const trails = await ac.query<GQLAddToCalendar>({
    query: gql`
${GQL_INSERT_FRAGMENT}
query GQLAddToCalendar($kennelID: Int, $limit: Int) {
  trails(where: {google_calendar: {_is_null: true}, kennel: {_eq: $kennelID}, start: {_is_null: false}, _or: [{hares: {hasher: {_is_null: false}}}, {start: {_gt: "now()"}}], draft: {_is_null: true}}, limit: $limit) {
    ...GQLInsertFragment
  }
}
        `,
    variables: { kennelID, limit },
  }).then((r) => r.data.trails)

  const cal = gcal(kennelInfo.google_token!, kennelInfo.google_refresh!)
  for (let index = 0; index < trails.length; index += 1) {
    const trail = trails[index]
    await insertCalendar(ac, cal, kennelInfo, trail)
  }
  return {
    total,
    completed: total < limit ? total : limit,
    phase: 'Adding trails to calendar',
  }
}
