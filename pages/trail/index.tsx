import {
  Button, Container,
} from 'react-bootstrap'
import { gql, useQuery } from '@apollo/client'
import { useState } from 'react'
import RootNav from '../../src/components/RootNav'
import ErrorBanner from '../../src/components/ErrorBanner'
import { GQLPageTrails } from '../../src/graph/types'
import PublicClientHasura from '../../src/graph/PublicClientHasura'
import ListTable from '../../src/components/ListTable'
import LoadSpinner from '../../src/components/LoadSpinner'
import { trailDateFormat } from '../../src/func/dateFormats'

const Trail = () => {
  const [limit, setLimit] = useState(10)
  const [after] = useState(() => {
    const date = new Date()
    date.setHours(date.getHours() - 8)
    return date
  })
  const { loading, error, data } = useQuery<GQLPageTrails>(gql`
query GQLPageTrails($after: timestamptz, $limit: Int) {
  trails(limit: $limit, order_by: {start: asc}, where: {start: {_gt: $after}, draft: {_is_null: true}}) {
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
    <RootNav
      title="DrunkCircle Upcoming Trails"
      description="List of all the up and coming trails hashable through DrunkCircle"
    >
      <Container>
        <h1>Upcoming Trails</h1>
        <ListTable
          columns={['Date', 'Kennel', 'Name']}
          rows={
            data ? data.trails.map((t) => [
              { row: trailDateFormat(t.start), link: `/trail/${t.id}` },
              { row: t.kennelInfo.short_name, link: `/kennel/${t.kennelInfo.id}` },
              { row: t.name, wrap: true, link: `/trail/${t.id}` },
            ]) : []
          }
        />
        { limit === 10 ? <Button onClick={() => { setLimit(50) }}>More</Button> : null }
        { error ? <ErrorBanner error={error} /> : null }
        { loading ? <LoadSpinner /> : null }
      </Container>
    </RootNav>
  )
}
export default Trail
