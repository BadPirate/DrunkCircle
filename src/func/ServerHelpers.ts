import { NextApiRequest, NextApiResponse } from 'next'
import { Session } from 'next-auth'
import { getSession } from 'next-auth/react'
import { catchError } from './catchError'

export const GoogleLimit = 5

export async function requireSession(
  req : NextApiRequest,
  redirect: NextApiResponse | undefined = undefined,
) : Promise<Session|undefined> {
  const session = await getSession({ req })
  if (!session) {
    if (redirect) {
      redirect.redirect(`/api/auth/signin?callbackUrl=${encodeURIComponent(req.url!)}`)
      return undefined
    }
    throw Error('Must have a valid session')
  }
  return session
}

export type DCUser = {
    name?: string | null
    email?: string | null
    image?: string | null
    id?: string | null
}

export type DCKnownUser = {
  name?: string | null
  email: string
  image?: string | null
  id: number
}

export async function requireUser(
  req : NextApiRequest,
  redirect: NextApiResponse | undefined = undefined,
) : Promise<DCUser|undefined> {
  const session = await requireSession(req, redirect)
  if (!session) return undefined
  if (!session.user) {
    throw Error('Must be logged in')
  }
  return session.user
}

export async function requireKnownUser(
  req : NextApiRequest,
  redirect: NextApiResponse | undefined = undefined,
) : Promise<DCKnownUser|undefined> {
  const user = await requireUser(req, redirect)
  if (!user) return undefined
  if (!user.email || !user.id) throw Error('User information incomplete')
  return {
    email: user.email!,
    name: user.name,
    image: user.image,
    id: parseInt(user.id!, 10),
  }
}

export async function requireUserEmail(
  req : NextApiRequest,
  redirect: NextApiResponse | undefined = undefined,
) : Promise<string|undefined> {
  const user = await requireUser(req, redirect)
  if (!user) return undefined
  if (!user.email) {
    throw Error('Must have a set email address')
  }
  return user.email
}

type NextApiDetails = {req: NextApiRequest, res: NextApiResponse}
// eslint-disable-next-line no-unused-vars
type NextHandler = (details: NextApiDetails) => Promise<any>

export function JSONHandler(handler: NextHandler) {
  return (req: NextApiRequest, res: NextApiResponse) => handler({ req, res })
    .then((r) => {
      if (!r) return
      res.status(200).json(r)
    })
    .catch((e) => {
      res.status(400).json({
        error: catchError(e).message,
      })
    })
}
