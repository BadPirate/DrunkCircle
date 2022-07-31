/* eslint-disable camelcase */
import { NextApiRequest, NextApiResponse } from 'next'
import {
  queryToFloat, queryToInt, queryToStrings, requireAll,
} from '../../../../src/func/queryParsing'
import { requireUserWithKennelPermission } from '../../../../src/func/requireUserWithKennelPermission'
import { ServerClient } from '../../../../src/graph/hasura'
import { GqlUpdateKennelDocument, GqlUpdateKennelMutation, Permission_Enum_Enum } from '../../../../src/graph/types'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    name,
    short,
    web,
    description,
    area,
    next,
  } = queryToStrings(req.query)
  const {
    kennelID,
    frequency,
  } = queryToInt(req.query)
  const {
    price,
  } = queryToFloat(req.query)
  requireAll({
    kennelID, name, short, description, frequency, price,
  })
  const sc = ServerClient()
  const user = await requireUserWithKennelPermission(
    sc,
    req,
    res,
    Permission_Enum_Enum.Mismanage,
    kennelID,
  )
  if (!user) return
  await sc.mutate<GqlUpdateKennelMutation>({
    mutation: GqlUpdateKennelDocument,
    variables: {
      name,
      short,
      web,
      description,
      area,
      kennelID,
      frequency: frequency > 1 ? frequency * 7 : null,
      price,
      next: next ? new Date(next) : null,
    },
  }).then((r) => {
    if (!r.data) {
      throw r.errors![0]
    }
  })
  res.redirect(`/kennel/${kennelID}`)
}
