/* eslint-disable no-await-in-loop */
/* eslint-disable import/prefer-default-export */
import { gcal } from '../../api/google'
import { ServerClient } from '../../graph/hasura'
import {
  GqlAllSetCalendarEntriesDocument, GqlAllSetCalendarEntriesQuery,
  GqlClearCalendarInfoFromTrailDocument,
  GqlClearCalendarInfoFromTrailMutation, GqlCountSetCalendarEntriesDocument,
  GqlCountSetCalendarEntriesQuery,
  GqlGetGoogleCalendarIdDocument, GqlGetGoogleCalendarIdQuery,
} from '../../graph/types'
import { ilog } from '../Logging'
import { GoogleLimit } from '../ServerHelpers'
import { ProgressResult } from '../SharedTypes'

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
  const calendarInfo = await ac.query<GqlGetGoogleCalendarIdQuery>({
    query: GqlGetGoogleCalendarIdDocument,
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

  const total = await ac.query<GqlCountSetCalendarEntriesQuery>({
    query: GqlCountSetCalendarEntriesDocument,
    variables: { kennelId },
  }).then((r) => r.data.trails_aggregate.aggregate?.count || 0)

  if (total === 0) {
    return progressResult
  }

  progressResult.total = total

  const entries = await ac.query<GqlAllSetCalendarEntriesQuery>({
    query: GqlAllSetCalendarEntriesDocument,
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
    await cal.events.delete({
      calendarId,
      eventId: c.google_calendar!,
    })
    .catch((e) => {
      if (e.code === '410' || e.code === 410) {
        ilog('Calendar event already deleted', c.id)
      } else if (e.code === '404' || e.code === 404) {
        ilog('Calendar event not found', c.id)
      } else {
        ilog(c.id, 'THREW', e.code)
        throw e
      }
    })
      .then(() => {
        ilog(c.id, 'Clearing...')
        return ac.mutate<GqlClearCalendarInfoFromTrailMutation>({
          mutation: GqlClearCalendarInfoFromTrailDocument,
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
