/* eslint-disable import/prefer-default-export */
import { ApolloClient, NormalizedCacheObject } from '@apollo/client'
import { GqlUpdateAttendanceDocument } from './types'

export const updateAttendance = async (
  sc : ApolloClient<NormalizedCacheObject>,
  variables : {attended : boolean | null, hasher: number, trail : number },
) => sc.mutate({
  mutation: GqlUpdateAttendanceDocument,
  variables,
})
