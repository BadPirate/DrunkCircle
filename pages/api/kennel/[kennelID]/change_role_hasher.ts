/* eslint-disable camelcase */
import { gql } from '@apollo/client'
import { NextApiRequest, NextApiResponse } from 'next'
import { catchError } from '../../../../src/func/catchError'
import { queryToInt, requireAll } from '../../../../src/func/queryParsing'
import { requireUserWithKennelPermission } from '../../../../src/func/requireUserWithKennelPermission'
import { ServerClient } from '../../../../src/graph/hasura'
import { permission_enum_enum } from '../../../../src/graph/types'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { kennelID, role, hasher } = queryToInt(req.query)
    requireAll({ kennelID, role, hasher })
    const sc = ServerClient()
    const user = requireUserWithKennelPermission(sc, req, res, permission_enum_enum.mismanage)
    if (!user) throw Error("You don't have mismanage permission")
    await sc.mutate({
      mutation: gql`
mutation GQLUpdateRoleHasher($role: Int, $kennelID: Int, $hasher: Int) {
  update_management(where: {id: {_eq: $role}, kennel: {_eq: $kennelID}}, _set: {hasher: $hasher}) {
    affected_rows
  }
}
        `,
      variables: { role, hasher, kennelID },
    })
    res.json({ success: true })
  } catch (e) {
    res.json({ error: catchError(e).toString() })
  }
}
