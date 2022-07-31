import {
  Card, Container,
} from 'react-bootstrap'
import dateFormat from 'dateformat'
import { GetServerSideProps } from 'next'
import RootNav from '../../../src/components/RootNav'
import PublicClientHasura from '../../../src/graph/PublicClientHasura'
import { BodyError } from '../../../src/components/ErrorBanner'
import TrailCard from '../../../src/components/TrailCard'
import { GqlPageTrailIdDocument, GqlPageTrailIdQuery } from '../../../src/graph/types'

type CardRowProperties = { title: string, children?: React.ReactNode | undefined }

const CardRow = ({ title, children } : CardRowProperties) => (
  <span key={title}>
    <Card.Subtitle style={{ paddingTop: '1em' }} key="subtitle">{title}</Card.Subtitle>
    <Card.Text key="content">
      {children}
    </Card.Text>
  </span>
)

CardRow.defaultProps = { children: null }

interface ServerSideProps {
    error? : any | undefined,
    data? : GqlPageTrailIdQuery | undefined
}

const TrailId = ({ error, data } : ServerSideProps) => {
  if (error) {
    return <BodyError error={error} />
  }
  if (!data?.trails || data.trails.length < 1) {
    return <BodyError error="Unable to find trail" />
  }

  const trail = data.trails[0]
  const mapImage = !trail.longitude || !trail.latitude
  || (trail.longitude === 0 && trail.latitude === 0)
    ? undefined
    : `https://maps.googleapis.com/maps/api/staticmap?markers=${trail.latitude},${trail.longitude}&zoom=18&center=${trail.latitude},${trail.longitude}&size=600x315&key=${process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY}`
  return (
    <RootNav
      title={`${trail.kennelInfo.short_name}: ${trail.name} - ${dateFormat(trail.start, 'DDDD m/d/yy')}`}
      description={trail.description || trail.name}
      image={mapImage}
      imageSize={{ width: 600, height: 315 }}
    >
      <Container>
        <TrailCard trail={trail} />
      </Container>
    </RootNav>
  )
}

TrailId.defaultProps = {
  error: undefined,
  data: undefined,
}

export const getServerSideProps: GetServerSideProps = async ({ query: { trailId } }) => {
  let props : ServerSideProps = {}
  await PublicClientHasura.query<GqlPageTrailIdQuery>({
    query: GqlPageTrailIdDocument,
    variables: { trailId },
  })
    .catch((error) => { props = { error } })
    .then((r) => { props = { data: r ? r.data : undefined } })
  return { props }
}

export default TrailId
