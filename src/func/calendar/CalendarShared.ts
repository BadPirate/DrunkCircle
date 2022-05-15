import { gql } from '@apollo/client'
import { ServerClient } from '../../graph/hasura'
import { GQLVerifyCalendarAdmin } from '../../graph/types'
import { ilog } from '../Logging'

export async function apiBackOff<T>(label: string, request: Promise<T>, timeout = 100): Promise<T> {
  return new Promise((resolveRD, failRD) => {
    ilog(label, 'Initiating with timeout...', timeout)
    setTimeout(() => {
      ilog(label, 'Triggering...')
      request.catch((e) => {
        if (e.code === '403' || e.code === 403) {
          ilog(label, 'BACKOFF', e.code, timeout)
          if (timeout > 60000) {
            ilog(label, 'Fully timed out, skipping')
            return
          }
          ilog(label, 'RETRYING')
          return apiBackOff(label, request, timeout * 2)
        }
        ilog(label, 'Unhandled error code', e.code)
        throw e
      }).then((r) => {
        resolveRD(<T>r)
      }).catch((e) => {
        failRD(e)
      })
    }, timeout)
  })
}

export async function verifyCalendarAdmin(kennelId : string, email: string) : Promise<void> {
  return ServerClient().query<GQLVerifyCalendarAdmin>({
    query: gql`
query GQLVerifyCalendarAdmin($kennelId: Int, $email: String) {
  kennels(where: {id: {_eq: $kennelId}, gm_email: {_eq: $email}}, limit: 1) {
    id
  }
}
    `,
    variables: { kennelId, email },
  }).then((r) => {
    if (r.data.kennels.length < 1) {
      throw Error('Insufficient access')
    }
  })
}
