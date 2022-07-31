/* eslint-disable import/prefer-default-export */
import { ApolloClient, NormalizedCacheObject } from '@apollo/client'
import {
  GqlFixTrailNumberInfoDocument, GqlFixTrailNumberInfoQuery,
  GqlUpdateCalculatedNumberDocument, GqlUpdateCalculatedNumberMutation,
} from '../../graph/types'
import { ilog, ilogError } from '../Logging'

export async function fixCalculatedNumbers(
  sc: ApolloClient<NormalizedCacheObject>,
  kennelId: number,
): Promise<number[]> {
  const fixInfo = await sc.query<GqlFixTrailNumberInfoQuery>({
    query: GqlFixTrailNumberInfoDocument,
    variables: { kennelId },
  })
  if (!fixInfo.data.trails) {
    ilogError('Unable to fix trail numbers', fixInfo.error)
    return []
  }
  let on = 0
  const now = new Date()
  const promises = fixInfo.data.trails.flatMap((t) => {
    const startDate = new Date(t.start)
    if (t.hares.length < 1 && startDate < now) {
      return null
    }
    on += 1
    if (t.number) {
      on = t.number
    }
    if (t.calculated_number === on) {
      return null
    }
    const to = on
    return sc.mutate<GqlUpdateCalculatedNumberMutation>({
      mutation: GqlUpdateCalculatedNumberDocument,
      variables: {
        id: t.id,
        calculated_number: to,
      },
    }).then((r) => {
      if (r.errors && r.errors.length > 0) {
        ilogError('Error updating calculated number for trail', t, r.errors)
        return null
      }
      ilog('Updated calculated number for trail', t.calculated_number, to)
      return t.id
    })
  })
  return Promise.all(promises).then((r) => {
    const flat: number[] = r.filter((e): e is number => e !== null)
    return flat
  })
}
