import { gql } from '@apollo/client'
import { NextApiRequest, NextApiResponse } from 'next'
import { catchError } from '../../../src/func/catchError'
import { insertHasher } from '../../../src/func/hasher/insert'
import { queryToStrings, requireAll } from '../../../src/func/queryParsing'
import { ServerClient } from '../../../src/graph/hasura'
import { GQLHasherFromEmail } from '../../../src/graph/types'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { email } = queryToStrings(req.query)
    requireAll({ email })
    const sc = ServerClient()
    const existing = await sc.query<GQLHasherFromEmail>({
      query: gql`
 query GQLHasherFromEmail($email: String) {
  hashers(where: {email: {_like: $email}}, limit: 1) {
    id
    name
  }
}       
        `,
      variables: { email },
    }).then((r) => {
      if (r.error) {
        throw Error(`Apollo error: ${r.error.message}`)
      }
      if (!r.data || r.data.hashers.length < 1) {
        return null
      }
      return r.data.hashers[0]
    })
    if (existing) {
      res.json(existing)
      return
    }
    // No existing user, create
    res.json(await insertHasher(sc, email))
  } catch (e) {
    res.json({ error: catchError(e) })
  }
}
