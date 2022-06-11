import {
  Button, ButtonGroup, Card, Form,
} from 'react-bootstrap'
import dateFormat from 'dateformat'
import ReactMarkdown from 'react-markdown'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBeer } from '@fortawesome/free-solid-svg-icons'
import { gql } from '@apollo/client'
import DateTimeField from 'react-datetime'
import React, { useState } from 'react'
import { GMapify } from 'g-mapify'
import { useSession } from 'next-auth/react'
import ErrorBanner from './ErrorBanner'
import {
  PublicFragmentTrail,
} from '../graph/types'
import { BodyCard } from './PageCard'
import { DataRow, InfoTable } from './ListTable'
import 'react-datetime/css/react-datetime.css'
import { GQL_PUBLIC_HASHER_INFO, HasherPicker } from './HasherPicker'
import 'g-mapify/dist/index.css'

export const GQL_TRAIL_ID = gql`
${GQL_PUBLIC_HASHER_INFO}
fragment PublicFragmentTrail on trails {
  calculated_number
  description
  directions
  kennelInfo {
    name
    short_name
    id
  }
  id
  latitude
  longitude
  name
  start
  hares {
    hasherInfo {
      ...PublicHasherInfo
    }
  }
}

query GQLPageTrailId($trailId: Int) {
  trails(where: {id: {_eq: $trailId}}, limit: 1) {
    ...PublicFragmentTrail
  }
}
`

// eslint-disable-next-line no-unused-vars
const TrailStart = ({ lat, lng } : { lat: number, lng: number}) => (
  <FontAwesomeIcon icon={faBeer} size="3x" />
)

type TrailCardProps = {
  trail: PublicFragmentTrail,
  editing?: Boolean,
}

const InputText = ({
  label, name, initialValue, required,
} : {
  label: string,
  name: string,
  required?: boolean,
  initialValue?: string | number | undefined | null,
}) => (
  <Form.Group>
    <Form.Control
      placeholder={label}
      required={required}
      defaultValue={initialValue ?? undefined}
      name={name}
    />
  </Form.Group>
)

InputText.defaultProps = {
  initialValue: undefined,
  required: true,
}

const InputDate = ({ name, initialValue } : {
  name: string,
  initialValue: Date
}) => {
  const [value, setValue] = useState(initialValue)
  return (
    <>
      <Form.Control type="hidden" name={name} defaultValue={value.toISOString()} />
      <DateTimeField initialValue={initialValue} onChange={(m) => setValue(typeof m === 'string' ? new Date(m) : m.toDate())} />
    </>
  )
}

const InputArea = ({ name, initialValue, rows } : {
  name: string,
  initialValue?: string | undefined,
  rows?: number,
}) => (
  <Form.Control
    as="textarea"
    name={name}
    defaultValue={initialValue}
    required
    rows={rows}
  />
)

InputArea.defaultProps = {
  initialValue: undefined,
  rows: 10,
}

const TrailCard = ({ trail, editing }: TrailCardProps) => {
  const session = useSession()
  const user = session?.data ? session.data.user : null
  const showMap = trail.latitude && trail.longitude
  && (trail.latitude !== 0 && trail.longitude !== 0)
  const mapKey = process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY
  const [lat, setLat] = useState(trail.latitude ?? 37.3825627)
  const [lng, setLng] = useState(trail.longitude ?? -121.9953639)
  if (!mapKey) {
    return <ErrorBanner error="NEXT_PUBLIC_GOOGLE_MAP_KEY not set" />
  }

  const rows: Array<DataRow> = editing ? [
    {
      title: 'Trail Name',
      row: <InputText label="Trail Name" name="name" initialValue={trail.name !== 'Hare needed!' ? trail.name : undefined} />,
    },
    {
      title: 'Trail Number',
      row: (
        <>
          <InputText label="Trail Number" name="calculated_number" initialValue={trail.calculated_number} required={false} />
          <Form.Text className="text-muted">WARNING: Changing this value will effect the values of future trails as well</Form.Text>
        </>
      ),
    },
  ] : []

  rows.push(...[
    {
      title: 'Start',
      row: editing ? <InputDate name="start" initialValue={new Date(trail.start)} />
        : dateFormat(trail.start, 'dddd, mmmm dS, yyyy, h:MM TT Z'),
    },
    {
      title: 'Hares',
      row: editing ? (
        <HasherPicker
          formName="hares"
          addName="Add Hare"
          initialValue={trail.hares.map((h) => h.hasherInfo)}
        />
      )
        : trail.hares.map((hare) => hare.hasherInfo.name).join(', '),
    },
    {
      title: 'Description',
      row: editing ? (
        <InputArea
          name="description"
          initialValue={trail.description ?? undefined}
          rows={10}
        />
      ) : (
        <ReactMarkdown key="react-block">
          {trail.description || 'TBD'}
        </ReactMarkdown>
      ),
    },
    {
      title: 'Directions',
      row: editing ? (
        <>
          <InputArea
            name="directions"
            initialValue={trail.directions ?? undefined}
            rows={5}
          />
          <p className="mb-4">Select Location:</p>
          <Form.Control type="hidden" name="latitude" value={lat} />
          <Form.Control type="hidden" name="longitude" value={lng} />
          <GMapify
            appKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY!}
            hasSearch
            lat={lat}
            lng={lng}
            onSelect={(_status: any, data : {
              geometry : {
                location : {
                  lat: number,
                  lng: number
                }
              }
            }) => {
              if (!data.geometry) return
              setLat(data.geometry.location.lat)
              setLng(data.geometry.location.lng)
            }}
          />
        </>
      )
        : (
          <div>
            <Card.Text key="directions">
              {trail.directions}
            </Card.Text>
            {showMap ? (
              <>
                <GMapify
                  appKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY!}
                  customMarkers={
                    [
                      [trail.latitude, trail.longitude, 'Start'],
                    ]
                  }
                />
                <ButtonGroup>
                  <Button
                    key="google"
                    href={`https://www.google.com/maps/dir//${trail.latitude},${trail.longitude}/`}
                    target="google"
                  >
                    Google Directions
                  </Button>
                  <Button
                    key="apple"
                    href={`http://maps.apple.com/?daddr=${trail.latitude},${trail.longitude}&dirflg=d`}
                    target="apple"
                  >
                    Apple Directions
                  </Button>
                </ButtonGroup>
              </>

            ) : null}
          </div>
        ),
    },
  ])

  let body = <InfoTable rows={rows} />
  if (editing) {
    body = (
      <Form
        method="GET"
        action={`/api/trail/${trail.id}/edit`}
      >
        {body}
        <div className="mt-3">
          {/* Disable implicit submission of form */}
          <Button
            type="submit"
            disabled
            style={{
              display: 'none',
            }}
            aria-hidden="true"
          />
          <Button type="submit" variant="success">Update</Button>
        </div>
      </Form>
    )
  }

  return (
    <BodyCard
      title={editing ? `Editing trail for ${trail.kennelInfo.short_name}...` : `#${trail.calculated_number} ${trail.name}`}
      editLink={editing ? undefined : `/trail/${trail.id}/edit`}
      preamble={(
        editing ? null
          : (
            <Card.Subtitle key="subtitle">
              <Link href={`/kennel/${trail.kennelInfo.id}`}>{trail.kennelInfo.name}</Link>
              {' '}
              presents...
            </Card.Subtitle>
          )
      )}
    >
      {body}
      {
        user?.id && trail.hares.map((h) => h.hasherInfo.id).includes(parseInt(user.id, 10))
          ? (
            <div className="mt-3">
              <ButtonGroup>
                <Button variant="danger" href={`/api/trail/${trail.id}/delete`}>Delete Trail</Button>
                {/* <Button variant="danger">Un-Claim Trail</Button> */}
              </ButtonGroup>
            </div>
          )
          : null
      }
    </BodyCard>
  )
}

TrailCard.defaultProps = {
  editing: false,
}

export default TrailCard
