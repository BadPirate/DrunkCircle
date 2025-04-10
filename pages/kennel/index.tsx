/* eslint-disable camelcase */
import { GetServerSideProps } from 'next/types'
import { useState } from 'react'
import { Button, Container } from 'react-bootstrap'
import ErrorBanner, { BodyError } from '../../src/components/ErrorBanner'
import ListTable from '../../src/components/ListTable'
import { BodySpinner } from '../../src/components/BodySpinner'
import RootNav from '../../src/components/RootNav'
import { catchError } from '../../src/func/catchError'
import PublicClientHasura from '../../src/graph/PublicClientHasura'
import { GqlGetKennelsDocument, GqlGetKennelsKennelFragment, GqlGetKennelsQuery } from '../../src/graph/types'

type ServerSideProps = {
  kennels?: GqlGetKennelsKennelFragment[],
  error?: Error
}

const KennelList = ({ kennels: ks, error } : ServerSideProps) => {
  const [showInactive, setShowInactive] = useState(false)
  if (error) return <BodyError error={error} />
  if (!ks) return <BodySpinner />
  const kennels = showInactive ? ks : ks.filter((k) => k.trails_aggregate.aggregate
  && k.trails_aggregate.aggregate.count > 0)
  return (
    <RootNav
      title="DrunkCircle Kennels"
      description={`${kennels.map((k) => k.name).join(', ')}, and more!`}
    >
      <Container>
        <h1>Kennels</h1>
        {error ? <ErrorBanner error={error} /> : null }
        <ListTable
          columns={['Short', 'Name', 'Description']}
          rows={
            kennels.map((k) => {
              const link = `/kennel/${k.id}`
              return [
                { row: k.short_name, link },
                { row: k.name, link, wrap: true },
                { row: k.description, wrap: true, link },
              ]
            })
          }
        />
        <Button variant="info" onClick={() => setShowInactive(!showInactive)}>
          { showInactive ? 'Hide Inactive Kennels' : 'Show Inactive Kennels' }
        </Button>

      </Container>
    </RootNav>
  )
}

KennelList.defaultProps = {
  kennels: undefined,
  error: undefined,
}

export const getServerSideProps: GetServerSideProps = async () => {
  const info : ServerSideProps = await PublicClientHasura.query<GqlGetKennelsQuery>({
    query: GqlGetKennelsDocument,
  }).then((r) => ({
    kennels: r.data.kennels,
  })).catch((e) => ({
    error: catchError(e),
  }))
  return { props: info }
}

export default KennelList
