/* eslint-disable camelcase */
import { gql } from '@apollo/client'
import { NextApiRequest, NextApiResponse } from 'next'
import { catchError } from '../../../../src/func/catchError'
import { queryToInt, requireAll } from '../../../../src/func/queryParsing'
import { ServerClient } from '../../../../src/graph/hasura'
import { GQLDeleteRole, permission_enum_enum } from '../../../../src/graph/types'
import { requireUserWithKennelPermission } from '../../../../src/func/requireUserWithKennelPermission'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { role, kennelID } = queryToInt(req.query)
    requireAll({ role, kennelID })
    const sc = ServerClient()
    const user = await requireUserWithKennelPermission(sc, req, res, permission_enum_enum.mismanage)
    if (!user) throw Error('You do not have enough permissions to make this change')
    await sc.mutate<GQLDeleteRole>({
      mutation: gql`
      mutation GQLDeleteRole($role: Int, $kennelID: Int) {
        delete_management(where: {id: {_eq: $role}, kennel: {_eq: $kennelID}}) {
          affected_rows
        }
      }    `,
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
