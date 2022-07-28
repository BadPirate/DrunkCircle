import { useQuery } from '@apollo/client'
import { useRouter } from 'next/router'
import { Container } from 'react-bootstrap'
import { BodyError } from '../../../src/components/ErrorBanner'
import { BodySpinner } from '../../../src/components/BodySpinner'
import RootNav from '../../../src/components/RootNav'
import TrailCard, { GQL_TRAIL_ID } from '../../../src/components/TrailCard'
import PublicClientHasura from '../../../src/graph/PublicClientHasura'
import { GQLPageTrailId } from '../../../src/graph/types'

export default () => {
  const { trailId } = useRouter().query
  const { loading, error, data } = useQuery<GQLPageTrailId>(GQL_TRAIL_ID, {
    variables: { trailId },
    client: PublicClientHasura,
  })
  if (loading) {
    return <BodySpinner />
  }
  if (error) {
    return <BodyError error={error} />
  }
  if (!data || data.trails.length < 1) {
    return <BodyError error="Trail not found" />
  }
  return (
    <RootNav title="Editing Trail">
      <Container>
        <TrailCard trail={data.trails[0]} editing />
      </Container>
    </RootNav>
  )
}
