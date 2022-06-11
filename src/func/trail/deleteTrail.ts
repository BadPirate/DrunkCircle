/* eslint-disable camelcase */
/* eslint-disable import/prefer-default-export */
import { ApolloClient, gql, NormalizedCacheObject } from '@apollo/client'
import { gcal } from '../../api/google'
import { GQLDeleteTrail } from '../../graph/types'
import { apiBackOff } from '../calendar/CalendarShared'
import { ilogError } from '../Logging'

export async function deleteTrail(
  sc: ApolloClient<NormalizedCacheObject>,
  trailId: number,
) {
  return sc.mutate<GQLDeleteTrail>({
    mutation: gql`
mutation GQLDeleteTrail($trailId: Int) {
  delete_trails(where: {id: {_eq: $trailId}}) {
    affected_rows
    returning {
      google_calendar
      kennelInfo {
        google_refresh
        google_token
        google_calendar
      }
    }
  }
}
    `,
    variables: { trailId },
  }).then((r) => {
    if (!r.data?.delete_trails?.returning || r.data.delete_trails.returning.length < 1) {
      throw Error('Unable to delete')
    }
    return r.data.delete_trails.returning[0]
  }).then((info) => {
    const {
      kennelInfo: {
        google_token, google_refresh,
        google_calendar: calendarId,
      }, google_calendar,
    } = info
    if (!google_calendar) return null
    if (!google_token || !google_refresh || !calendarId) {
      ilogError('Unable to delete google calendar entry, no token / refresh for kennel', google_calendar)
      return null
    }
    const cal = gcal(google_token, google_refresh)
    return apiBackOff('Remove google calendar entry', cal.events.delete({
      eventId: google_calendar,
      calendarId,
    }))
  })
}
