import { gql } from '@apollo/client'
import { NextApiRequest, NextApiResponse } from 'next'
import { queryToInt } from '../../../../src/func/queryParsing'
import { requireKnownUser } from '../../../../src/func/ServerHelpers'
import { insertTrail } from '../../../../src/func/trail/InsertTrail'
import { ServerClient } from '../../../../src/graph/hasura'
import { GQLUpdateSelfDraft } from '../../../../src/graph/types'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const user = await requireKnownUser(req, res)
  if (!user) return
  const { kennelID } = queryToInt(req.query)
  if (!kennelID) throw Error('Kennel ID Required')
  const sc = ServerClient()
  const now = new Date()
  const start = new Date()
  start.setDate(now.getDate() + 1)
  start.setHours(18, 30)
  const trailId = await insertTrail(sc, {
    id: null,
    calculated_number: null,
    description: null,
    directions: null,
    draft: null,
    google_calendar: null,
    kennel: kennelID,
    latitude: null,
    longitude: null,
    name: `${user.name} didn't give this trail a name.`,
    number: null,
    start: start.toISOString(),
    hares: [{ hasher: user.id }],
  })
  await sc.mutate<GQLUpdateSelfDraft>({
    mutation: gql`
mutation GQLUpdateSelfDraft($trailId: Int!) {
  update_trails_by_pk(pk_columns: {id: $trailId}, _set: {draft: $trailId}) {
    id
  }
}      `,
    variables: { trailId },
  }).then((r) => {
    if (!r.data?.update_trails_by_pk?.id) {
      throw Error('Unable to update as draft')
    }
  })
  res.redirect(`/trail/${trailId}/edit`)
}
