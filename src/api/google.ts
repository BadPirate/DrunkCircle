/* eslint-disable camelcase */
import { Credentials } from 'google-auth-library'
import { calendar_v3, google } from 'googleapis'
import { ServerClient } from '../graph/hasura'
import { GqlUpdateGoogleTokensDocument, GqlUpdateGoogleTokensMutation } from '../graph/types'

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, NEXT_PUBLIC_URL } = process.env

if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET || !NEXT_PUBLIC_URL) {
  throw Error('!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET')
}

const oauth2Client = new google.auth.OAuth2(
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  `${NEXT_PUBLIC_URL}/api/auth/gcal`,
)

export async function getTokenFromCode(code: string) {
  return oauth2Client.getToken(code).then((r) => r.tokens)
}

export async function storeTokenForKennel(kennelID: number, token: Credentials) : Promise<void> {
  if (!token.access_token || !token.refresh_token) {
    return Promise.reject(Error('Access or refresh token not set'))
  }
  return ServerClient().mutate<GqlUpdateGoogleTokensMutation>({
    mutation: GqlUpdateGoogleTokensDocument,
    variables: {
      accessToken: token.access_token,
      refreshToken: token.refresh_token,
      kennelID,
    },
  }).then((r) => {
    if (!r.data?.update_kennels?.affected_rows || r.data.update_kennels.affected_rows === 0) {
      throw Error('No rows updated')
    }
  })
}

export function gcal(accessToken : string, refreshToken: string) : calendar_v3.Calendar {
  oauth2Client.setCredentials({
    access_token: accessToken,
    refresh_token: refreshToken,
  })
  return google.calendar({
    version: 'v3',
    auth: oauth2Client,
  })
}

export async function getMe(accessToken : string, refreshToken: string) {
  oauth2Client.setCredentials({
    access_token: accessToken,
    refresh_token: refreshToken,
  })
  return google.people({
    version: 'v1',
    auth: oauth2Client,
  }).people.get({
    resourceName: 'people/me',
    personFields: 'emailAddresses',
  }).catch((e) => {
    throw Error(`Google auth error: ${e.message}`)
  })
}
