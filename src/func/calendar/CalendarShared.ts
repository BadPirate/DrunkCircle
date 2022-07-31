import { ServerClient } from '../../graph/hasura'
import { GqlVerifyCalendarAdminDocument, GqlVerifyCalendarAdminQuery } from '../../graph/types'
import { ilog, ilogError } from '../Logging'

export type LabeledPromise<T> = {
  label: string,
  promise: Promise<T>
}

export async function backoffAll<T>(promises: LabeledPromise<T>[], timeout = 1000): Promise<T[]> {
  const r : T[] = []
  for (let i = 0; i < promises.length; i += 1) {
    const p = promises[i]
    // eslint-disable-next-line no-await-in-loop
    const ir = await apiBackOff(p.label, p.promise, timeout)
    r.push(ir)
  }
  return r
}

export async function apiBackOff<T>(label: string, request: Promise<T>, timeout = 100): Promise<T> {
  return new Promise((resolveRD, failRD) => {
    setTimeout(() => {
      request.catch((e) => {
        if (e.code === '403' || e.code === 403) {
          ilog(label, 'API Backoff', e.code, timeout)
          if (timeout > 60000) {
            ilog(label, 'Fully timed out, skipping')
            return null
          }
          return apiBackOff(label, request, timeout * 2)
        }
        ilogError(label, 'Unhandled error code', e.code)
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
  return ServerClient().query<GqlVerifyCalendarAdminQuery>({
    query: GqlVerifyCalendarAdminDocument,
    variables: { kennelId, email },
  }).then((r) => {
    if (r.data.kennels.length < 1) {
      throw Error('Insufficient access')
    }
  })
}
