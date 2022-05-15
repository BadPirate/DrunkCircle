import OAuth from 'oauth'

const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID
const clientSecret = process.env.GOOGLE_CLIENT_SECRET

let oauth2 : OAuth.OAuth2 | undefined
let publicOauth2 : OAuth.OAuth2 | undefined 

if (clientId) {
  publicOauth2 = new OAuth.OAuth2(
    clientId || '',
    '',
    'https://accounts.google.com/',
    'o/oauth2/auth',
    'o/oauth2/token',
  )
  if (clientSecret) {
    oauth2 = new OAuth.OAuth2(
      clientId,
      clientSecret,
      'https://accounts.google.com/',
      'o/oauth2/auth',
      'o/oauth2/token',
    )
  }
}

// eslint-disable-next-line import/prefer-default-export
export const accessURL = async (kennelID : string) => new Promise<string>((resolve, reject) => {
  if (!publicOauth2) {
    throw Error("NEXT_PUBLIC_GOOGLE_CLIENT_ID must be set")
  }
  resolve(publicOauth2.getAuthorizeUrl({
    prompt: 'consent',
    access_type: 'offline',
    response_type: 'code',
    scope: 'https://www.googleapis.com/auth/calendar.events https://www.googleapis.com/auth/calendar email profile',
    redirect_uri: 'http://localhost:3000/api/auth/gcal',
    state: kennelID,
  }))
})

type AccessTokenResponse = {
  accessToken : string,
  refreshToken : string
}

// eslint-disable-next-line max-len
export const accessAndRefresh = async (code: string) => new Promise<AccessTokenResponse>((resolve, reject) => {
  if (!oauth2) {
    reject(Error('GOOGLE_CLIENT_SECRET & NEXT_PUBLIC_GOOGLE_CLIENT_ID must be set'))
    return
  }
  oauth2.getOAuthAccessToken(
    code,
    {
      grant_type: 'authorization_code',
      redirect_uri: 'http://localhost:3000/api/auth/gcal',
    },
    (e, accessToken, refreshToken) => {
      if (e) {
        reject(e)
        return
      }
      resolve({
        accessToken,
        refreshToken,
      })
    },
  )
})

export const refreshAccessToken = async (refreshToken: string) => new Promise<AccessTokenResponse>((resolve, reject) => {
  if (!oauth2) {
    reject(Error('GOOGLE_CLIENT_SECRET & NEXT_PUBLIC_GOOGLE_CLIENT_ID must be set'))
    return
  }
  oauth2.getOAuthAccessToken(
    refreshToken,
    {
      grant_type: 'refresh_token',
    },
    (e, accessToken, refreshToken) => {
      if (e) {
        reject(e)
        return
      }
      resolve({accessToken, refreshToken})
    }
  )
})
