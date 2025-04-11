import { ApolloClient, NormalizedCacheObject } from '@apollo/client'
import {
  GqlAcceptDraftMutationDocument, GqlAcceptDraftMutationMutation,
  GqlMoveAttendanceDocument, GqlMoveAttendanceMutation,
} from '../../graph/types'
import { ilogError } from '../Logging'

export default async function moveAttendance(
  sc: ApolloClient<NormalizedCacheObject>,
  from: number,
  to: number,
) {
  return sc.mutate<GqlMoveAttendanceMutation>({
    mutation: GqlMoveAttendanceDocument,
    variables: {
      from,
      to,
    },
  }).then((r) => {
    if (!r.data?.update_attendance) {
      ilogError('Failure to move attendance', r)
    }
  })
}

export async function reidentifyTrail(
  sc: ApolloClient<NormalizedCacheObject>,
  from: number,
  to: number,
  draft?: number,
) {
  try {
    const result = await sc.mutate<GqlAcceptDraftMutationMutation>({
      mutation: GqlAcceptDraftMutationDocument,
      variables: {
        from,
        to,
        draft: draft ?? null,
      },
    })

    if (!result.data?.update_trails_by_pk) {
      ilogError('Reidentify Error: No trail updated', result)
      return false
    }

    return true
  } catch (error) {
    ilogError('Reidentify Error: Mutation failed', error)
    return false
  }
}
