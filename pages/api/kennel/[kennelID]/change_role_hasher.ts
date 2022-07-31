/* eslint-disable camelcase */
import { NextApiRequest, NextApiResponse } from 'next'
import { catchError } from '../../../../src/func/catchError'
import { queryToInt, requireAll } from '../../../../src/func/queryParsing'
import { requireUserWithKennelPermission } from '../../../../src/func/requireUserWithKennelPermission'
import { ServerClient } from '../../../../src/graph/hasura'
import { GqlUpdateRoleHasherDocument, Permission_Enum_Enum } from '../../../../src/graph/types'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { kennelID, role, hasher } = queryToInt(req.query)
    requireAll({ kennelID, role, hasher })
    const sc = ServerClient()
    const user = requireUserWithKennelPermission(sc, req, res, Permission_Enum_Enum.Mismanage)
    if (!user) throw Error("You don't have mismanage permission")
    await sc.mutate({
      mutation: GqlUpdateRoleHasherDocument,
      variables: { role, hasher, kennelID },
    })
    res.json({ success: true })
  } catch (e) {
    res.json({ error: catchError(e).toString() })
  }
}
