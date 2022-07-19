/* eslint-disable import/prefer-default-export */
import { ApolloClient, gql, NormalizedCacheObject } from '@apollo/client'
import { GQLInsertHasher } from '../../graph/types'

export async function insertHasher(
  sc: ApolloClient<NormalizedCacheObject>,
  email: string,
  name: string | null = null,
) {
  return sc.mutate<GQLInsertHasher>({
    mutation: gql`
mutation GQLInsertHasher($email: String!, $name: String) {
  insert_hashers(objects: {email: $email, name: $name}, on_conflict: {constraint: hashers_email_key}) {
    returning {
      name
      id
    }
  }
}
    `,
    variables: { email, name },
  }).then((r) => {
    if (!r.data?.insert_hashers || r.data.insert_hashers.returning.length < 1) {
      throw Error('Failed to insert')
    }
    return r.data.insert_hashers.returning[0]
  })
}
