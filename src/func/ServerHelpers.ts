import { NextApiRequest } from "next"
import { DefaultSession, Session } from "next-auth"
import { getSession } from "next-auth/react"

export const GoogleLimit = 5

export async function requireSession(req : NextApiRequest) : Promise<Session> {
    const session = await getSession({ req })
    if (!session) {
        throw Error('Must have a valid session')
    }
    return session
}

type DCUser = {
    name?: string | null;
    email?: string | null;
    image?: string | null;
}

export async function requireUser(req : NextApiRequest) : Promise<DCUser> {
    const session = await requireSession(req)
    if (!session.user) {
        throw Error('Must be logged in')
    }
    return session.user
}

export async function requireUserEmail(req : NextApiRequest) : Promise<string> {
    const user = await requireUser(req)
    if (!user.email) {
        throw Error('Must have a set email address')
    }
    return user.email
}