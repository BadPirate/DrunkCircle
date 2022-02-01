import NextAuth from 'next-auth'
import EmailProvider from 'next-auth/providers/email'
import { HasuraAdapter, HasuraCallbacks } from '../../../src/graph/hasura'

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    EmailProvider({
      server: process.env.SMTP_SERVER,
      from: process.env.SMTP_FROM,
      // maxAge: 24 * 60 * 60, // How long email links are valid for (default 24h)
    }),
  ],
  adapter: HasuraAdapter(),
  secret: process.env.JWT_SECRET,
  callbacks: HasuraCallbacks,
})
