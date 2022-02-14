import NextAuth from 'next-auth'
import EmailProvider from 'next-auth/providers/email'
import GoogleProvider from 'next-auth/providers/google'
import { HasuraAdapter, HasuraCallbacks } from '../../../src/graph/hasura'

const gid = process.env.GOOGLE_CLIENT_ID
const gsc = process.env.GOOGLE_CLIENT_SECRET

if (!gid || !gsc) throw Error('GOOGLE_CLIENT_ID & GOOGLE_CLIENT_SECRET must be set')

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    EmailProvider({
      server: process.env.SMTP_SERVER,
      from: process.env.SMTP_FROM,
      // maxAge: 24 * 60 * 60, // How long email links are valid for (default 24h)
    }),
    GoogleProvider({
      clientId: gid,
      clientSecret: gsc,
    }),
    {
      id: 'googlecal',
      name: 'Google + Calendar',
      type: 'oauth',
      version: '2.0',
      wellKnown: 'https://accounts.google.com/.well-known/openid-configuration',
      authorization: {
        params: {
          scope: [
            'https://www.googleapis.com/auth/userinfo.profile',
            'https://www.googleapis.com/auth/userinfo.email',
            'https://www.googleapis.com/auth/calendar',
          ].join(' '),
        },
      },
      idToken: true,
      profile: (profile: any) => ({
        id: profile.id, name: profile.name, email: profile.email, image: profile.picture,
      }),
      clientId: gid,
      clientSecret: gsc,
    },
  ],
  adapter: HasuraAdapter(),
  secret: process.env.JWT_SECRET,
  callbacks: HasuraCallbacks,
})
