import { Table } from 'react-bootstrap'
import PublicClientHasura from '../graph/PublicClientHasura'
import { useGqlPageHasherHaresQuery } from '../graph/types'
import ErrorBanner from './ErrorBanner'
import { LoadSpinner } from './LoadSpinner'

const HareCount = ({ hasherId } : {hasherId : number}) => {
  const { error, data, loading } = useGqlPageHasherHaresQuery(
    { variables: { hasherId }, client: PublicClientHasura },
  )
  if (error) return <ErrorBanner error={error} />
  if (loading || !data) return <LoadSpinner />
  const { kennels } = data
  return (
    <Table>
      <tbody>
        {
          kennels.filter((k) => (k.trails_aggregate.aggregate!.count > 0))
            .sort((a, b) => (
                b.trails_aggregate.aggregate!.count - a.trails_aggregate.aggregate!.count
            ))
            .map((kennel) => (
              <tr key={kennel.id} onClick={() => { window.location.href = `/kennel/${kennel.id}` }}>
                <th>{kennel.short_name}</th>
                <td>{kennel.trails_aggregate.aggregate?.count || 0}</td>
              </tr>
            ))
        }
      </tbody>
    </Table>
  )
}

export default HareCount
