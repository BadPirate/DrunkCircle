import { useRouter } from 'next/router'
import { Container } from 'react-bootstrap'
import { BodyError } from '../../../src/components/ErrorBanner'
import { BodySpinner } from '../../../src/components/BodySpinner'
import RootNav from '../../../src/components/RootNav'
import TrailCard from '../../../src/components/TrailCard'
import PublicClientHasura from '../../../src/graph/PublicClientHasura'
import { useGqlPageTrailIdQuery } from '../../../src/graph/types'
import { queryToInt } from '../../../src/func/queryParsing'

export default () => {
  const { trailId } = queryToInt(useRouter().query)
  const { loading, error, data } = useGqlPageTrailIdQuery({
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
