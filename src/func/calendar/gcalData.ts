/* eslint-disable import/prefer-default-export */

import { GqlInsertTrailFragment, GqlKennelAddInfoFragment } from '../../graph/types'

export function gcalData(kennel: GqlKennelAddInfoFragment, trail: GqlInsertTrailFragment) {
  const summary = `${kennel.short_name}${trail.calculated_number ? ` #${trail.calculated_number}` : ''}: ${trail.name}`
  const end = new Date(trail.start)
  const location = trail.latitude && trail.longitude ? `${trail.latitude}, ${trail.longitude}` : 'TBD'
  const htmlLink = `${process.env.NEXT_PUBLIC_CALENDAR_URL ?? process.env.NEXT_PUBLIC_URL}/trail/${trail.id}`
  let description = ''
  if (trail.hares.length < 1) {
    description = `You could Hare this trail! <a href=${htmlLink}>Signup!</a>`
  } else {
    description = `${htmlLink}
`
    if (trail.description) {
      description += `
--- Description ---

${trail.description}
`
    }
    if (trail.directions) {
      description += `
--- Directions ---

${trail.directions}
`
    }
    description += `
--- Hares ---

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
