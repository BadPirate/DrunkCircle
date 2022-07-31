/* eslint-disable camelcase */
import { NextApiRequest, NextApiResponse } from 'next'
import { catchError } from '../../../../src/func/catchError'
import { queryToInt, requireAll } from '../../../../src/func/queryParsing'
import { ServerClient } from '../../../../src/graph/hasura'
import { requireUserWithKennelPermission } from '../../../../src/func/requireUserWithKennelPermission'
import { GqlDeleteRoleDocument, GqlDeleteRoleMutation, Permission_Enum_Enum } from '../../../../src/graph/types'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { role, kennelID } = queryToInt(req.query)
    requireAll({ role, kennelID })
    const sc = ServerClient()
    const user = await requireUserWithKennelPermission(sc, req, res, Permission_Enum_Enum.Mismanage)
    if (!user) throw Error('You do not have enough permissions to make this change')
    await sc.mutate<GqlDeleteRoleMutation>({
      mutation: GqlDeleteRoleDocument,
      variables: { kennelID, role },
    }).then((r) => {
      if (!r.data?.delete_management?.affected_rows || r.data.delete_management.affected_rows < 1) {
        throw new Error('No data found')
      }
    })
    res.json({ success: true })
  } catch (e) {
    const error = catchError(e)
    res.json({ error: error.toString() })
  }
}
