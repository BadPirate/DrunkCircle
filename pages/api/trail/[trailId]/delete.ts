/* eslint-disable camelcase */
import { gql } from '@apollo/client'
import { NextApiRequest, NextApiResponse } from 'next'
import { updateGoogleCalendar } from '../../../../src/func/calendar/updateGoogleCalendar'
import { queryToInt, requireAll } from '../../../../src/func/queryParsing'
import { requireKnownUser } from '../../../../src/func/ServerHelpers'
import { deleteTrail } from '../../../../src/func/trail/deleteTrail'
import { fixCalculatedNumbers } from '../../../../src/func/trail/fixCalculatedNumbers'
import { GQL_HARE_CHECK_FRAGMENT, hareAuthorized } from '../../../../src/func/trail/hareCheck'
import { ServerClient } from '../../../../src/graph/hasura'
import { GQLDeleteVerify } from '../../../../src/graph/types'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const user = await requireKnownUser(req, res)
  if (!user) return
  const { trailId } = queryToInt(req.query)
  requireAll({ trailId })
  const ac = ServerClient()
  const verifyInfo = await ac.query<GQLDeleteVerify>({
    query: gql`
${GQL_HARE_CHECK_FRAGMENT}
query GQLDeleteVerify($trailId: Int) {
  trails(where: {id: {_eq: $trailId}}) {
    ...GQLHareCheckFragment
    kennel
  }
}
      `,
    variables: { trailId },
  }).then((r) => {
    if (!r.data.trails || r.data.trails.length < 1) {
      throw new Error('Unable to find trail')
    }
    return r.data.trails[0]
  })
  const { kennel } = verifyInfo

  if (!hareAuthorized(verifyInfo, user)) {
    throw new Error('User does not have permission to delete this trail.  Speak with a Hare.')
  }
  await deleteTrail(ac, trailId)
  await fixCalculatedNumbers(ac, kennel)
  updateGoogleCalendar(ac, kennel) // Fire and forget
  res.redirect(`/kennel/${kennel}?message=Trail Deleted.`)
}
