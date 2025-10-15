import type { NextApiRequest, NextApiResponse } from 'next'
import { gql } from '@apollo/client'
import { createEvents, type EventAttributes } from 'ics'
import { ServerClient } from '../../../src/graph/hasura'
import { ilog, ilogError } from '../../../src/func/Logging'
import { GqlTrailsForIcalQuery, GqlTrailsForIcalQueryVariables } from '../../../src/graph/types'

const TrailsForIcalDocument = gql`
  query GQLTrailsForIcal($where: trails_bool_exp!) {
    trails(order_by: { start: asc }, where: $where) {
      id
      name
      start
      description
      directions
      latitude
      longitude
      kennelInfo {
        short_name
      }
    }
  }
`

const parseKennelFilter = (value?: string | string[]): string[] => {
  if (!value) return []
  const raw = Array.isArray(value) ? value.join(',') : value
  return raw
    .split(/[\s,]+/)
    .map((token) => token.trim())
    .filter((token) => token.length > 0)
}

const toUtcStartArray = (date: Date): [number, number, number, number, number] => [
  date.getUTCFullYear(),
  date.getUTCMonth() + 1,
  date.getUTCDate(),
  date.getUTCHours(),
  date.getUTCMinutes(),
]

const DEFAULT_DURATION_HOURS = 3
const CAL_PRODUCT_ID = 'DrunkCircle iCal Feed'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    ilog('Trail iCal API called', { query: req.query, url: req.url })

    const kennelShortNames = parseKennelFilter(req.query.k)
    const where: Record<string, unknown> = {
      draft: { _is_null: true },
      start: { _is_null: false },
    }
    if (kennelShortNames.length > 0) {
      where.kennelInfo = { short_name: { _in: kennelShortNames } }
    }

    const client = ServerClient()
    const { data } = await client.query<GqlTrailsForIcalQuery, GqlTrailsForIcalQueryVariables>({
      query: TrailsForIcalDocument,
      variables: { where },
      fetchPolicy: 'no-cache',
    })

    const trails = data.trails.filter((trail) => Number.isInteger(trail.id))
    if (trails.length === 0) {
      res.status(404).json({ error: 'No trails found for iCal feed.' })
      return
    }

    const baseUrl = process.env.NEXT_PUBLIC_URL ?? 'https://drunkcircle.com'
    const events = trails.reduce<EventAttributes[]>((accumulator, trail) => {
      const startDate = new Date(trail.start)
      if (Number.isNaN(startDate.getTime())) {
        return accumulator
      }

      const summary = `${trail.kennelInfo?.short_name ?? 'Trail'}: ${trail.name}`
      const descriptionParts = [
        trail.description,
        trail.directions,
      ].filter((part) => part && part.trim().length > 0)
      const description = descriptionParts.join('\n\n') || undefined

      const event: EventAttributes = {
        productId: CAL_PRODUCT_ID,
        start: toUtcStartArray(startDate),
        startInputType: 'utc',
        duration: { hours: DEFAULT_DURATION_HOURS },
        title: summary,
        description,
        location: trail.directions ?? undefined,
        url: `${baseUrl}/trail/${trail.id}`,
        uid: `trail-${trail.id}@drunkcircle`,
        status: 'CONFIRMED',
        calName: 'DrunkCircle Trails',
      }

      if (typeof trail.latitude === 'number' && typeof trail.longitude === 'number') {
        event.geo = { lat: trail.latitude, lon: trail.longitude }
      }

      accumulator.push(event)
      return accumulator
    }, [])

    if (events.length === 0) {
      res.status(404).json({ error: 'No valid trails with start times available.' })
      return
    }

    const { error, value } = createEvents(events)
    if (error || !value) {
      ilogError('Failed to generate ICS feed', { error })
      res.status(500).json({ error: 'Unable to generate iCal feed.' })
      return
    }

    res.setHeader('Content-Type', 'text/calendar; charset=utf-8')
    res.setHeader('Cache-Control', 'public, max-age=300')
    res.setHeader('Content-Disposition', 'inline; filename="drunkcircle-trails.ics"')
    res.status(200).send(value)
  } catch (error) {
    ilogError('Trail iCal API unhandled error', error)
    res.status(500).json({ error: 'Unexpected error generating iCal feed.' })
  }
}
