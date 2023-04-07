/* eslint-disable import/prefer-default-export */
/* eslint-disable camelcase */
import { ApolloClient, NormalizedCacheObject } from '@apollo/client'
import { calendar_v3 } from 'googleapis'
import { GaxiosError } from 'googleapis-common'
import {
  GqlInsertTrailFragment, GqlKennelAddInfoFragment, GqlMarkCleanDocument,
  GqlUpdateTrailGidDocument, GqlUpdateTrailGidMutation,
} from '../../graph/types'
import { apiBackOff } from './CalendarShared'
import { gcalData } from './gcalData'
import { ilog } from '../Logging'

export async function updateCalendar(
  ac: ApolloClient<NormalizedCacheObject>,
  cal: calendar_v3.Calendar,
  kennel: GqlKennelAddInfoFragment,
  trail: GqlInsertTrailFragment,
) {
  const updateData = gcalData(kennel, trail)
  if (!trail.google_calendar) {
    return insertCalendar(ac, cal, kennel, trail)
  }
  return apiBackOff(
    `Updating GCAL ${trail.id}, ${trail.google_calendar}`,
    cal.events.update({
      eventId: trail.google_calendar,
      ...updateData,
    }).catch((e: GaxiosError) => {
      if (e.response?.status === 404) {
        ilog('404 Calendar')
        return
      }
      throw e
    }),
  ).then((r) => {
    if (!r) return null
    const { id } = r.data
    if (!id) { throw Error(`Unable to update ${trail.id}`) }
    ilog(`Updated GCAL ${id}`)
    return id
  }).then(() => ac.mutate({
    mutation: GqlMarkCleanDocument,
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
  kennel: GqlKennelAddInfoFragment,
  trail: GqlInsertTrailFragment,
) {
  const insertData = gcalData(kennel, trail)
  return apiBackOff(`Inserting GCAL ${trail.id}`, cal.events.insert(insertData))
    .then((r) => {
      const { id } = r.data
      if (!id) { throw Error(`Unable to create ${trail.id}`) }
      return id
    }).then((gid) => ac.mutate<GqlUpdateTrailGidMutation>({
      mutation: GqlUpdateTrailGidDocument,
      variables: { trailId: trail.id, gid },
    })).then((r) => {
      if (r.errors) { throw r.errors[0] }
      if (!r.data?.update_trails?.affected_rows || r.data.update_trails.affected_rows < 1) {
        throw Error(`Error updating trail info ${trail.id}`)
      }
    })
}
