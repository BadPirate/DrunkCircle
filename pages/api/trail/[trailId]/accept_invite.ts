import { NextApiRequest, NextApiResponse } from 'next'
import { queryToInt, requireAll } from '../../../../src/func/queryParsing'
import { requireKnownUser } from '../../../../src/func/ServerHelpers'
import { updateAttendance } from '../../../../src/graph/update_attendance'
import { ServerClient } from '../../../../src/graph/hasura'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { trailId } = queryToInt(req.query)
  requireAll({ trailId })
  const user = await requireKnownUser(req, res)
  if (!user) {
    res.status(401).json({ error: 'Unauthorized: User not found' })
    return
  }
  await updateAttendance(ServerClient(), { attended: true, hasher: user.id, trail: trailId })
  res.redirect(`/trail/${trailId}?message=You're coming.`)
}
