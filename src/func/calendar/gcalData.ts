import { gql } from '@apollo/client'
import { GQLInsertFragment, GQLKennelInfoFragment } from '../../graph/types'

export const GQL_INSERT_FRAGMENT = gql`
fragment GQLInsertFragment on trails {
  calculated_number
  id
  name
  start
  latitude
  longitude
  directions
  google_calendar
  description
  hares {
     hasherInfo {
       name
     }
  }
}
`

export const GQL_KENNEL_INFO_FRAGMENT = gql`
fragment GQLKennelInfoFragment on kennels {
  google_calendar
  short_name

  google_refresh
  google_token
  id
  name
}
`
export function gcalData(kennel: GQLKennelInfoFragment, trail: GQLInsertFragment) {
  const summary = `${kennel.short_name}${trail.calculated_number ? ` #${trail.calculated_number}` : ''}: ${trail.name}`
  const end = new Date(trail.start)
  const location = trail.latitude && trail.longitude ? `${trail.latitude}, ${trail.longitude}` : 'TBD'
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
  end.setHours(end.getHours() + 4)
  return {
    calendarId: kennel.google_calendar!,
    requestBody: {
      summary,
      start: {
        dateTime: trail.start,
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
  }
}
