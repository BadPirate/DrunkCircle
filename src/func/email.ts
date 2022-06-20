/* eslint-disable import/prefer-default-export */
import sgm from '@sendgrid/mail'

type UNSUBSCRIBE_GROUP = 'draft'

function unsubscribeGroupId(group: UNSUBSCRIBE_GROUP) {
  switch (group) {
  case 'draft': return 19566
  default: throw Error(`Unknown group type ${group}`)
  }
}

export async function sendEmail(
  to: string,
  subject: string,
  text: string,
  group: UNSUBSCRIBE_GROUP,
  action: string,
  url: string,
) {
  const apiKey = process.env.SENDGRID_API_KEY
  if (!apiKey) throw Error('SENDGRID_API_KEY must be set in order to email users')
  sgm.setApiKey(apiKey)
  return sgm.send({
    to,
    from: 'gm@drunkcircle.com',
    subject,
    dynamicTemplateData: {
      title: subject,
      body: text,
      action,
      url,
    },
    templateId: 'd-2c1452ec7fe34cd4b50ad4dca51ce8e5',
    asm: {
      groupId: unsubscribeGroupId(group),
    },
  }).catch((e) => {
    throw Error(e.response.body.errors[0].message)
  })
}

export async function sendEmails(
  personalizations: {
    to: string,
    subject: string,
    text: string,
    url: string,
  }[],
  group: UNSUBSCRIBE_GROUP,
  action: string,
) {
  const apiKey = process.env.SENDGRID_API_KEY
  if (!apiKey) throw Error('SENDGRID_API_KEY must be set in order to email users')
  sgm.setApiKey(apiKey)
  return sgm.send({
    from: 'gm@drunkcircle.com',
    personalizations: personalizations.map((p) => ({
      to: p.to,
      dynamicTemplateData: {
        title: p.subject,
        body: p.text,
        action,
        url: p.url,
      },
    })),
    templateId: 'd-2c1452ec7fe34cd4b50ad4dca51ce8e5',
    asm: {
      groupId: unsubscribeGroupId(group),
    },
  }).catch((e) => {
    throw Error(e.response.body.errors[0].message)
  })
}
