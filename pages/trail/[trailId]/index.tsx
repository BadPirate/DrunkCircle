import {
  Button, Card, Container,
} from 'react-bootstrap'
import { gql } from '@apollo/client'
import dateFormat from 'dateformat'
import GoogleMapReact from 'google-map-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBeer } from '@fortawesome/free-solid-svg-icons'
import ReactMarkdown from 'react-markdown'
import Link from 'next/link'
import { GetServerSideProps } from 'next'
import RootNav from '../../../src/components/RootNav'
import PublicClientHasura from '../../../src/graph/PublicClientHasura'
import ErrorBanner, { BodyError } from '../../../src/components/ErrorBanner'
import { GQLPageTrailId, PublicFragmentTrail } from '../../../src/graph/types'
import { BodyCard } from '../../../src/components/PageCard'
import { DataRow, InfoTable } from '../../../src/components/ListTable'

const GQL_TRAIL_ID = gql`
fragment PublicFragmentTrail on trails {
  calculated_number
  description
  directions
  kennelInfo {
    name
    id
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

const CardRow = ({ title, children } : {
    title: string, children?: React.ReactNode | undefined
}) => (
  <span key={title}>
    <Card.Subtitle style={{ paddingTop: '1em' }} key="subtitle">{title}</Card.Subtitle>
    <Card.Text key="content">
      {children}
    </Card.Text>
  </span>
)

CardRow.defaultProps = { children: null }

// eslint-disable-next-line no-unused-vars
const TrailStart = ({ lat, lng } : { lat: number, lng: number}) => (
  <FontAwesomeIcon icon={faBeer} size="3x" />
)

const TrailCard = ({ trail } : { trail : PublicFragmentTrail }) => {
  const showMap = trail.latitude !== 0 || trail.longitude !== 0
  const mapKey = process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY
  if (!mapKey) {
    return <ErrorBanner error="NEXT_PUBLIC_GOOGLE_MAP_KEY not set" />
  }

  const start = {
    lat: trail.latitude,
    lng: trail.longitude,
  }

  const rows : Array<DataRow> = [
    {
      title: 'Start',
      row: dateFormat(trail.start, 'dddd, mmmm dS, yyyy, h:MM TT Z'),
    },
    {
      title: 'Hares',
      row: trail.hares.map((hare) => hare.hasherInfo.name).join(', '),
    },
    {
      title: 'Description',
      row: (
        <ReactMarkdown key="react-block">
          {trail.description || 'TBD'}
        </ReactMarkdown>
      ),
    },
    {
      title: 'Directions',
      row: (
        <div>
          <Card.Text key="directions">
            {trail.directions}
          </Card.Text>
          {
            showMap ? (
              <div style={{ height: '300px', width: '100%' }} key="map">
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
            ) : null
          }
          { showMap ? (
            <Button
              key="google"
              href={
                `https://www.google.com/maps/dir//${trail.latitude},${trail.longitude}/`
              }
              target="google"
            >
              Google Directions
            </Button>
          ) : null}
        </div>
      ),
    },
  ]

  return (
    <BodyCard
      title={`#${trail.calculated_number} ${trail.name}`}
      preamble={(
        <Card.Subtitle key="subtitle">
          <Link href={`/kennel/${trail.kennelInfo.id}`}>{trail.kennelInfo.name}</Link>
          {' '}
          presents...
        </Card.Subtitle>
      )}
    >
      <InfoTable rows={rows} />
    </BodyCard>
  )
}

interface ServerSideProps {
    error? : any | undefined,
    data? : GQLPageTrailId | undefined
}

const TrailId = ({ error, data } : ServerSideProps) => {
  if (error) {
    return <BodyError error={error} />
  }
  if (!data) {
    return <BodyError error="Unable to find trail" />
  }

  const trail = data.trails[0]
  const mapImage = trail.longitude === 0 && trail.latitude === 0
    ? undefined
    : `https://maps.googleapis.com/maps/api/staticmap?markers=${trail.latitude},${trail.longitude}&zoom=18&center=${trail.latitude},${trail.longitude}&size=600x315&key=${process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY}`
  return (
    <RootNav
      title={trail.name}
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
  await PublicClientHasura.query<GQLPageTrailId>({
    query: GQL_TRAIL_ID,
    variables: { trailId },
  })
    .catch((error) => { props = { error } })
    .then((r) => { props = { data: r ? r.data : undefined } })
  return { props }
}

export default TrailId
