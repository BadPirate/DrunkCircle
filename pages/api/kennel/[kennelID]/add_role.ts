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
    const { kennelID, hasher } = queryToInt(req.query)
    const { title } = queryToStrings(req.query)
    requireAll({ kennelID, title, hasher })
    const sc = ServerClient()
    const user = await requireUserWithKennelPermission(sc, req, res, permission_enum_enum.mismanage)
    console.log('USER', user)
    if (!user) throw Error("You don't have mismanage permission")
    await sc.mutate({
      mutation: gql`
mutation GQLAddMismanagement($hasher: Int, $title: String, $kennelID: Int) {
  insert_management(objects: {hasher: $hasher, title: $title, kennel: $kennelID}) {
    affected_rows
  }
}
        `,
      variables: { title, hasher, kennelID },
    })
    res.json({ success: true })
  } catch (e) {
    res.json({ error: catchError(e).toString() })
  }
}
