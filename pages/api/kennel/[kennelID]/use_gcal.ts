import { gql } from '@apollo/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import { verifyCalendarAdmin } from '../../../../src/func/calendar/CalendarShared'
import { createCalendarEntries } from '../../../../src/func/calendar/createCalendarEntries'
import { deleteAllCalendarEntries } from '../../../../src/func/calendar/deleteAllCalendarEntries'
import { ilog } from '../../../../src/func/Logging'
import { GoogleLimit, requireUserEmail } from '../../../../src/func/ServerHelpers'
import { ServerClient } from '../../../../src/graph/hasura'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const userEmail = await requireUserEmail(req)
  const { kennelID, cal, context } = req.query
  if (typeof kennelID !== 'string') { throw Error('Kennel ID not set') }
  await verifyCalendarAdmin(kennelID, userEmail)

  ilog('USE', kennelID, cal, context)
  if (!context) {
    ilog('CLEARING')
    // Remove old entries from any existing gcal
    const clearOld = await deleteAllCalendarEntries(kennelID, GoogleLimit)
    if (clearOld.completed > 0) {
      res.json(clearOld)
      return
    }

    // Clear graph
    await ServerClient().mutate(
      {
        mutation: gql`
mutation GQLSetCalendarId($cal: String, $kennelID: Int, $userEmail: String) {
    update_kennels(where: {id: {_eq: $kennelID}, gm: {id: {}, email: {_eq: $userEmail}}}, _set: {google_calendar: $cal}) {
        returning {
            id
        }
    }
}
                `,
        variables: {
          cal,
          kennelID,
          userEmail,
        },
      },
    ).then((r) => {
      ilog('MUTATE', cal, r.data?.update_kennels?.returning)
    })

    if (!cal) {
      res.json({
        completed: 0,
        total: 0,
        phase: 'No further entries configured',
      })
      return
    }
  }

  ilog('ADDING')
  // Add new entries
  await createCalendarEntries(kennelID, GoogleLimit).then((r) => {
    res.json({
      ...r,
      context: 'adding',
    })
  })
}
