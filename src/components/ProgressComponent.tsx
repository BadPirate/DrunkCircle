import { useEffect, useState } from 'react'
import { Button, ProgressBar } from 'react-bootstrap'
import { ProgressResult } from '../func/SharedTypes'
import ErrorBanner from './ErrorBanner'
import { LoadSpinner } from './LoadSpinner'
import { BodyCard } from './PageCard'

const ProgressComponent = ({
  action,
  api,
  complete,
  initialProgress,
} : {
    action: string,
    api: string,
    complete: string,
    initialProgress?: ProgressResult | null
}) => {
  const [progress, setProgress] = useState<ProgressResult>(initialProgress ?? {
    completed: 0,
    total: 0,
    phase: action,
  })
  const [error, setError] = useState<Error | undefined>(undefined)
  useEffect(() => {
    if (error) return
    fetch(`${api}${progress.context ? `&context=${progress.context}` : ''}`)
      .then((r) => {
        if (!r.headers.get('content-type')?.includes('application/json')) {
          throw Error(`Invalid content type. [${r.status}]`)
        }
        return r.json()
      })
      .then((j) => {
        if (j.total === 0) {
          window.location.href = complete
          return
        }
        const phaseChanged = j.phase !== progress.phase || j.total > progress.total
        if (j.total > progress.total || j.completed > 0 || phaseChanged) {
          const total = phaseChanged ? j.total : progress.total
          const completed = phaseChanged ? j.completed : progress.completed + j.completed
          const phase = phaseChanged ? j.phase : progress.phase
          setProgress({
            completed, total, phase, context: j.context,
          })
        }
      })
      .catch(setError)
  }, [progress, setProgress, api, error, complete])
  if (error) {
    return (
      <BodyCard title={`${progress.phase} Error`}>
        <ErrorBanner error={error} />
        <Button variant="info" href="#" />
      </BodyCard>
    )
  }
  return (
    <BodyCard title={action}>
      <p>
        {
          progress.total === 0 ? <LoadSpinner />
            : <ProgressBar animated now={(progress.completed / progress.total) * 100} />
        }
      </p>
      <p>{ `${progress.phase} - ${progress.completed} / ${progress.total}` }</p>
    </BodyCard>
  )
}

ProgressComponent.defaultProps = {
  initialProgress: null,
}

export default ProgressComponent
