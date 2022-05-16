/* eslint-disable no-await-in-loop */
/* eslint-disable import/prefer-default-export */
import { gql } from '@apollo/client'
import { gcal } from '../../api/google'
import { ServerClient } from '../../graph/hasura'
import { GQLAddToCalendar, GQLRefreshKennelAddCount, GQLUpdateTrailGID } from '../../graph/types'
import { GoogleLimit } from '../ServerHelpers'
import { ProgressResult } from '../SharedTypes'
import { apiBackOff } from './CalendarShared'

export async function createCalendarEntries(
  kennelID: string,
  limit: number = GoogleLimit,
): Promise<ProgressResult> {
  const ac = ServerClient()
  const kennelInfo = await ac.query<GQLRefreshKennelAddCount>({
    query: gql`
query GQLRefreshKennelAddCount($kennelID: Int) {
  kennels(where: {id: {_eq: $kennelID}, google_refresh: {_is_null: false}, google_calendar: {_is_null: false}, google_token: {_is_null: false}}) {
    google_refresh
    google_token
    google_calendar
    id
    name
    short_name
    trails_aggregate(where: {google_calendar: {_is_null: true}, kennel: {_eq: $kennelID}, start: {_is_null: false}, _and: {hares: {hasher: {_is_null: false}}, _or: {start: {_gt: "now()"}}}}) {
      aggregate {
        count
      }
    }
  }}
        `,
    variables: { kennelID },
  })
    .then((r) => {
      if (r.data.kennels.length < 1) {
        throw Error(`Kennel not found - ${kennelID}`)
      }
      return r.data.kennels[0]
    })

  const total = kennelInfo.trails_aggregate.aggregate?.count
  if (!total || total < 1) {
    return {
      completed: 0,
      total: 0,
      phase: 'No trails to add to calendar',
    }
  }

  const trails = await ac.query<GQLAddToCalendar>({
    query: gql`
query GQLAddToCalendar($kennelID: Int, $limit: Int) {
  trails(where: {google_calendar: {_is_null: true}, kennel: {_eq: $kennelID}, start: {_is_null: false}, _and: {hares: {hasher: {_is_null: false}}, _or: {start: {_gt: "now()"}}}}, limit: $limit) {
    calculated_number
    id
    description
    directions
    hares {
      hasherInfo {
        name
      }
    }
    latitude
    longitude
    name
    start
  }
}
        `,
    variables: { kennelID, limit },
  }).then((r) => r.data.trails)

  const cal = gcal(kennelInfo.google_token!, kennelInfo.google_refresh!)
  for (let index = 0; index < trails.length; index += 1) {
    const trail = trails[index]
    const summary = `${kennelInfo.short_name}${trail.calculated_number ? ` #${trail.calculated_number}` : ''}: ${trail.name}`
    const start = trail.start!
    const end = new Date(start)
    const htmlLink = `${process.env.NEXT_PUBLIC_URL}/trail/${trail.id}`
    let description = ''
    if (trail.hares.length < 1) {
      description = `You could Hare this trail! <a href=${htmlLink}>Signup!</a>`
    } else {
      if (trail.description) {
        description += `<h3>Description</h3>
${trail.description}
`
      }
      if (trail.directions) {
        description += `<h3>Directions</h3>
${trail.directions}
`
      }
      description += `<h3>Hares</h3>
${trail.hares.map((hare) => hare.hasherInfo.name).join(', ')}`
    }
    const location = trail.latitude && trail.longitude ? `${trail.latitude}, ${trail.longitude}` : 'TBD'
    end.setHours(end.getHours() + 4)
    await apiBackOff(`${trail.id}`, cal.events.insert({
      calendarId: kennelInfo.google_calendar!,
      requestBody: {
        summary,
        start: {
          dateTime: start,
          timeZone: 'America/Los_Angeles',
        },
        end: {
          dateTime: end.toISOString(),
          timeZone: 'America/Los_Angeles',
        },
        description,
        location,
        htmlLink,
      },
    })).then((r) => {
      const { id } = r.data
      if (!id) { throw Error(`Unable to create ${trail.id}`) }
      return id
    }).then((gid) => ac.mutate<GQLUpdateTrailGID>({
      mutation: gql`
mutation GQLUpdateTrailGID($gid: String, $trailId: Int) {
  update_trails(where: {id: {_eq: $trailId}}, _set: {google_calendar: $gid}) {
    affected_rows
  }
}
                `,
      variables: { trailId: trail.id, gid },
    })).then((r) => {
      if (r.errors) { throw r.errors[0] }
      if (!r.data?.update_trails?.affected_rows || r.data.update_trails.affected_rows < 1) {
        throw Error(`Error updating trail info ${trail.id}`)
      }
    })
  }
  return {
    total,
    completed: total < limit ? total : limit,
    phase: 'Adding trails to calendar',
  }
}
