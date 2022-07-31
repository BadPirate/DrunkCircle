import { NextApiRequest, NextApiResponse } from 'next'
import { queryToInt, queryToStrings } from '../../../../src/func/queryParsing'
import { ServerClient } from '../../../../src/graph/hasura'
import { GqlKennelIdForTrailDocument, GqlKennelIdForTrailQuery } from '../../../../src/graph/types'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { trailId } = queryToInt(req.query)
  const { message } = queryToStrings(req.query)
  res.revalidate(`/trail/${trailId}`)
  res.revalidate('/trail')
  const sc = ServerClient()
  const kennelId = await sc.query<GqlKennelIdForTrailQuery>({
    query: GqlKennelIdForTrailDocument,
    variables: { trailId },
  }).then((r) => (r.data.trails && r.data.trails.length
    ? r.data.trails[0].kennel : null)).catch(() => null)
  if (kennelId) {
    res.revalidate(`/kennel/${kennelId}`)
  }
  res.redirect(`/trail/${trailId}${message ? `?message=${message}` : ''}`)
}
