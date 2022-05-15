import type { NextApiRequest, NextApiResponse } from 'next'
import { getTokenFromCode, storeTokenForKennel } from '../../../../src/api/google'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    code,
    state,
  } = req.query
  if (typeof code !== 'string') {
    throw Error('Code expected to be string type')
  }
  if (typeof state !== 'string' || !parseInt(state, 10)) {
    throw Error(`Invalid Kennel ID: ${state}`)
  }
  const kennelID = parseInt(state, 10)

  await getTokenFromCode(code)
    .then((tokens) => storeTokenForKennel(kennelID, tokens))

  res.redirect(`/kennel/${kennelID}/edit`)
}
