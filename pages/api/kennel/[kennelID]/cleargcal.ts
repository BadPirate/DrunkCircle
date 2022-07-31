import type { NextApiRequest, NextApiResponse } from 'next'
import { requireUserEmail } from '../../../../src/func/ServerHelpers'
import { ServerClient } from '../../../../src/graph/hasura'
import { GqlUpdateCalendarTokenDocument, GqlUpdateCalendarTokenMutation } from '../../../../src/graph/types'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const userEmail = await requireUserEmail(req)
  const { kennelID } = req.query
  await ServerClient().mutate<GqlUpdateCalendarTokenMutation>({
    mutation: GqlUpdateCalendarTokenDocument,
    variables: {
      accessToken: null,
      refreshToken: null,
      calendar: null,
      kennelID,
      userEmail,
    },
  })
  res.redirect(`/kennel/${kennelID}/edit`)
}
