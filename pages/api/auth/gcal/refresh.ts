import type { NextApiRequest, NextApiResponse } from 'next'
import { refreshAccessToken } from '../../../../src/func/calendar/CalendarAuthFlow'
import { ServerClient } from '../../../../src/graph/hasura'
import { GqlGetRefreshTokenDocument, GqlGetRefreshTokenQuery } from '../../../../src/graph/types'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { accessToken } = req.query
  if (!accessToken) { throw Error('accessToken must be passed') }

  const sc = ServerClient()
  const refreshToken = await sc.query<GqlGetRefreshTokenQuery>({
    query: GqlGetRefreshTokenDocument,
    variables: { accessToken },
  }).then((r) => {
    if (r.data.kennels.length < 1) {
      throw Error('Access token not found')
    }
    return r.data.kennels[0].google_refresh
  })
  if (!refreshToken) {
    throw Error('Unable to refresh token')
  }

  const result = await refreshAccessToken(refreshToken)
    .then(async (r) => {
      const { accessToken: uat, refreshToken: urt } = r
      if (!uat || !urt) {
        throw Error('No refresh / access token in response')
      }
      return sc.mutate({
        mutation: GqlGetRefreshTokenDocument,
        variables: {
          uat, urt, accessToken,
        },
      }).then(() => r)
    })
  res.json(result)
}
