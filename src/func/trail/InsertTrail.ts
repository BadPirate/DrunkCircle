/* eslint-disable camelcase */
/* eslint-disable import/prefer-default-export */
import { ApolloClient, NormalizedCacheObject } from '@apollo/client'
import {
  GqlInsertTrailDocument, GqlInsertTrailDraftDocument,
  GqlInsertTrailMutation, GqlInsertTrailMutationVariables,
} from '../../graph/types'
import { ilog, ilogError } from '../Logging'
import { fixCalculatedNumbers } from './fixCalculatedNumbers'
import { updateGoogleCalendar } from '../calendar/updateGoogleCalendar'
import { reidentifyTrail } from './moveAttendance'
import { deleteTrail } from './deleteTrail'

export async function insertTrail(
  sc: ApolloClient<NormalizedCacheObject>,
  variables: GqlInsertTrailMutationVariables,
): Promise<number> {
  return sc.mutate<GqlInsertTrailMutation>({
    mutation: variables.id ? GqlInsertTrailDocument : GqlInsertTrailDraftDocument,
    variables,
  }).then((r) => {
    if (!r.data?.insert_trails_one?.id) {
      throw Error(`Unable to insert: ${r.errors?.map((e) => e.message).join(', ')}`)
    }
    ilog(`Inserted trail ${r.data.insert_trails_one.id}`)
    return r.data.insert_trails_one.id
  })
}

export async function updateTrail(
  sc: ApolloClient<NormalizedCacheObject>,
  trailData: any,
  trailId: number,
  kennel: string,
) {
  ilog('Updating trail', { trailData, trailId, kennel })
  const updatedTrailId = await insertTrail(sc, trailData)
  const kennelId = parseInt(kennel, 10) // Convert kennel to a number

  try {
    await deleteTrail(sc, trailId) // Delete the temp
  } catch (error) {
    ilogError('Error deleting temp:', error, { trailId })
  }

  const reidentifySuccess = await reidentifyTrail(sc, updatedTrailId, trailId, trailData.draft)
  if (!reidentifySuccess) {
    ilogError('Failed to reidentify trail', { updatedTrailId, trailId })
    throw new Error('Failed to reidentify trail. Please try again later.')
  }

  await fixCalculatedNumbers(sc, kennelId)
  await updateGoogleCalendar(sc, kennelId, 1)

  return trailId
}
