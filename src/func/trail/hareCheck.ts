/* eslint-disable import/prefer-default-export */
/* eslint-disable camelcase */
import { ApolloClient, NormalizedCacheObject } from '@apollo/client'
import { NextApiRequest, NextApiResponse } from 'next'
import { DCKnownUser } from '../ServerHelpers'
import { GqlHareCheckFragmentFragment, Permission_Enum_Enum } from '../../graph/types'
import { requireUserWithKennelPermission } from '../requireUserWithKennelPermission'

export async function hareAuthorized(
  sc: ApolloClient<NormalizedCacheObject>,
  req: NextApiRequest,
  res: NextApiResponse,
  hareCheck: GqlHareCheckFragmentFragment,
  user: DCKnownUser,
) {
  if (!hareCheck.hares || hareCheck.hares.length < 1) { return true } // Yours if you want it
  if (hareCheck.hares && hareCheck.hares.map((h) => h.hasher).includes(user.id)) { return true }
  return requireUserWithKennelPermission(
    sc,
    req,
    res,
    Permission_Enum_Enum.UpdateTrails,
    hareCheck.kennel,
  )
    .then((u) => (!!u))
}
