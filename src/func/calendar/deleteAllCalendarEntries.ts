/* eslint-disable no-await-in-loop */
/* eslint-disable import/prefer-default-export */
import { gql } from '@apollo/client'
import { gcal } from '../../api/google'
import { ServerClient } from '../../graph/hasura'
import {
  GQLAllSetCalendarEntries, GQLClearCalendarInfoFromTrail, GQLCountSetCalendarEntries,
  GQLGetGoogleCalendarId,
} from '../../graph/types'
import { ilog } from '../Logging'
import { GoogleLimit } from '../ServerHelpers'
import { ProgressResult } from '../SharedTypes'
import { apiBackOff } from './CalendarShared'

export async function deleteAllCalendarEntries(
  kennelId: string,
  limit: number = GoogleLimit,
): Promise<ProgressResult> {
  const progressResult: ProgressResult = {
    total: 0,
    completed: 0,
    phase: 'Removing calendar entries from previous calendar',
  }

  const ac = ServerClient()
  const calendarInfo = await ac.query<GQLGetGoogleCalendarId>({
    query: gql`
query GQLGetGoogleCalendarId($kennelId: Int) {
  kennels(where: {id: {_eq: $kennelId}}, limit: 1) {
    google_calendar
    google_refresh
    google_token
  }
}
    `,
    variables: { kennelId },
  }).then((r) => (r.data.kennels.length > 0 ? r.data.kennels[0] : null))

  if (!calendarInfo) { return progressResult }
  const {
    google_calendar: calendarId, google_token: accessToken,
    google_refresh: refreshToken,
  } = calendarInfo
  if (!calendarId || !accessToken || !refreshToken) {
    return progressResult
  }

  const total = await ac.query<GQLCountSetCalendarEntries>({
    query: gql`
    query GQLCountSetCalendarEntries($kennelId: Int) {
      trails_aggregate(where: {kennel: {_eq: $kennelId}, google_calendar: {_is_null: false}}) {
        aggregate {
          count
        }
      }
    }`,
    variables: { kennelId },
  }).then((r) => r.data.trails_aggregate.aggregate?.count || 0)

  if (total === 0) {
    return progressResult
  }

  progressResult.total = total

  const entries = await ac.query<GQLAllSetCalendarEntries>({
    query: gql`
query GQLAllSetCalendarEntries($kennelId: Int, $limit: Int) {
  trails(where: {kennel: {_eq: $kennelId}, google_calendar: {_is_null: false}}, limit: $limit) {
    google_calendar
    id
  }
}
        `,
    variables: { kennelId, limit },
  }).then((r) => {
    if (r.error) { throw r.error }
    return r.data.trails
  })

  if (entries.length === 0) { return progressResult }
  progressResult.completed = entries.length

  const cal = gcal(accessToken, refreshToken)
  for (let on = 0; on < entries.length; on += 1) {
    const c = entries[on]
    await apiBackOff(`${c.id}`, cal.events.delete({
      calendarId,
      eventId: c.google_calendar!,
    }).catch((e) => {
      if (e.code === '410' || e.code === 410) {
        ilog('Calendar event already deleted', c.id)
      } else if (e.code === '404' || e.code === 404) {
        ilog('Calendar event not found', c.id)
      } else {
        ilog(c.id, 'THREW', e.code)
        throw e
      }
    }))
      .then(() => {
        ilog(c.id, 'Clearing...')
        return ac.mutate<GQLClearCalendarInfoFromTrail>({
          mutation: gql`
mutation GQLClearCalendarInfoFromTrail($trailIds: [Int!]) {
  update_trails(where: {id: {_in: $trailIds}}, _set: {google_calendar: null}) {
    affected_rows
  }
}
          `,
          variables: { trailIds: [c.id] },
        })
      })
      .then(() => {
        ilog(c.id, 'CLEARED')
      })
  }
  ilog('Batch cleared', progressResult)
  return progressResult
}
