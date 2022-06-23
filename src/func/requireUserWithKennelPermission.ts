/* eslint-disable import/prefer-default-export */
/* eslint-disable camelcase */
import { ApolloClient, gql, NormalizedCacheObject } from '@apollo/client'
import { NextApiRequest, NextApiResponse } from 'next'
import { queryToInt, requireAll } from './queryParsing'
import { requireKnownUser } from './ServerHelpers'
import { GQLKennelPermissionCheck, permission_enum_enum } from '../graph/types'

export async function requireUserWithKennelPermission(
  sc: ApolloClient<NormalizedCacheObject>,
  req: NextApiRequest,
  res: NextApiResponse,
  permission: permission_enum_enum,
) {
  const { kennelID } = queryToInt(req.query)
  requireAll({ kennelID })
  const user = await requireKnownUser(req, res)
  if (!user) { return null }
  return sc.query<GQLKennelPermissionCheck>({
    query: gql`
query GQLKennelPermissionCheck($kennelID: Int, $permission: permission_enum_enum, $userId: Int) {
  management(where: {kennel: {_eq: $kennelID}, permissions: {permission: {_eq: $permission}}, hasher: {_eq: $userId}}) {
    id
  }
}
        `,
    variables: { kennelID, userId: user.id, permission },
  }).then((r) => {
    if (!r.data.management || r.data.management.length < 1) {
      return null
    }
    return user
  })
}
