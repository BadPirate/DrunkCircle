/* eslint-disable camelcase */
import { ApolloClient, gql, NormalizedCacheObject } from '@apollo/client'
import { NextApiRequest, NextApiResponse } from 'next'
import { DCKnownUser } from '../ServerHelpers'
import { GQLHareCheckFragment, permission_enum_enum } from '../../graph/types'
import { requireUserWithKennelPermission } from '../requireUserWithKennelPermission'

export const GQL_HARE_CHECK_FRAGMENT = gql`
fragment GQLHareCheckFragment on trails {
  kennel
  hares {
    hasher
    hasherInfo {
      email
    }
  }
}
`

export async function hareAuthorized(
  sc: ApolloClient<NormalizedCacheObject>,
  req: NextApiRequest,
  res: NextApiResponse,
  hareCheck: GQLHareCheckFragment,
  user: DCKnownUser,
) {
  if (!hareCheck.hares || hareCheck.hares.length < 1) { return true } // Yours if you want it
  if (hareCheck.hares && hareCheck.hares.map((h) => h.hasher).includes(user.id)) { return true }
  return requireUserWithKennelPermission(
    sc,
    req,
    res,
    permission_enum_enum.update_trails,
    hareCheck.kennel,
  )
    .then((u) => (!!u))
}
