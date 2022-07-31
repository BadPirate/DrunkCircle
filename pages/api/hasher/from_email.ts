import { NextApiRequest, NextApiResponse } from 'next'
import { catchError } from '../../../src/func/catchError'
import { insertHasher } from '../../../src/func/hasher/insert'
import { queryToStrings, requireAll } from '../../../src/func/queryParsing'
import { ServerClient } from '../../../src/graph/hasura'
import { GqlHasherFromEmailDocument, GqlHasherFromEmailQuery } from '../../../src/graph/types'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { email } = queryToStrings(req.query)
    requireAll({ email })
    const sc = ServerClient()
    const existing = await sc.query<GqlHasherFromEmailQuery>({
      query: GqlHasherFromEmailDocument,
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
