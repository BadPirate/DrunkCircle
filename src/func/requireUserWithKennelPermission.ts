/* eslint-disable import/prefer-default-export */
/* eslint-disable camelcase */
import { ApolloClient, NormalizedCacheObject } from '@apollo/client'
import { NextApiRequest, NextApiResponse } from 'next'
import { GqlKennelPermissionCheckDocument, GqlKennelPermissionCheckQuery, Permission_Enum_Enum } from '../graph/types'
import { queryToInt } from './queryParsing'
import { requireKnownUser } from './ServerHelpers'

export async function requireUserWithKennelPermission(
  sc: ApolloClient<NormalizedCacheObject>,
  req: NextApiRequest,
  res: NextApiResponse,
  permission: Permission_Enum_Enum,
  kennelId: number | null = null,
) {
  const { kennelID } = queryToInt(req.query)
  if (!kennelID && !kennelId) {
    throw Error('Kennel ID not provided requireUser')
  }
  const user = await requireKnownUser(req, res)
  if (!user) { return null }
  return sc.query<GqlKennelPermissionCheckQuery>({
    query: GqlKennelPermissionCheckDocument,
    variables: { kennelID: kennelId || kennelID, userId: user.id, permission },
  }).then((r) => {
    if (!r.data.management || r.data.management.length < 1) {
      return null
    }
    return user
  })
}
