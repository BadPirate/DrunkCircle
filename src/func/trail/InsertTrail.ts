/* eslint-disable camelcase */
/* eslint-disable import/prefer-default-export */
import { ApolloClient, NormalizedCacheObject } from '@apollo/client'
import {
  GqlInsertTrailDocument, GqlInsertTrailDraftDocument,
  GqlInsertTrailMutation, GqlInsertTrailMutationVariables,
} from '../../graph/types'
import { ilog } from '../Logging'

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
