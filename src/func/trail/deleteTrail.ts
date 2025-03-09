/* eslint-disable camelcase */
/* eslint-disable import/prefer-default-export */
import { ApolloClient, NormalizedCacheObject } from '@apollo/client'
import { gcal } from '../../api/google'
import { GqlDeleteTrailDocument, GqlDeleteTrailMutation } from '../../graph/types'
import { ilogError } from '../Logging'

export async function deleteTrail(
  sc: ApolloClient<NormalizedCacheObject>,
  trailId: number,
) {
  return sc.mutate<GqlDeleteTrailMutation>({
    mutation: GqlDeleteTrailDocument,
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
    return cal.events.delete({
      eventId: google_calendar,
      calendarId,
    })
  })
}
