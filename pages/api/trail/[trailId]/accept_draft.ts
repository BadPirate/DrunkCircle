import { gql } from '@apollo/client'
import { NextApiRequest, NextApiResponse } from 'next'
import { updateGoogleCalendar } from '../../../../src/func/calendar/updateGoogleCalendar'
import { queryToInt, requireAll } from '../../../../src/func/queryParsing'
import { requireKnownUser } from '../../../../src/func/ServerHelpers'
import { deleteTrail } from '../../../../src/func/trail/deleteTrail'
import { GQL_HARE_CHECK_FRAGMENT, hareAuthorized } from '../../../../src/func/trail/hareCheck'
import { ServerClient } from '../../../../src/graph/hasura'
import { GQLAcceptVerify } from '../../../../src/graph/types'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const user = await requireKnownUser(req, res)
  if (!user) return
  const { trailId } = queryToInt(req.query)
  requireAll({ trailId })
  const sc = ServerClient()
  const info = await sc.query<GQLAcceptVerify>({
    query: gql`
${GQL_HARE_CHECK_FRAGMENT}
query GQLAcceptVerify($trailId: Int) {
  trails(where: {id: {_eq: $trailId}}, limit: 1) {
    draft
    kennel
    draftFor {
        id
      ...GQLHareCheckFragment
    }
  }
}
      `,
    variables: { trailId },
  }).then((r) => {
    if (!r.data.trails || r.data.trails.length < 1) {
      throw Error('Unable to find draft or original trail')
    }
    const i = r.data.trails[0]

    return i
  })
  const originalId = info.draftFor?.id
  if (!originalId) {
    throw Error('Trail is not a draft')
  }
  if (!hareAuthorized(info.draftFor!, user)) {
    throw Error('You are not authorized to accept this trail.')
  }
  deleteTrail(sc, originalId) // Delete the trail
  await sc.mutate({
    mutation: gql`
mutation GQLAcceptDraftMutation($draftId: Int!, $originalId: Int!) {
  update_trails_by_pk(pk_columns: {id: $draftId}, _set: {id: $originalId, gcal_dirty: true}) {
    id
  }
}
      `,
    variables: {
      draftId: trailId,
      originalId,
    },
  })
  await updateGoogleCalendar(sc, info.kennel)
  res.unstable_revalidate(`/trail/${originalId}`)
  res.unstable_revalidate(`/kennel/${info.kennel}`)
  res.redirect(`/trail/${originalId}?message=Draft accepted.`)
}
