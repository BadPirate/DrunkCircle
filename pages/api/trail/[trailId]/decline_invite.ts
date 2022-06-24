import { NextApiRequest, NextApiResponse } from 'next'
import { queryToInt, requireAll } from '../../../../src/func/queryParsing'
import { requireKnownUser } from '../../../../src/func/ServerHelpers'
import { updateAttendance } from '../../../../src/graph/GQL_UPDATE_ATTENDANCE'
import { ServerClient } from '../../../../src/graph/hasura'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { trailId } = queryToInt(req.query)
  requireAll({ trailId })
  const user = await requireKnownUser(req, res)
  if (!user) return
  await updateAttendance(ServerClient(), { attended: false, hasher: user.id, trail: trailId })
  res.redirect(`/trail/${trailId}?message=You're not coming :(`)
}
