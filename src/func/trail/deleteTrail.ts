/* eslint-disable import/prefer-default-export */
import { ApolloClient, gql, NormalizedCacheObject } from '@apollo/client'
import { ilogError } from '../Logging'

export async function deleteTrail(sc: ApolloClient<NormalizedCacheObject>, trailId: number) {
  return sc.mutate({
    mutation: gql`
mutation GQLDeleteTrail($trailId: Int) {
  delete_trails(where: {id: {_eq: $trailId}}) {
    affected_rows
  }
}
    `,
    variables: { trailId },
  }).then((r) => {
    if (r.data?.delete_trails.affected_rows !== 1) {
      ilogError('Error deleting existing trail', r)
      throw Error(`Error deleting existing trail for update, trailId: ${trailId}`)
    }
  })
}
