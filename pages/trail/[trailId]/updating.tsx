import { useRouter } from 'next/router'
import { BodyError } from '../../../src/components/ErrorBanner'
import { queryToFloat, queryToStrings, requireAll } from '../../../src/func/queryParsing'
import { catchError } from '../../../src/func/catchError'
import PageCard from '../../../src/components/PageCard'
import ProgressComponent from '../../../src/components/ProgressComponent'
import { encodeQueryString } from '../../../src/func/encodeQueryString'

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
  let error : Error | null = null
  try {
    requireAll({ phase, completed, total })
  } catch (e) {
    error = catchError(e)
  }
  if (error) {
    return <BodyError error={catchError(error)} />
  }

  return (
    <PageCard title="Updating trail">
      <ProgressComponent
        action={phase}
        api={`/api/trail/${trailId}?${encodeQueryString({
          ...query,
          ajax: '1',
        })}`}
        complete={`/trail/${trailId}`}
      />
    </PageCard>
  )
}
