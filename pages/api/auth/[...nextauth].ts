import NextAuth, { Session } from 'next-auth'
import EmailProvider from 'next-auth/providers/email'
import GoogleProvider from 'next-auth/providers/google'
import { HasuraAdapter, HasuraCallbacks } from '../../../src/graph/hasura'

const gid = process.env.GOOGLE_CLIENT_ID
const gsc = process.env.GOOGLE_CLIENT_SECRET

if (!gid || !gsc) throw Error('GOOGLE_CLIENT_ID & GOOGLE_CLIENT_SECRET must be set')

export interface HasuraSession extends Session {
  hasura_token?: string;
}

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
  ],
  adapter: HasuraAdapter(),
  secret: process.env.JWT_SECRET,
  callbacks: HasuraCallbacks,
})
