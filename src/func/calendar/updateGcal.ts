/* eslint-disable import/prefer-default-export */
/* eslint-disable camelcase */
import { ApolloClient, gql, NormalizedCacheObject } from '@apollo/client'
import { calendar_v3 } from 'googleapis'
import { GQLInsertFragment, GQLKennelInfoFragment, GQLUpdateTrailGID } from '../../graph/types'
import { apiBackOff } from './CalendarShared'
import { gcalData } from './gcalData'

export async function updateCalendar(
  ac: ApolloClient<NormalizedCacheObject>,
  cal: calendar_v3.Calendar,
  kennel: GQLKennelInfoFragment,
  trail: GQLInsertFragment,
) {
  console.log('updateCalendar', trail)
  const updateData = gcalData(kennel, trail)
  if (!trail.google_calendar) {
    return insertCalendar(ac, cal, kennel, trail)
  }
  return apiBackOff(
    `Updating GCAL ${trail.id}, ${trail.google_calendar}`,
    cal.events.update({
      eventId: trail.google_calendar,
      ...updateData,
    }),
  ).then((r) => {
    const { id } = r.data
    if (!id) { throw Error(`Unable to update ${trail.id}`) }
    return id
  }).then(() => ac.mutate({
    mutation: gql`
mutation GQLMarkClean($trailId: Int) {
update_trails(where: {id: {_eq: $trailId}}, _set: {gcal_dirty: false}) {
  affected_rows
}
}
          `,
    variables: { trailId: trail.id },
  })).then((r) => {
    if (r.errors) { throw r.errors[0] }
    if (!r.data?.update_trails?.affected_rows || r.data.update_trails.affected_rows < 1) {
      throw Error(`Error updating trail info ${trail.id}`)
    }
  })
}

export async function insertCalendar(
  ac: ApolloClient<NormalizedCacheObject>,
  cal: calendar_v3.Calendar,
  kennel: GQLKennelInfoFragment,
  trail: GQLInsertFragment,
) {
  console.log('insertCalendar', trail)
  const insertData = gcalData(kennel, trail)
  return apiBackOff(`Inserting GCAL ${trail.id}`, cal.events.insert(insertData))
    .then((r) => {
      const { id } = r.data
      if (!id) { throw Error(`Unable to create ${trail.id}`) }
      return id
    }).then((gid) => ac.mutate<GQLUpdateTrailGID>({
      mutation: gql`
mutation GQLUpdateTrailGID($gid: String, $trailId: Int) {
  update_trails(where: {id: {_eq: $trailId}}, _set: {google_calendar: $gid, gcal_dirty: false}) {
    affected_rows
  }
}
            `,
      variables: { trailId: trail.id, gid },
    })).then((r) => {
      if (r.errors) { throw r.errors[0] }
      if (!r.data?.update_trails?.affected_rows || r.data.update_trails.affected_rows < 1) {
        throw Error(`Error updating trail info ${trail.id}`)
      }
    })
}
