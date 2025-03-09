/* eslint-disable camelcase */
import { NextApiRequest, NextApiResponse } from 'next'
import moment from 'moment'
import { ServerClient } from '../../../src/graph/hasura'
import {
  InsertTrailsDocument, ScheduleTrailsDocument, ScheduleTrailsQuery,
  Trails_Insert_Input, UpdateKennelNextDocument,
} from '../../../src/graph/types'
import { updateGoogleCalendar } from '../../../src/func/calendar/updateGoogleCalendar'
import { fixCalculatedNumbers } from '../../../src/func/trail/fixCalculatedNumbers'
import { LabeledPromise } from '../../../src/func/calendar/CalendarShared'

const kScheduleAheadDays = 30 * 6
const kInactiveDays = 30 * 2
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const sc = ServerClient()
  const kennels = await sc.query<ScheduleTrailsQuery>({
    query: ScheduleTrailsDocument,
  }).then((r) => r.data.kennels)

  const toUpdate = kennels.map((kennel) => {
    const { frequency } = kennel
    if (!frequency || frequency <= 0) return null
    const now = moment()
    let lastDate = moment(kennel.next)
    const max = kennel.trails_aggregate.aggregate?.max?.start
    if (!max) return null
    const lastTrailDate = moment(max)
    if (now.diff(lastTrailDate, 'd') > kInactiveDays) return null
    const existing = kennel.trails ? kennel.trails.map((t) => moment(t.start)) : []
    const add: Date[] = []
    while (lastDate.diff(now, 'd') <= kScheduleAheadDays) {
      lastDate = lastDate.add(frequency, 'd')
      const ld = lastDate
      if (lastDate.diff(now, 'd') > 0 && !existing.some((e) => e.isSame(ld, 'd'))) {
        add.push(lastDate.toDate())
      } else {
        process.stdout.write('.')
      }
    }
    return {
      kennel,
      add,
      next: lastDate.toDate(),
    }
  }).squish()

  const toUpdateCalendar: number[] = []
  const toUpdateNext = toUpdate.filter((k) => !moment(k.next).isSame(moment(k.kennel.next), 'd'))
  const trails = toUpdate.map((u) => {
    if (!u || u.add.length === 0) return null
    toUpdateCalendar.push(u.kennel.id)
    return u.add.map((start) => <Trails_Insert_Input>{
      kennel: u.kennel.id,
      name: `${u.kennel.short_name}: Unclaimed Trail`,
      description: 'You could hare this trail!',
      start,
    })
  }).flat().squish()

  if (trails) {
    await sc.mutate({
      mutation: InsertTrailsDocument,
      variables: {
        trails,
      },
    })
  }

  const updateCalendarPromises: LabeledPromise<any>[] = []
  toUpdateCalendar.forEach((kennelId) => {
    updateCalendarPromises.push({
      label: `Update GC ${kennelId}`,
      promise: updateGoogleCalendar(sc, kennelId, 50),
    })
    updateCalendarPromises.push({
      label: `Update Calculated Numbers ${kennelId}`,
      promise: fixCalculatedNumbers(sc, kennelId),
    })
  })

  toUpdateNext.forEach((k) => {
    const { next, kennel: { id: kennelId } } = k
    updateCalendarPromises.push({
      label: `Update next for ${kennelId}`,
      promise: sc.mutate({
        mutation: UpdateKennelNextDocument,
        variables: {
          kennelId,
          next,
        },
      }),
    })
  })

  const result = await Promise.all(updateCalendarPromises)

  res.json(result)
}
