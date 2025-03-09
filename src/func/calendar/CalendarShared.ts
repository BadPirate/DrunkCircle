import { ServerClient } from '../../graph/hasura'
import { GqlVerifyCalendarAdminDocument, GqlVerifyCalendarAdminQuery } from '../../graph/types'
import { ilog, ilogError } from '../Logging'

export type LabeledPromise<T> = {
  label: string,
  promise: Promise<T>
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
