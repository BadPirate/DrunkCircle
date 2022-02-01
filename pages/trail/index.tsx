import { Container, Spinner, Table } from 'react-bootstrap'
import { gql, useQuery } from '@apollo/client'
import dateFormat from 'dateformat'
import RootNav from '../../src/components/RootNav'
import ErrorBanner from '../../src/components/ErrorBanner'
import { GQLPageTrails } from '../../src/graph/types'
import PublicClientHasura from '../../src/graph/PublicClientHasura'

const Trail = () => {
  const { loading, error, data } = useQuery<GQLPageTrails>(gql`
    query GQLPageTrails($after: timestamptz = "NOW()") {
  trails(limit: 10, order_by: {start: asc}, where: {start: {_gt: $after}}) {
    calculated_number
    name
    start
    kennelInfo {
      short_name
      id
    }
    id
  }
}`, { client: PublicClientHasura })
  return (
    <RootNav>
      <Container>
        <h1>Upcumming Trails</h1>
        <Table responsive striped bordered hover>
          <thead>
            <tr>
              <th>Date</th>
              <th>Kennel</th>
              <th>Name</th>
            </tr>
          </thead>
          {
            data ? (
              <tbody>
                {data.trails.map((trail) => (
                  <tr
                    key={trail.id}
                    onClick={() => {
                      window.location.href = `/trail/${trail.id}`
                    }}
                  >
                    <td>{dateFormat(trail.start, 'dddd, mmmm dS')}</td>
                    <td>{trail.kennelInfo.short_name}</td>
                    <td>{trail.name}</td>
                  </tr>
                ))}
              </tbody>
            ) : null
          }
        </Table>
        { error ? <ErrorBanner error={error} /> : null }
        { loading ? <Spinner animation="grow" /> : null }
      </Container>
    </RootNav>
  )
}
export default Trail
