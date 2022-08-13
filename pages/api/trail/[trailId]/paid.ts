/* eslint-disable camelcase */
import { queryToBool, queryToInt, requireAll } from '../../../../src/func/queryParsing'
import { hasherPermissions } from '../../../../src/func/requireUserWithKennelPermission'
import { JSONHandler, requireKnownUser } from '../../../../src/func/ServerHelpers'
import { ServerClient } from '../../../../src/graph/hasura'
import {
  GqlKennelForTrailDocument, GqlKennelForTrailQuery, GqlUpdatePaidDocument, Permission_Enum_Enum,
} from '../../../../src/graph/types'

export default JSONHandler(async ({ req, res }) => {
  const {
    trailId,
    hasherId,
  } = queryToInt(req.query)
  const {
    paid,
    attended,
  } = queryToBool(req.query)
  const user = await requireKnownUser(req, res)
  if (!user) return null
  requireAll({ trailId, hasherId })
  const sc = ServerClient()
  const { kennelId, isHare } = await sc.query<GqlKennelForTrailQuery>({
    query: GqlKennelForTrailDocument,
    variables: { trailId },
  }).then((r) => {
    if (!r.data.trails || r.data.trails.length < 1) {
      throw Error('Trail info not found')
    }
    const trail = r.data.trails[0]
    return {
      kennelId: trail.kennel,
      isHare: trail.hares.filter((t) => t.hasher === user.id) !== null,
    }
  })
  if (!isHare) {
    const perms = await hasherPermissions(sc, user.id, kennelId)
    if (!perms.includes(Permission_Enum_Enum.Cash)) {
      throw Error('User does not have permissions for this operation')
    }
  }
  await sc.mutate({
    mutation: GqlUpdatePaidDocument,
    variables: {
      hasherId, trailId, paid, attended,
    },
  })
  return {}
})
