/* eslint-disable camelcase */
/* eslint-disable no-await-in-loop */
/* eslint-disable import/prefer-default-export */
import { gcal } from '../../api/google'
import { ServerClient } from '../../graph/hasura'
import { GoogleLimit } from '../ServerHelpers'
import { ProgressResult } from '../SharedTypes'
import { insertCalendar } from './updateGcal'
import {
  GqlAddToCalendarDocument, GqlAddToCalendarQuery, GqlRefreshKennelAddCountDocument,
  GqlRefreshKennelAddCountQuery,
} from '../../graph/types'

export async function createCalendarEntries(
  kennelID: string,
  limit: number = GoogleLimit,
): Promise<ProgressResult> {
  const ac = ServerClient()
  const kennelInfo = await ac.query<GqlRefreshKennelAddCountQuery>({
    query: GqlRefreshKennelAddCountDocument,
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

  const trails = await ac.query<GqlAddToCalendarQuery>({
    query: GqlAddToCalendarDocument,
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
