import { ApolloClient, gql, NormalizedCacheObject } from '@apollo/client'
import { GQLAcceptDraftMutation, GQLMoveAttendance } from '../../graph/types'
import { ilogError } from '../Logging'

export default async function moveAttendance(
  sc: ApolloClient<NormalizedCacheObject>,
  from: number,
  to: number,
) {
  return sc.mutate<GQLMoveAttendance>({
    mutation: gql`
  mutation GQLMoveAttendance($from: Int, $to: Int) {
    update_attendance(where: {trail: {_eq: $from}}, _set: {trail: $to}) {
      affected_rows
    }
  }
        `,
    variables: {
      from,
      to,
    },
  }).then((r) => {
    if (!r.data?.update_attendance) {
      ilogError('Failure to move attendance', r)
      return
    }
    console.log('Moved Attendance', r.data.update_attendance.affected_rows)
  })
}

export async function reidentifyTrail(
  sc: ApolloClient<NormalizedCacheObject>,
  from: number,
  to: number,
) {
  sc.mutate<GQLAcceptDraftMutation>({
    mutation: gql`
mutation GQLAcceptDraftMutation($from: Int!, $to: Int!) {
  update_trails_by_pk(pk_columns: {id: $from}, _set: {id: $to, gcal_dirty: true, draft: null}) {
    id
  }
}
          `,
    variables: {
      from,
      to,
    },
  }).then((r) => {
    if (!r.data?.update_trails_by_pk) {
      ilogError('Reidentify Error', r)
      return
    }
    console.log('Reidentify Trail', r.data.update_trails_by_pk.id)
  })
}
