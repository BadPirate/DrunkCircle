import { useRouter } from 'next/router'
import { BodyError } from '../../../src/components/ErrorBanner'
import {
  queryToFloat, queryToInt, queryToStrings, requireAll,
} from '../../../src/func/queryParsing'
import { catchError } from '../../../src/func/catchError'
import ProgressComponent from '../../../src/components/ProgressComponent'

export default () => {
  const { query } = useRouter()
  const {
    phase,
  } = queryToStrings(query)
  const {
    completed,
    total,
    trailId,
  } = queryToFloat(query)
  const {
    kennelId,
  } = queryToInt(query)
  let error : Error | null = null
  try {
    requireAll({
      phase, completed, total, kennelId,
    })
  } catch (e) {
    error = catchError(e)
  }
  if (error) {
    return <BodyError error={catchError(error)} />
  }

  return (
    <ProgressComponent
      action={phase}
      api={`/api/kennel/${kennelId}/update_gcal`}
      complete={`/trail/${trailId}`}
    />
  )
}
