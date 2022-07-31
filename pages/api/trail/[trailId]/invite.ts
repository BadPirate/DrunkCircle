import { NextApiRequest, NextApiResponse } from 'next'
import { catchError } from '../../../../src/func/catchError'
import { trailDateFormat } from '../../../../src/func/dateFormats'
import { loginRedirectLink, loginVerificationToken, sendEmail } from '../../../../src/func/email'
import { queryToInt, requireAll } from '../../../../src/func/queryParsing'
import { requireKnownUser } from '../../../../src/func/ServerHelpers'
import { updateAttendance } from '../../../../src/graph/update_attendance'
import { ServerClient } from '../../../../src/graph/hasura'
import {
  GqlHasherEmailDocument, GqlHasherEmailQuery, GqlInviteTrailInfoDocument,
  GqlInviteTrailInfoQuery,
} from '../../../../src/graph/types'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { hasher, trailId } = queryToInt(req.query)
    requireAll({ hasher, trailId })
    const user = await requireKnownUser(req, res)
    if (!user) return
    const sc = ServerClient()
    const to = await sc.query<GqlHasherEmailQuery>({
      query: GqlHasherEmailDocument,
      variables: { hasher },
    }).then((r) => {
      if (!r.data.hashers ?? r.data.hashers.length < 1) {
        throw Error('Unable to find hasher')
      }
      if (!r.data.hashers[0].email) {
        throw Error('Hasher has no email set')
      }
      return r.data.hashers[0].email
    })
    const trailInfo = await sc.query<GqlInviteTrailInfoQuery>({
      query: GqlInviteTrailInfoDocument,
      variables: { trailId },
    }).then((r) => {
      if (!r.data.trails || r.data.trails.length < 1) {
        throw Error('Unable to retrieve trail info')
      }
      return r.data.trails[0]
    })
    const {
      kennelInfo: { name: kennelName }, hares, name: trailName, start,
    } = trailInfo
    const subject = `${user.name} is wondering if you will be at ${trailName}?`
    const token = await loginVerificationToken(to)
    await updateAttendance(sc, { attended: null, hasher, trail: trailId })
    const dynamicTemplateData = {
      title: subject,
      subject,
      body: `${hares.length > 0
        ? `${hares.map((h) => h.hasherInfo.name).join(', ')} ${hares.length === 1 ? 'is' : 'are'} haring`
        : 'There is a trail'} "${trailName}" 
      for ${kennelName} on ${trailDateFormat(start)} and ${user.name} was wondering if you'll come?`,
      yes_title: 'See you there! (yes)',
      no_title: '<lame excuse> (no)',
      info_title: 'Trail Info',
      info_url: loginRedirectLink(`/trail/${trailId}`, to, token),
      yes_url: loginRedirectLink(`/api/trail/${trailId}/accept_invite`, to, token),
      no_url: loginRedirectLink(`/api/trail/${trailId}/decline_invite`, to, token),
    }
    await sendEmail({
      to,
      subject,
      dynamicTemplateData,
    }, 'invite', 'coming_invites')
    res.json({ success: true })
  } catch (e) {
    res.json({ error: catchError(e) })
  }
}
