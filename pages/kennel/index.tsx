import { gql, useQuery } from '@apollo/client'
import { Container } from 'react-bootstrap'
import ErrorBanner from '../../src/components/ErrorBanner'
import ListTable from '../../src/components/ListTable'
import LoadSpinner from '../../src/components/LoadSpinner'
import RootNav from '../../src/components/RootNav'
import PublicClientHasura from '../../src/graph/PublicClientHasura'
import { GQLGetKennels } from '../../src/graph/types'

const KennelList = () => {
  const { data: kennels, loading: loadingKennels, error: errorKennels } = useQuery<GQLGetKennels>(gql`
    query GQLGetKennels {
  kennels(order_by: {id: asc}) {
    short_name
    name
    id
    description
  }
}`, { client: PublicClientHasura })
  const error = errorKennels
  return (
    <RootNav
      title="DrunkCircle Kennels"
      description={kennels ? kennels.kennels.map((k) => k.name).join(', ')
        : 'A list of all the Kennels that you can find trails for through DrunkCircle.'}
    >
      <Container>
        <h1>Kennels</h1>
        {error ? <ErrorBanner error={error} /> : null }
        <ListTable
          columns={['Short', 'Name', 'Description']}
          rows={
            kennels ? kennels.kennels.map((k) => {
              const link = `/kennel/${k.id}`
              return [
                { row: k.short_name, link },
                { row: k.name, link },
                { row: k.description, wrap: true, link },
              ]
            }) : []
          }
        />
        {loadingKennels ? <LoadSpinner /> : null }
      </Container>
    </RootNav>
  )
}

export default KennelList
