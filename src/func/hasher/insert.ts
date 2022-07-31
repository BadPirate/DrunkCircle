/* eslint-disable import/prefer-default-export */
import { ApolloClient, NormalizedCacheObject } from '@apollo/client'
import { GqlInsertHasherDocument, GqlInsertHasherMutation } from '../../graph/types'

export async function insertHasher(
  sc: ApolloClient<NormalizedCacheObject>,
  email: string,
  name: string | null = null,
) {
  return sc.mutate<GqlInsertHasherMutation>({
    mutation: GqlInsertHasherDocument,
    variables: { email, name },
  }).then((r) => {
    if (!r.data?.insert_hashers || r.data.insert_hashers.returning.length < 1) {
      throw Error('Failed to insert')
    }
    return r.data.insert_hashers.returning[0]
  })
}
