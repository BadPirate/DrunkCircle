/* eslint-disable camelcase */
import {
  Button, ButtonGroup, Card, Form, Alert, ListGroup,
} from 'react-bootstrap'
import dateFormat from 'dateformat'
import ReactMarkdown from 'react-markdown'
import Link from 'next/link'
import React, { useState } from 'react'
import { GMapify } from 'g-mapify'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import ErrorBanner from './ErrorBanner'
import { BodyCard } from './PageCard'
import { DataRow, InfoTable } from './ListTable'
import 'react-datetime/css/react-datetime.css'
import { HasherPicker } from './HasherPicker'
import 'g-mapify/dist/index.css'
import { InputDate } from './InputDate'
import { PublicFragmentTrailFragment } from '../graph/types'
import { ilog, ilogError } from '../func/Logging'
import AttendancePart from './AttendancePart'

type TrailCardProps = {
  trail: PublicFragmentTrailFragment,
  editing?: boolean, // Fixed type from `Boolean` to `boolean`
}

const InputText = ({
  label, name, initialValue, required, disabled,
} : {
  label: string,
  name: string,
  required?: boolean,
  initialValue?: string | number | undefined | null,
  disabled?: boolean,
}) => (
  <Form.Group>
    <Form.Control
      placeholder={label}
      required={required}
      defaultValue={initialValue ?? undefined}
      name={name}
      disabled={disabled}
    />
  </Form.Group>
)

InputText.defaultProps = {
  initialValue: undefined,
  required: true,
  disabled: false,
}

const InputArea = ({
  name,
  initialValue,
  rows,
  disabled,
}: {
  name: string
  initialValue?: string | undefined
  rows?: number
  disabled?: boolean
}) => (
  <Form.Control
    as="textarea"
    name={name}
    defaultValue={initialValue}
    required
    rows={rows}
    disabled={disabled}
  />
)

InputArea.defaultProps = {
  initialValue: undefined,
  rows: 10,
  disabled: false,
}

const TrailCard = ({ trail, editing }: TrailCardProps) => {
  const { data: session } = useSession() // Simplified session destructuring
  const user = session?.user || null
  const showMap = trail.latitude && trail.longitude
    && (trail.latitude !== 0 && trail.longitude !== 0)
  const mapKey = process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY
  const [lat, setLat] = useState(trail.latitude ?? 37.3825627)
  const [lng, setLng] = useState(trail.longitude ?? -121.9953639)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const router = useRouter()

  if (!mapKey) {
    return <ErrorBanner error="NEXT_PUBLIC_GOOGLE_MAP_KEY not set" />
  }

  const rows: Array<DataRow> = editing ? [
    {
      title: 'Trail Name',
      row: <InputText label="Trail Name" name="name" initialValue={trail.name !== 'Hare needed!' ? trail.name : undefined} disabled={isSubmitting} />,
    },
    {
      title: `Trail Number ${trail.calculated_number && !trail.number ? `: #${trail.calculated_number} (auto)` : ''}`,
      row: null,
    },
  ] : []

  rows.push(...[
    {
      title: 'Start',
      row: editing ? <InputDate name="start" initialValue={new Date(trail.start)} disabled={isSubmitting} />
        : dateFormat(trail.start, 'dddd, mmmm dS, yyyy, h:MM TT Z'),
    },
    {
      title: 'Hares',
      row: editing ? (
        <HasherPicker
          formName="hares"
          addName="Add Hare"
          initialValue={trail.hares.map((h) => h.hasherInfo)}
          disabled={isSubmitting}
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
          disabled={isSubmitting}
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
            disabled={isSubmitting}
          />
          <p className="mb-4">Select Location:</p>
          <Form.Control type="hidden" name="latitude" value={lat} />
          <Form.Control type="hidden" name="longitude" value={lng} />
          <GMapify
            appKey={mapKey}
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
      ) : (
        <div>
          <Card.Text key="directions">
            {trail.directions}
          </Card.Text>
          {showMap ? (
            <>
              <GMapify
                appKey={mapKey}
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
        onSubmit={async (e) => {
          e.preventDefault()
          setIsSubmitting(true)
          setErrorMessage(null)
          const formData = new FormData(e.currentTarget)
          const queryString = new URLSearchParams(formData as any).toString()
          try {
            const response = await fetch(`/api/trail/${trail.id}/edit?${queryString}`, {
              method: 'GET',
            })
            if (response.redirected) {
              router.push(response.url)
            } else {
              const errorText = await response.text()
              ilog('Failed to update trail:', errorText)
              throw new Error('Failed to update trail. Please try again.')
            }
          } catch (error: any) {
            ilogError('Error during trail update:', error)
            setErrorMessage(error.message || 'An unexpected error occurred.')
          } finally {
            setIsSubmitting(false)
          }
        }}
      >
        {body}
        <div className="mt-3">
          {errorMessage && (
            <Alert variant="danger" className="mt-3">
              {errorMessage}
            </Alert>
          )}
          <Button
            type="submit"
            variant="success"
            disabled={isSubmitting}
          >
            Update
          </Button>
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
      { trail.draft && !editing && (
        user?.id && trail.hares.some((h) => h.hasherInfo.id === parseInt(user.id, 10)) ? (
          <ButtonGroup>
            <Button href={`/trail/${trail.draft}`}>See Original</Button>
            <Button variant="danger" href={`/api/trail/${trail.id}/delete`}>Delete</Button>
            <Button variant="success" href={`/api/trail/${trail.id}/accept_draft`}>Accept</Button>
            <Button href={`/trail/${trail.id}/edit`}>Edit</Button>
          </ButtonGroup>
        ) : (
          <ButtonGroup>
            <Button href={`/trail/${trail.draft}`}>See Original</Button>
            <Button href={`/trail/${trail.id}/edit`}>Edit</Button>
          </ButtonGroup>
        )
      )}
      { trail.draft && (
        <div className="alert alert-warning">
          {user?.id && trail.hares.some((h) => h.hasherInfo.id === parseInt(user.id, 10))
            ? 'You must accept changes for them to reflect on the calendar.'
            : 'This draft must be accepted by the hares before changes will reflect on the calendar.'}
        </div>
      )}
      {body}
      {
        user?.id && trail.hares.some((h) => h.hasherInfo.id === parseInt(user.id, 10))
          ? (
            <div className="mt-3">
              <ButtonGroup>
                <Button variant="danger" href={`/api/trail/${trail.id}/delete`}>Delete Trail</Button>
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
