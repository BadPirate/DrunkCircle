/* eslint-disable import/prefer-default-export */
import { ApolloClient, gql, NormalizedCacheObject } from '@apollo/client'
import { GQLFixTrailNumberInfo, GQLUpdateCalculatedNumber } from '../../graph/types'
import { ilog, ilogError } from '../Logging'

export async function fixCalculatedNumbers(
  sc: ApolloClient<NormalizedCacheObject>,
  kennelId: number,
): Promise<number[]> {
  const fixInfo = await sc.query<GQLFixTrailNumberInfo>({
    query: gql`
query GQLFixTrailNumberInfo($kennelId: Int) {
  trails(where: {draft: {_is_null: true}, kennel: {_eq: $kennelId}}, order_by: {start: asc}) {
    number
    calculated_number
    id
    start
    hares {
      hasherInfo {
        id
      }
    }
  }
}
    `,
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
    return sc.mutate<GQLUpdateCalculatedNumber>({
      mutation: gql`
mutation GQLUpdateCalculatedNumber($id: Int!, $calculated_number: Int) {
  update_trails_by_pk(pk_columns: {id: $id}, _set: {calculated_number: $calculated_number, gcal_dirty: true}) {
    id
  }
}
      `,
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
