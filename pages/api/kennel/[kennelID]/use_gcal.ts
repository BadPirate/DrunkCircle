import type { NextApiRequest, NextApiResponse } from 'next'
import { verifyCalendarAdmin } from '../../../../src/func/calendar/CalendarShared'
import { createCalendarEntries } from '../../../../src/func/calendar/createCalendarEntries'
import { deleteAllCalendarEntries } from '../../../../src/func/calendar/deleteAllCalendarEntries'
import { GoogleLimit, requireUserEmail } from '../../../../src/func/ServerHelpers'
import { ServerClient } from '../../../../src/graph/hasura'
import { GqlSetCalendarIdDocument } from '../../../../src/graph/types'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const userEmail = await requireUserEmail(req, res)
  if (!userEmail) return
  const { kennelID, cal, context } = req.query
  if (typeof kennelID !== 'string') { throw Error('Kennel ID not set') }
  await verifyCalendarAdmin(kennelID, userEmail)

  if (!context) {
    // Remove old entries from any existing gcal
    const clearOld = await deleteAllCalendarEntries(kennelID, GoogleLimit)
    if (clearOld.completed > 0) {
      res.json(clearOld)
      return
    }

    // Clear graph
    await ServerClient().mutate(
      {
        mutation: GqlSetCalendarIdDocument,
        variables: {
          cal,
          kennelID,
          userEmail,
        },
      },
    )

    if (!cal) {
      res.json({
        completed: 0,
        total: 0,
        phase: 'No further entries configured',
      })
      return
    }
  }

  // Add new entries
  const result = await createCalendarEntries(kennelID, GoogleLimit)
  res.json({
    ...result,
    context: 'adding',
  })
}
