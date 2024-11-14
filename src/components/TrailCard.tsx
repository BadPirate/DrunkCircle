/* eslint-disable camelcase */
import {
  Alert,
  Button, ButtonGroup, Card, Form, ListGroup,
} from 'react-bootstrap'
import dateFormat from 'dateformat'
import ReactMarkdown from 'react-markdown'
import Link from 'next/link'
import React, { useState } from 'react'
import { GMapify } from 'g-mapify'
import { useSession } from 'next-auth/react'
import ErrorBanner from './ErrorBanner'
import { BodyCard } from './PageCard'
import { DataRow, InfoTable } from './ListTable'
import 'react-datetime/css/react-datetime.css'
import { HasherPicker } from './HasherPicker'
import 'g-mapify/dist/index.css'
import AttendancePart from './AttendancePart'
import { InputDate } from './InputDate'
import { PublicFragmentTrailFragment } from '../graph/types'

type TrailCardProps = {
  trail: PublicFragmentTrailFragment,
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
      title: `Trail Number ${trail.calculated_number && !trail.number ? `: #${trail.calculated_number} (auto)` : ''}`,
      row: null,
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
            mapOptions={{
              zoomControl: true,
              mapTypeControl: true,
              mapTypeId: 'hybrid',
            }}
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
                  mapOptions={{
                    zoomControl: true,
                    mapTypeControl: true,
                    mapTypeId: 'hybrid',
                  }}
                  customMarkers={
                    [
                      [trail.latitude, trail.longitude, 'Start'],
                    ]
                  }
                />
                <ButtonGroup className="mt-3 mb-3">
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

  if (!editing && !trail.draft) {
    rows.push({
      title: "Who's coming?",
      row: <AttendancePart
        trailId={trail.id}
        kennelID={trail.kennelInfo.id}
        isHare={
          user ? trail.hares.find((h) => h.hasherInfo.id === parseInt(user.id, 10)) !== undefined
            : false
        }
      />,
    })
  }

  if (!editing && trail.drafts.length > 0) {
    rows.push(
      {
        title: 'Drafts',
        row: (
          <ListGroup>
            { trail.drafts.map((d) => (
              <ListGroup.Item action href={`/trail/${d.id}`} key={d.id}>
                {`Draft #${d.id}`}
              </ListGroup.Item>
            ))}
          </ListGroup>
        ),
      },
    )
  }
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
      title={editing ? `Editing ${trail.draft ? 'draft' : 'trail'} for ${trail.kennelInfo.short_name}...` : `${trail.calculated_number ? ` #${trail.calculated_number}` : ''} ${trail.name}`}
      editLink={editing || trail.draft ? undefined : `/trail/${trail.id}/edit`}
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
      { trail.draft && !editing ? (
        <Alert variant="info">
          <p>
            This trail is a DRAFT, and will only show this way to everyone once it has been
            accepted.
          </p>
          <ButtonGroup>
            <Button href={`/trail/${trail.draft}`}>See Original</Button>
            <Button variant="danger" href={`/api/trail/${trail.id}/delete`}>Delete</Button>
            <Button variant="success" href={`/api/trail/${trail.id}/accept_draft`}>Accept</Button>
            <Button href={`/trail/${trail.id}/edit`}>Edit</Button>
          </ButtonGroup>
        </Alert>
      )
        : null}
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
