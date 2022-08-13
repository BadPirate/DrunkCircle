import { insertHasher } from '../../../src/func/hasher/insert'
import { queryToStrings, requireAll } from '../../../src/func/queryParsing'
import { JSONHandler } from '../../../src/func/ServerHelpers'
import { ServerClient } from '../../../src/graph/hasura'
import { GqlHasherFromEmailDocument, GqlHasherFromEmailQuery } from '../../../src/graph/types'

export default JSONHandler(async ({ req }) => {
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
    return existing
  }
  return insertHasher(sc, email)
})
