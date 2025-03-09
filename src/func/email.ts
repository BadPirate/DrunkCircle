/* eslint-disable import/prefer-default-export */
import sgm from '@sendgrid/mail'
import { createHash, randomBytes } from 'crypto'
import { createVerificationToken } from '../graph/hasura'

type UNSUBSCRIBE_GROUP = 'draft' | 'coming_invites'

function unsubscribeGroupId(group: UNSUBSCRIBE_GROUP) {
  switch (group) {
  case 'draft': return 19566
  case 'coming_invites': return 19599
  default: throw Error(`Unknown group type ${group}`)
  }
}

type DRAFT_TYPE = 'action' | 'invite'

function draftId(type: DRAFT_TYPE) {
  switch (type) {
  case 'action': return 'd-2c1452ec7fe34cd4b50ad4dca51ce8e5'
  case 'invite': return 'd-d1d8c910b8ef4cad8d185f5113f2d224'
  default: throw Error(`Unknown draft type ${type}`)
  }
}

type PersonalizationData = {
  to: string,
  subject: string,
  dynamicTemplateData: { [x: string] : string }
}

function hashToken(token: string) {
  return (
    createHash('sha256')
      // Prefer provider specific secret, but use default secret if none specified
      .update(`${token}${process.env.JWT_SECRET}`)
      .digest('hex')
  )
}

export async function loginVerificationToken(email: string) {
  const expires = new Date()
  expires.setDate(expires.getDate() + 7)
  const token = randomBytes(32).toString('hex')
  await createVerificationToken({
    identifier: email,
    expires,
    token: hashToken(token),
  })
  return token
}

export function loginRedirectLink(path: string, email: string, token: string) {
  const host = process.env.NEXT_PUBLIC_CALENDAR_URL
  const callbackUrl = `${host}${path}`
  const params = new URLSearchParams({ callbackUrl, token, email })
  const link = `${host}/api/auth/callback/email?${params}`
  return link
}

export async function sendEmail(
  data: PersonalizationData,
  templateId: DRAFT_TYPE,
  group: UNSUBSCRIBE_GROUP,
) {
  return sendEmails([data], templateId, group)
}

export async function sendEmails(
  personalizations: PersonalizationData[],
  templateId: DRAFT_TYPE,
  group: UNSUBSCRIBE_GROUP,
) {
  const apiKey = process.env.SENDGRID_API_KEY
  if (!apiKey) throw Error('SENDGRID_API_KEY must be set in order to email users')
  sgm.setApiKey(apiKey)
  return rawEmailSend({
    from: 'gm@drunkcircle.com',
    personalizations,
    templateId: draftId(templateId),
    asm: {
      groupId: unsubscribeGroupId(group),
    },
  })
}

let apiKeySet = false
export async function rawEmailSend(data: sgm.MailDataRequired | sgm.MailDataRequired[]) {
  if (!apiKeySet) {
    const apiKey = process.env.SENDGRID_API_KEY
    if (!apiKey) throw Error('SENDGRID_API_KEY must be set in order to email users')
    sgm.setApiKey(apiKey)
    apiKeySet = true
  }
  return sgm.send(data).catch((e) => {
    throw Error(e.response.body.errors[0].message)
  })
}
