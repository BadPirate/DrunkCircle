import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { ProgressBar } from 'react-bootstrap'
import { BodyError } from '../../../../src/components/ErrorBanner'
import { LoadSpinner } from '../../../../src/components/LoadSpinner'
import { BodyCard } from '../../../../src/components/PageCard'

export default () => {
  const { query: { kennelId } } = useRouter()
  const [progress, setProgress] = useState({
    completed: 0,
    total: 0,
  })
  const [error, setError] = useState<Error | undefined>(undefined)
  useEffect(() => {
    if (!kennelId) return
    fetch(`/api/kennel/${kennelId}/add_gcal`)
      .then((r) => {
        if (!r.headers.get('content-type')?.includes('application/json')) {
          throw Error(`Invalid content type. [${r.status}]`)
        }
        return r.json()
      })
      .then((j) => {
        if (j.total > progress.total || j.completed > 0) {
          setProgress({
            completed: progress.completed + j.completed,
            total: progress.total > j.total ? progress.total : j.total,
          })
        }
      })
      .catch(setError)
  }, [progress, setProgress, kennelId])
  if (error) {
    return <BodyError error={error} />
  }
  return (
    <BodyCard title="Adding trails to Google Calendar">
      {
        progress.total === 0 ? <LoadSpinner />
          : <ProgressBar animated now={progress.completed / progress.total} />
      }
    </BodyCard>
  )
}
