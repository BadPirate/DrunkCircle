import { NextApiRequest, NextApiResponse } from 'next'
import { Session } from 'next-auth'
import { getSession } from 'next-auth/react'

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

type DCUser = {
    name?: string | null
    email?: string | null
    image?: string | null
    id?: string | null
}

type DCKnownUser = {
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
