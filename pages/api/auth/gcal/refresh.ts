import { gql } from '@apollo/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import { refreshAccessToken } from '../../../../src/func/calendar/CalendarAuthFlow'
import { ServerClient } from '../../../../src/graph/hasura'
import { GQLGetRefreshToken } from '../../../../src/graph/types'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { accessToken } = req.query
  if (!accessToken) { throw Error('accessToken must be passed') }

  const sc = ServerClient()
  const refreshToken = await sc.query<GQLGetRefreshToken>({
    query: gql`
query GQLGetRefreshToken($accessToken: String) {
  kennels(where: {google_token: {_eq: $accessToken}}, limit: 1) {
    google_refresh
  }
}
        `,
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
        mutation: gql`
mutation GQLUpdateAccessToken($accessToken: String, $urt: String, $uat: String) {
  update_kennels(_set: {google_refresh: $urt, google_token: $uat}, where: {google_token: {_eq: $accessToken}}) {
    affected_rows
  }
}
            `,
        variables: {
          uat, urt, accessToken,
        },
      }).then(() => r)
    })
  res.json(result)
}
