import {
  Button, Card, Container, Spinner,
} from 'react-bootstrap'
import { useRouter } from 'next/router'
import { gql, useQuery } from '@apollo/client'
import dateFormat from 'dateformat'
import GoogleMapReact from 'google-map-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBeer } from '@fortawesome/free-solid-svg-icons'
import ReactMarkdown from 'react-markdown'
import RootNav from '../../../src/components/RootNav'
import PublicClientHasura from '../../../src/graph/PublicClientHasura'
import ErrorBanner from '../../../src/components/ErrorBanner'
import { GQLPageTrailId, PublicFragmentTrail } from '../../../src/graph/types'

const GQL_TRAIL_ID = gql`
fragment PublicFragmentTrail on trails {
  calculated_number
  description
  directions
  kennelInfo {
    name
  }
  latitude
  longitude
  name
  start
  hares {
    hasherInfo {
      name
    }
  }
}

query GQLPageTrailId($trailId: Int) {
  trails(where: {id: {_eq: $trailId}}, limit: 1) {
    ...PublicFragmentTrail
  }
}
`

const Body = ({ children } : { children: React.ReactNode }) => (
  <RootNav>
    <Container key="container">{children}</Container>
  </RootNav>
)

// eslint-disable-next-line no-unused-vars
const TrailStart = ({ lat, lng } : { lat: number, lng: number}) => (
  <FontAwesomeIcon icon={faBeer} size="3x" />
)

const TrailCard = ({ trail } : { trail : PublicFragmentTrail }) => {
  const mapKey = process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY
  if (!mapKey) {
    return <ErrorBanner error="NEXT_PUBLIC_GOOGLE_MAP_KEY not set" />
  }
  const start = {
    lat: trail.latitude,
    lng: trail.longitude,
  }
  return (
    <Card>
      <Card.Body>
        <Card.Subtitle>{`${trail.kennelInfo.name} presents...`}</Card.Subtitle>
        <Card.Title>
          {`#${trail.calculated_number} ${trail.name}`}
        </Card.Title>
        <Card.Subtitle>Start</Card.Subtitle>
        <Card.Text>{dateFormat(trail.start, 'dddd, mmmm dS, yyyy, h:MM TT Z')}</Card.Text>
        <Card.Subtitle>{trail.hares.length === 1 ? 'Hare' : 'Hares'}</Card.Subtitle>
        <Card.Text>{trail.hares.map((hare) => hare.hasherInfo.name).join(', ')}</Card.Text>
        <Card.Subtitle>Description</Card.Subtitle>
        <Card.Text>
          <ReactMarkdown>
            {trail.description || 'TBD'}
          </ReactMarkdown>
        </Card.Text>
        <Card.Subtitle>Directions</Card.Subtitle>
        <Card.Text>
          {trail.directions}
        </Card.Text>
        { trail.latitude !== 0 || trail.longitude !== 0
          ? (
            <Card.Text>
              <div style={{ height: '300px', width: '100%' }}>
                <GoogleMapReact
                  bootstrapURLKeys={{ key: mapKey }}
                  defaultCenter={start}
                  defaultZoom={18}
                >
                  <TrailStart
                    lat={trail.latitude}
                    lng={trail.longitude}
                  />
                </GoogleMapReact>
              </div>
            </Card.Text>
          ) : null}
        <Card.Text>
          <Button
            href={`https://www.google.com/maps/dir//${trail.latitude},${trail.longitude}/`}
            target="google"
          >
            Google Directions
          </Button>
        </Card.Text>
      </Card.Body>
    </Card>
  )
}

const TrailId = () => {
  const router = useRouter()
  const { trailId } = router.query
  const { loading, error, data } = useQuery<GQLPageTrailId>(GQL_TRAIL_ID, {
    variables: { trailId },
    client: PublicClientHasura,
  })

  if (error) {
    return <Body><ErrorBanner error={error} /></Body>
  }

  if (loading || !data?.trails) {
    return <Body><Spinner animation="grow" /></Body>
  }

  return (
    <Body>
      <TrailCard trail={data.trails[0]} />
    </Body>
  )
}

export default TrailId
