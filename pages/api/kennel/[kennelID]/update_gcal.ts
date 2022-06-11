import { NextApiRequest, NextApiResponse } from 'next'
import { updateGoogleCalendar } from '../../../../src/func/calendar/updateGoogleCalendar'
import { queryToInt, requireAll } from '../../../../src/func/queryParsing'
import { ServerClient } from '../../../../src/graph/hasura'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { kennelID } = queryToInt(req.query)
  requireAll({ kennelID })
  const progress = await updateGoogleCalendar(ServerClient(), kennelID)
  res.json(progress)
}
