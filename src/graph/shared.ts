/* eslint-disable import/prefer-default-export */
import { gql } from '@apollo/client'

export const MutateGQLUpdateCalendarToken = gql`
mutation GQLUpdateCalendarToken($calendar: String = null, $refreshToken: String, $accessToken: String, $kennelID: Int, $userEmail: String) {
  update_kennels(where: {id: {_eq: $kennelID}, gm: {id: {}, email: {_eq: $userEmail}}}, _set: {google_calendar: $calendar, google_refresh: $refreshToken, google_token: $accessToken}) {
    returning {
      id
    }
  }
}
                  `
