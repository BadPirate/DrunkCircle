/* eslint-disable camelcase */
import { queryToInt, queryToStrings, requireAll } from '../../../../src/func/queryParsing'
import { requireUserWithKennelPermission } from '../../../../src/func/requireUserWithKennelPermission'
import { JSONHandler } from '../../../../src/func/ServerHelpers'
import { ServerClient } from '../../../../src/graph/hasura'
import { GqlAddRolePermissionDocument, Permission_Enum_Enum } from '../../../../src/graph/types'

export default JSONHandler(async ({ req, res }) => {
  const { kennelID, role } = queryToInt(req.query)
  const { permission } = queryToStrings(req.query)
  requireAll({ kennelID, role, permission })
  const sc = ServerClient()
  const user = await requireUserWithKennelPermission(sc, req, res, Permission_Enum_Enum.Mismanage)
  if (!user) throw Error("You don't have mismanage permission")
  await sc.mutate({
    mutation: GqlAddRolePermissionDocument,
    variables: { role, permission },
  })
  return {}
})
