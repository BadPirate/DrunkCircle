/* eslint-disable camelcase */
/* eslint-disable import/prefer-default-export */
import { ApolloClient, NormalizedCacheObject } from '@apollo/client'
import {
  GqlInsertTrailDocument, GqlInsertTrailDraftDocument,
  GqlInsertTrailMutation, GqlInsertTrailMutationVariables,
  GqlGetTrailByIdDocument,
} from '../../graph/types'
import { ilog } from '../Logging'

export async function insertTrail(
  sc: ApolloClient<NormalizedCacheObject>,
  variables: GqlInsertTrailMutationVariables,
  createdById: number,
): Promise<number> {
  // Ensure createdById is included in the variables
  const updatedVariables = { ...variables, createdById }

  // Check if the user is the creator of the draft
  if (variables.id) {
    const existingDraft = await sc.query({
      query: GqlGetTrailByIdDocument,
      variables: { id: variables.id },
    });

    if (existingDraft.data?.trails_by_pk?.createdById === createdById) {
      ilog(`User is the creator of the draft with ID: ${variables.id}, modifying the draft.`);
    } else {
      ilog(`User is not the creator of the draft with ID: ${variables.id}, creating a new draft.`);
      delete variables.id; // Remove ID to create a new draft
    }
  }

  // Log whether we are modifying an existing draft or creating a new one
  if (variables.id) {
    ilog(`Modifying existing draft with ID: ${variables.id}`)
  } else {
    ilog('Creating a new draft')
  }

  return sc.mutate<GqlInsertTrailMutation>({
    mutation: variables.id ? GqlInsertTrailDocument : GqlInsertTrailDraftDocument,
    variables: updatedVariables,
  }).then((r) => {
    if (!r.data?.insert_trails_one?.id) {
      throw Error(`Unable to insert: ${r.errors?.map((e) => e.message).join(', ')}`)
    }
    ilog(`Inserted trail ${r.data.insert_trails_one.id}`)
    return r.data.insert_trails_one.id
  })
}
