/* eslint-disable import/prefer-default-export */
import { ApolloClient, gql, NormalizedCacheObject } from '@apollo/client'
import { GQLCalendarUpdate } from '../../graph/types'
import { ProgressResult } from '../SharedTypes'
import { insertCalendar, updateCalendar } from './updateGcal'
import { GQL_KENNEL_INFO_FRAGMENT, GQL_INSERT_FRAGMENT } from './gcalData'
import { gcal } from '../../api/google'

export async function updateGoogleCalendar(
  ac: ApolloClient<NormalizedCacheObject>,
  kennelId: number,
  limit: number = 10,
): Promise<ProgressResult> {
  const info = await ac.query<GQLCalendarUpdate>({
    query: gql`
${GQL_INSERT_FRAGMENT}
${GQL_KENNEL_INFO_FRAGMENT}
query GQLCalendarUpdate($kennelId: Int) {
  trails(where: {draft: {_is_null: true}, kennel: {_eq: $kennelId}, _and: {gcal_dirty: {_eq: true}}, hares: {hasher: {_is_null: false}}}) {
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
    const trail = update[index]
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
