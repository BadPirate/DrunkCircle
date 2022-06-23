/* eslint-disable camelcase */
import { gql } from '@apollo/client'
import { NextApiRequest, NextApiResponse } from 'next'
import { catchError } from '../../../../src/func/catchError'
import { queryToInt, queryToStrings, requireAll } from '../../../../src/func/queryParsing'
import { requireUserWithKennelPermission } from '../../../../src/func/requireUserWithKennelPermission'
import { ServerClient } from '../../../../src/graph/hasura'
import { permission_enum_enum } from '../../../../src/graph/types'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { kennelID, role } = queryToInt(req.query)
    const { permission } = queryToStrings(req.query)
    requireAll({ kennelID, role, permission })
    const sc = ServerClient()
    const user = await requireUserWithKennelPermission(sc, req, res, permission_enum_enum.mismanage)
    if (!user) throw Error("You don't have mismanage permission")
    await sc.mutate({
      mutation: gql`
mutation GQLDeleteRolePermission($role: Int, $permission: permission_enum_enum) {
  delete_permissions(where: {role: {_eq: $role}, permission: {_eq: $permission}}) {
    affected_rows
  }
}
        `,
      variables: { role, permission },
    })
    res.json({ success: true })
  } catch (e) {
    res.json({ error: catchError(e).toString() })
  }
}
