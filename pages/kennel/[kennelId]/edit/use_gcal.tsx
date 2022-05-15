import { useRouter } from 'next/router'
import { BodySpinner } from '../../../../src/components/LoadSpinner'
import ProgressComponent from '../../../../src/components/ProgressComponent'

export default () => {
  const { cal, kennelId } = useRouter().query
  if (!kennelId) return <BodySpinner />
  return (
    <ProgressComponent
      action="Updating Google Calendar"
      api={`/api/kennel/${kennelId}/use_gcal${cal ? `?cal=${cal}` : ''}`}
      complete={`/kennel/${kennelId}/edit`}
    />
  )
}
