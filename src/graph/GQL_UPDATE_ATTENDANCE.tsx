/* eslint-disable import/prefer-default-export */
import { ApolloClient, gql, NormalizedCacheObject } from '@apollo/client'

export const GQL_UPDATE_ATTENDANCE = gql`
mutation GQLUpdateAttendance($attended: Boolean, $hasher: Int, $trail: Int) {
  insert_attendance_one(object: {attended: $attended, hasher: $hasher, trail: $trail}, on_conflict: {constraint: attendance_pkey, update_columns: attended}) {
    attended
  }
}`

export const updateAttendance = async (
  sc : ApolloClient<NormalizedCacheObject>,
  variables : {attended : boolean | null, hasher: number, trail : number },
) => sc.mutate({
  mutation: GQL_UPDATE_ATTENDANCE,
  variables,
})
