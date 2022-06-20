import { gql } from '@apollo/client'
import { DCKnownUser } from '../ServerHelpers'
import { GQLHareCheckFragment } from '../../graph/types'

export const GQL_HARE_CHECK_FRAGMENT = gql`
fragment GQLHareCheckFragment on trails {
  hares {
    hasher
    hasherInfo {
      email
    }
  }
}
`

export function hareAuthorized(hareCheck: GQLHareCheckFragment, user: DCKnownUser) {
  return !hareCheck.hares || hareCheck.hares.length === 0
    || hareCheck.hares.map((h) => h.hasher).includes(user.id)
}
