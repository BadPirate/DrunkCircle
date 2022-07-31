/* eslint-disable camelcase */
import { NextApiRequest, NextApiResponse } from 'next'
import { catchError } from '../../../../src/func/catchError'
import { queryToInt, queryToStrings, requireAll } from '../../../../src/func/queryParsing'
import { requireUserWithKennelPermission } from '../../../../src/func/requireUserWithKennelPermission'
import { ServerClient } from '../../../../src/graph/hasura'
import { GqlAddMismanagementDocument, Permission_Enum_Enum } from '../../../../src/graph/types'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { kennelID, hasher } = queryToInt(req.query)
    const { title } = queryToStrings(req.query)
    requireAll({ kennelID, title, hasher })
    const sc = ServerClient()
    const user = await requireUserWithKennelPermission(sc, req, res, Permission_Enum_Enum.Mismanage)
    if (!user) throw Error("You don't have mismanage permission")
    await sc.mutate({
      mutation: GqlAddMismanagementDocument,
      variables: { title, hasher, kennelID },
    })
    res.json({ success: true })
  } catch (e) {
    res.json({ error: catchError(e).toString() })
  }
}
