import { NextApiRequest, NextApiResponse } from 'next'
import { updateGoogleCalendar } from '../../../../src/func/calendar/updateGoogleCalendar'
import { queryToInt, requireAll } from '../../../../src/func/queryParsing'
import { requireKnownUser } from '../../../../src/func/ServerHelpers'
import { deleteTrail } from '../../../../src/func/trail/deleteTrail'
import { fixCalculatedNumbers } from '../../../../src/func/trail/fixCalculatedNumbers'
import { hareAuthorized } from '../../../../src/func/trail/hareCheck'
import moveAttendance, { reidentifyTrail } from '../../../../src/func/trail/moveAttendance'
import { ServerClient } from '../../../../src/graph/hasura'
import {
  GqlAcceptVerifyDocument, GqlAcceptVerifyQuery, GqlClearDraftMutationDocument,
} from '../../../../src/graph/types'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const user = await requireKnownUser(req, res)
  if (!user) return
  const { trailId } = queryToInt(req.query)
  requireAll({ trailId })
  const sc = ServerClient()
  const info = await sc.query<GqlAcceptVerifyQuery>({
    query: GqlAcceptVerifyDocument,
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
  if (!await hareAuthorized(sc, req, res, info.draftFor!, user)) {
    throw Error('You are not authorized to accept this trail.')
  }
  await moveAttendance(sc, originalId, trailId)
  await sc.mutate({
    mutation: GqlClearDraftMutationDocument,
    variables: { trailId },
  })
  await deleteTrail(sc, originalId) // Delete the original trail
  await reidentifyTrail(sc, trailId, originalId)
  await fixCalculatedNumbers(sc, info.kennel)
  await updateGoogleCalendar(sc, info.kennel)
  res.revalidate(`/trail/${originalId}`)
  res.revalidate(`/kennel/${info.kennel}`)
  res.redirect(`/trail/${originalId}?message=Draft accepted.`)
}
