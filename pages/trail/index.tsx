import {
  Button, Container, Spinner, Table,
} from 'react-bootstrap'
import { gql, useQuery } from '@apollo/client'
import dateFormat from 'dateformat'
import { useState } from 'react'
import RootNav from '../../src/components/RootNav'
import ErrorBanner from '../../src/components/ErrorBanner'
import { GQLPageTrails } from '../../src/graph/types'
import PublicClientHasura from '../../src/graph/PublicClientHasura'

const Trail = () => {
  const [limit, setLimit] = useState(10)
  const [after] = useState(() => {
    const date = new Date()
    date.setHours(date.getHours() - 8)
    return date
  })
  const { loading, error, data } = useQuery<GQLPageTrails>(gql`
query GQLPageTrails($after: timestamptz, $limit: Int = 10) {
  trails(limit: $limit, order_by: {start: asc}, where: {start: {_gt: $after}}) {
    calculated_number
    name
    start
    kennelInfo {
      short_name
      id
    }
    id
  }
}`, { client: PublicClientHasura, variables: { limit, after } })
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
                    <td style={{ whiteSpace: 'nowrap' }}>{dateFormat(trail.start, 'dddd, mmmm dS')}</td>
                    <td style={{ whiteSpace: 'nowrap' }}>{trail.kennelInfo.short_name}</td>
                    <td>{trail.name}</td>
                  </tr>
                ))}
              </tbody>
            ) : null
          }
        </Table>
        { limit === 10 ? <Button onClick={() => { setLimit(50) }}>More</Button> : null }
        { error ? <ErrorBanner error={error} /> : null }
        { loading ? <Spinner animation="grow" /> : null }
      </Container>
    </RootNav>
  )
}
export default Trail
