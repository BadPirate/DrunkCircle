/* eslint-disable camelcase */
import { NextApiRequest, NextApiResponse } from 'next'
import { ApolloClient, NormalizedCacheObject } from '@apollo/client'
import { calendar_v3 } from 'googleapis'
import {
  GqlInsertTrailFragment, KennelSyncInfoFragment, SyncDocument, SyncQuery,
} from '../../../src/graph/types'
import { ServerClient } from '../../../src/graph/hasura'
import { gcalData } from '../../../src/func/calendar/gcalData'
import { gcal } from '../../../src/api/google'
import { insertCalendar, updateCalendar } from '../../../src/func/calendar/updateGcal'
import { ilog } from '../../../src/func/Logging'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const sc = ServerClient()
  const result = await syncCalendars(sc)

  return res.status(200).json(result)
}

export async function syncCalendars(sc: ApolloClient<NormalizedCacheObject>) {
  const kennels = await sc.query<SyncQuery>({
    query: SyncDocument,
  }).then((r) => r.data.kennels.filter((k) => k.trails.length > 0))

  const results = await Promise.all(
    kennels.map(async (kennel) => {
      const { result } = await syncCalendar(kennel, sc)
      return result
    }),
  )

  return results
}

async function syncCalendar(
  kennel: KennelSyncInfoFragment,
  sc: ApolloClient<NormalizedCacheObject>,
) {
  let inserted = 0
  let updated = 0

  const cal = gcal(kennel.google_token!, kennel.google_refresh!)
  await Promise.all(
    kennel.trails.map(async (trail) => {
      const { insert, update } = await updateTrailIfNeeded(trail, sc, cal, kennel)
      if (insert) {
        inserted += 1
      }
      if (update) {
        updated += 1
      }
      return { insert, update }
    }),
  )

  const result = {
    kennel: kennel.short_name,
    inserted,
    updated,
    trails: kennel.trails.length,
  }
  return { result, inserted, updated }
}

async function updateTrailIfNeeded(
  trail: GqlInsertTrailFragment,
  sc: ApolloClient<NormalizedCacheObject>,
  cal: calendar_v3.Calendar,
  kennel: { __typename?: 'kennels'; google_calendar?: string | null; short_name?: string | null; google_refresh?: string | null; google_token?: string | null; id: number; name?: string | null; trails: Array<{ __typename?: 'trails'; calculated_number?: number | null; id: number; name: string; start: any; latitude?: any | null; longitude?: any | null; directions?: string | null; google_calendar?: string | null; description?: string | null; hares: Array<{ __typename?: 'hares'; hasherInfo: { __typename?: 'hashers'; name?: string | null; }; }>; }>; },
) {
  ilog(`Checking ${trail.name}...`)

  if (!trail.google_calendar) {
    ilog(`Inserting ${trail.name}...`)
    insertCalendar(sc, cal, kennel, trail)
    return { insert: true }
  }

  // Validate what's there
  const expected = gcalData(kennel, trail)
  const current = await cal.events.get({
    calendarId: kennel.google_calendar!,
    eventId: trail.google_calendar,
  }).then((r) => r.data)
  let update = false
  if (expected.requestBody.summary !== current.summary) {
    ilog(`Summary: ${current.summary} -> ${expected.requestBody.summary}`)
    update = true
  }
  const expectedStart = new Date(expected.requestBody.start.dateTime).getTime() / 1000
  const currentStart = new Date(current.start!.dateTime!).getTime() / 1000
  if (expectedStart !== currentStart) {
    ilog(`Start: ${expectedStart} -> ${currentStart}`, current)
    update = true
  }
  if (expected.requestBody.description !== current.description) {
    ilog(`Description: ${current.description} -> ${expected.requestBody.description}`)
    update = true
  }
  if (update) {
    ilog(`Updating ${trail.name}...`)
    updateCalendar(sc, cal, kennel, trail)
  }

  return { update }
}
