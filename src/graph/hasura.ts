/* eslint-disable no-console */
import {
  ApolloClient, InMemoryCache, HttpLink, gql,
} from '@apollo/client'
import { v4 as uuidv4 } from 'uuid'
import jwt from 'jsonwebtoken'
import {
  Adapter, AdapterSession, AdapterUser, VerificationToken,
} from 'next-auth/adapters'
import {
  CallbacksOptions, Profile, Account, Session,
} from 'next-auth'
import {
  GQLCheckVerificationToken, GQLCreateSession, GQLCreateUser, GQLCreateVerificationToken,
  GQLDeleteSession, GQLGetSessionAndUser, GQLGetUser, GQLGetUserByAccount, GQLGetUserByEmail,
  GQLLinkAccount, GQLUpdateSession, GQLUpdateUser, GQLUseVerificationToken,
} from './types'
import { ilog } from '../func/Logging'

const MAX_AGE = (24 * 60 * 60 * 30) // 30 days

export const HasuraClient = (authToken : string) => new ApolloClient({
  link: new HttpLink({
    uri: process.env.NEXT_PUBLIC_HASURA_ENDPOINT,
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  }),
  cache: new InMemoryCache(),
})

export const ServerClient = () => new ApolloClient({
  link: new HttpLink({
    uri: process.env.NEXT_PUBLIC_HASURA_ENDPOINT,
    headers: {
      'X-Hasura-Admin-Secret': process.env.HASURA_GRAPHQL_ADMIN_SECRET || '',
    },
  }),
  cache: new InMemoryCache(),
})

export const hasuraToken = (
  email : string,
  userid: string,
  name : string,
  role : string,
  maxAge : number,
) => {
  const secret = process.env.JWT_SECRET
  if (!secret) {
    throw new Error('JWT_SECRET must be set in .env')
  }
  ilog('hasuraToken', email, userid)
  return jwt.sign({
    sub: email,
    name,
    email,
    iat: Date.now() / 1000,
    exp: Math.floor(Date.now() / 1000) + (maxAge || MAX_AGE),
    'https://hasura.io/jwt/claims': {
      'x-hasura-allowed-roles': [role],
      'x-hasura-default-role': role,
      'x-hasura-role': role,
      'x-hasura-user-id': `${userid}`,
    },
  }, secret, { algorithm: 'HS256' })
}

export const HasuraCallbacks = <Partial<CallbacksOptions<Profile, Account>>>{
  jwt: async ({ token, user }) => {
    ilog('jwt:', token, user)
    if (user) {
      return {
        ...token,
        user,
      }
    }
    return token
  },
  session: async ({ user: { email, name, id }, session, token }) => {
    ilog('session:', email, token)
    if (!email || !id || !name) return session
    return <Session>{
      hasura_token: hasuraToken(email, id, name, 'hasher', MAX_AGE),
      id,
      ...session,
    }
  },
}

const adapterClient = HasuraClient(hasuraToken(
  <string>process.env.HASURA_SERVER_USER_EMAIL,
  '10',
  <string>process.env.HASURA_SERVER_USER_NAME,
  <string>process.env.HASURA_SERVER_USER_ROLE,
  MAX_AGE,
))

export function HasuraAdapter() {
  return <Adapter>{
    getUserByEmail: async (email: string) => {
      ilog('getUserByEmail...', email)
      return adapterClient.query<GQLGetUserByEmail>({
        query: gql`
  query GQLGetUserByEmail($email: String) {
    hashers(where: {email: {_eq: $email}}) {
      id
      email
      name
      email_verified
    }
  }
  `,
        variables: { email },
      }).then((result) => {
        const hasher = result.data.hashers[0]
        if (!hasher) return null
        const user = <AdapterUser>{
          id: `${hasher.id}`,
          emailVerified: hasher.email_verified,
          email: hasher.email,
          name: hasher.name,
        }
        ilog('getUserByEmail:', user)
        return user
      })
    },

    createVerificationToken: async (verificationToken: VerificationToken) => {
      const { identifier: email, token, expires } = verificationToken
      ilog('createVerficationToken...', verificationToken)
      return adapterClient.mutate<GQLCreateVerificationToken>({
        mutation: gql`
mutation GQLCreateVerificationToken($token: String = "", $expires: timestamptz = "", $email: String = "") {
  update_hashers(where: {email: {_eq: $email}}, _set: {login: $token, login_expires: $expires}) {
    returning {
      id
    }
  }
}`,
        variables: { email, token, expires },
      }).then((result) => {
        if (!result.data
          || !result.data.update_hashers || result.data.update_hashers.returning.length < 0) {
          throw Error('Unable to set verification token')
        }
        ilog('createVerficationToken:', verificationToken)
        return <VerificationToken>verificationToken
      })
    },

    useVerificationToken: async (params: {
      identifier: string;
      token: string;
  }) => {
      const { identifier, token } = params
      ilog('useVerificationToken...', params)
      return adapterClient.query<GQLCheckVerificationToken>({
        query: gql`
        query GQLCheckVerificationToken($identifier: String, $token: String) {
  hashers(where: {email: {_eq: $identifier}, login: {_eq: $token}}) {
    login_expires
  }
}
        `,
        variables: params,
      }).then((result) => {
        if (result.data.hashers.length < 1) {
          console.error('useVerificationToken expired or 0 length')
          return null
        }
        const validToken = {
          identifier,
          expires: result.data.hashers[0].login_expires,
          token,
        }
        ilog('useVerificationToken: valid', validToken)
        return adapterClient.mutate<GQLUseVerificationToken>({
          mutation: gql`
mutation GQLUseVerificationToken($identifier: String, $token: String, $email_verified: timestamptz) {
  update_hashers(where: {email: {_eq: $identifier}, login: {_eq: $token}}, _set: {login: null, login_expires: null, email_verified: $email_verified}) {
    returning {
      login_expires
    }
  }
}`,
          variables: {
            ...params,
            email_verified: new Date(),
          },
        }).then(() => validToken)
      })
    },

    getSessionAndUser: async (sessionToken: any) => {
      ilog('getSessionAndUser...', sessionToken)
      return adapterClient.query<GQLGetSessionAndUser>({
        query: gql`
        query GQLGetSessionAndUser($sessionToken: String) {
  sessions(where: {session_token: {_eq: $sessionToken}}) {
    id
    expires
    user {
      email
      email_verified
      id
      name
    }
  }
}`,
        variables: { sessionToken },
      }).then((result) => {
        if (result.data.sessions.length < 1) {
          return null
        }
        const {
          id: sessionId,
          expires,
          user: {
            id: userId,
            email_verified: emailVerified,
            name,
            email,
          },
        } = result.data.sessions[0]
        const user = <AdapterUser>{
          id: `${userId}`,
          email,
          emailVerified,
          name,
        }
        const session = <AdapterSession>{
          id: sessionId,
          sessionToken,
          userId: `${user.id}`,
          expires: new Date(expires),
        }
        ilog('getSessionAndUser:', user.email)
        return { user, session }
      })
    },

    deleteSession: async (sessionToken: any) => {
      console.error('deleteSession...', sessionToken)
      return adapterClient.mutate<GQLDeleteSession>({
        mutation: gql`
        mutation GQLDeleteSession($sessionToken: String) {
  delete_sessions(where: {session_token: {_eq: $sessionToken}}) {
    returning {
      expires
      id
      user_id
    }
  }
}`,
        variables: { sessionToken },
      }).then((result) => {
        if (!result.data?.delete_sessions?.returning
          || result.data?.delete_sessions?.returning.length < 1) {
          ilog('deletesession: no session found')
          return null
        }
        const data = result.data.delete_sessions.returning[0]
        const session = <AdapterSession>{
          sessionToken,
          id: data.id,
          expires: new Date(data.expires),
          userId: `${data.user_id}`,
        }
        ilog('deleteSession:', session)
        return session
      })
    },

    updateUser: async (user: Partial<AdapterUser>) => {
      console.error('updateUser', user)
      return adapterClient.mutate<GQLUpdateUser>({
        mutation: gql`
        mutation GQLUpdateUser($id: Int = 10, $emailVerified: timestamptz) {
  update_hashers(where: {id: {_eq: $id}}, _set: {email_verified: $emailVerified}) {
    returning {
      email
      email_verified
      id
      name
    }
  }
}`,
        variables: user,
      }).then((result) => {
        if (!result.data?.update_hashers?.returning
          || result.data?.update_hashers?.returning.length < 1) {
          throw Error(`Unknown user, ${JSON.stringify(user)}`)
        }
        const data = result.data?.update_hashers?.returning[0]
        const fullUser = <AdapterUser>{
          email: data.email,
          emailVerified: data.email_verified,
          id: `${data.id}`,
          name: data.name,
        }
        return fullUser
      })
    },

    createSession: async (session: {
      sessionToken: string;
      userId: string;
      expires: Date;
  }) => {
      console.error('createSession...', session)
      return adapterClient.mutate<GQLCreateSession>({
        mutation: gql`
        mutation GQLCreateSession($sessionToken: String, $userId: Int = 10, $expires: timestamptz, $id: String = "") {
  insert_sessions_one(object: {session_token: $sessionToken, user_id: $userId, expires: $expires, id: $id}) {
    id
  }
}`,
        variables: {
          ...session,
          id: uuidv4(),
        },
      }).then((result) => {
        if (!result.data?.insert_sessions_one?.id) {
          console.error('createSession: unable to insert')
          return null
        }
        const authenticatedSession = <AdapterSession>{
          ...session,
          id: result.data.insert_sessions_one.id,
        }
        ilog('createSession:', authenticatedSession)
        return authenticatedSession
      })
    },

    createUser: async (omitUser: Omit<AdapterUser, 'id'>) => {
      ilog('createUser...', omitUser)
      return adapterClient.query<GQLCreateUser>({
        query: gql`
mutation GQLCreateUser($email: String, $name: String) {
  insert_hashers_one(object: {email: $email, name: $name}) {
    id
  }
}
`,
        variables: omitUser,
      }).then((result) => {
        if (!result.data.insert_hashers_one?.id) {
          throw Error('No user created')
        }
        const user = <AdapterUser>{
          ...omitUser,
          id: `${result.data.insert_hashers_one.id}`,
        }
        return user
      })
    },

    getUser: async (id: string) => {
      ilog('getUser...', id)
      return adapterClient.query<GQLGetUser>({
        query: gql`
        query GQLGetUser($id: Int) {
  hashers(where: {id: {_eq: $id}}, limit: 1) {
    email
    email_verified
    name
  }
}`,
        variables: { id },
      }).then((result) => {
        if (!result.data.hashers || result.data.hashers.length < 0) {
          ilog('getUser: Unknown', id)
          return null
        }
        const data = result.data.hashers[0]
        const user = <AdapterUser>{
          id,
          email: data.email,
          emailVerified: data.email_verified,
          name: data.name,
        }
        ilog('getUser:', user)
        return user
      })
    },

    getUserByAccount: (providerAccountId: Pick<Account, 'provider' | 'providerAccountId'>) => {
      ilog('getUserByAccount...', providerAccountId)
      return adapterClient.query<GQLGetUserByAccount>({
        query: gql`
        query GQLGetUserByAccount($provider: String, $providerAccountId: String) {
  account_links(limit: 1, where: {provider: {_eq: $provider}, provider_id: {_eq: $providerAccountId}}) {
    user {
      id
      email
      email_verified
      name
    }
  }
}`,
        variables: providerAccountId,
      }).then((result) => {
        if (!result.data.account_links || result.data.account_links.length < 1) {
          return null
        }
        const data = result.data.account_links[0].user
        const user = <AdapterUser>{
          id: `${data.id}`,
          email: data.email,
          emailVerified: data.email_verified,
          name: data.name,
        }
        ilog('getUserByAccount:', user)
        return user
      })
    },

    linkAccount: (account: Account) => {
      ilog('linkAccount...', account)
      return adapterClient.mutate<GQLLinkAccount>({
        mutation: gql`
        mutation GQLLinkAccount($provider: String, $providerAccountId: String, $userId: Int) {
  insert_account_links_one(object: {provider: $provider, provider_id: $providerAccountId, user_id: $userId}) {
    user_id
  }
}`,
        variables: account,
      }).then((result) => {
        if (!result.data?.insert_account_links_one?.user_id) {
          return null
        }
        return account
      })
    },

    updateSession: (session: Partial<AdapterSession> & Pick<AdapterSession, 'sessionToken'>) => {
      ilog('updateSession...', session.userId)
      return adapterClient.query<GQLUpdateSession>({
        query: gql`
        query GQLUpdateSession($sessionToken: String) {
  sessions(limit: 1, where: {session_token: {_eq: $sessionToken}}) {
    id
    user_id
    expires
  }
}`,
        variables: session,
      }).then((result) => {
        if (!result.data.sessions || result.data.sessions.length < 1) {
          ilog('updateSession: no session found')
          return null
        }
        const data = result.data.sessions[0]
        const updatedSession = <AdapterSession>{
          id: data.id,
          userId: `${data.user_id}`,
          expires: data.expires,
          sessionToken: session.sessionToken,
        }
        ilog('updateSession:', updatedSession.id)
        return updatedSession
      })
    },
  }
}
