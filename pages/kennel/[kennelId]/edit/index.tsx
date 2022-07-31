/* eslint-disable camelcase */
/* eslint-disable react/jsx-props-no-spreading */
import { useSubscription } from '@apollo/client'
import {
  Accordion,
  Button, ButtonGroup, Card, Form, InputGroup, ListGroup, OverlayTrigger, Row, Tooltip,
} from 'react-bootstrap'
import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faRightLeft, faTrash } from '@fortawesome/free-solid-svg-icons'
import React, { useEffect, useState } from 'react'
import ErrorBanner, { BodyError } from '../../../../src/components/ErrorBanner'
import PageCard from '../../../../src/components/PageCard'
import { accessURL } from '../../../../src/func/calendar/CalendarAuthFlow'
import { ServerClient } from '../../../../src/graph/hasura'
import { gcal, getMe } from '../../../../src/api/google'
import PublicClientHasura from '../../../../src/graph/PublicClientHasura'
import { LoadSpinner } from '../../../../src/components/LoadSpinner'
import ListTable from '../../../../src/components/ListTable'
import { HasherPicker } from '../../../../src/components/HasherPicker'
import { liveMutate } from '../../../../src/func/liveMutate'
import {
  GqlKennelEditPageKennelFragment,
  GqlKennelEditPageSsrDocument,
  GqlKennelEditPageSsrQuery,
  GqlKennelRolesEditViewDocument,
  GqlKennelRolesEditViewSubscription,
  PublicHasherInfoFragment, useGqlKennelEditPartQuery, useGqlPermissionsEnumQuery,
} from '../../../../src/graph/types'
import { InputDate } from '../../../../src/components/InputDate'
import 'react-datetime/css/react-datetime.css'

type CalendarOption = {
  id : string,
  summary : string,
}

type EditKennelProps = {
  body? : {
    kennelId: string,
    accessTokenURL?: string,
    credentialUser?: string,
    calendarSummary?: string,
    shortName: string,
    calendarOptions?: CalendarOption[] | undefined
  } | undefined
  error?: string | undefined
}

const CalendarEditPart = ({
  kennelId,
  calendarSummary,
  credentialUser,
  accessTokenURL,
  calendarOptions,
} : {
  kennelId: string,
  calendarSummary?: string,
  credentialUser?: string,
  accessTokenURL?: string,
  calendarOptions?: CalendarOption[]
}) => {
  const body = (
    () => {
      if (calendarSummary) {
        return (
          <>
            <Button variant="warning" href={`/kennel/${kennelId}/edit/use_gcal`}>
              Change Calendar:
              {' '}
              {calendarSummary}
            </Button>
            <Button variant="success">
              Synchronize
            </Button>
          </>
        )
      }

      if (!credentialUser) {
        return (
          <>
            <Card.Body>
              Credential is invalid or not set.
              You&apos;ll need to authorize Drunk Circle to access your Google Calendar.
            </Card.Body>
            <Button href={accessTokenURL} variant="success">
              Authorize Drunk Circle
            </Button>
          </>
        )
      }

      if (!calendarOptions) return 'No calendar options available'

      return (
        <Card.Body>
          <Card.Title>Select Calendar</Card.Title>
          Select a calendar to export to:
          <ListGroup>
            {
              calendarOptions.map((i) => <ListGroup.Item key={i.id} action href={`/kennel/${kennelId}/edit/use_gcal?cal=${i.id}`}>{i.summary}</ListGroup.Item>)
            }
          </ListGroup>
        </Card.Body>
      )
    })()

  return (
    <div>
      <p>Automatically synchronize the r*n calendar with a google calendar.</p>
      {body}
      {
        credentialUser ? (
          <Button variant="danger" href={`/api/kennel/${kennelId}/cleargcal`}>
            Logout Calendar Account:
            {' '}
            {credentialUser}
          </Button>
        ) : null
      }
    </div>
  )
}

CalendarEditPart.defaultProps = {
  calendarSummary: undefined,
  credentialUser: undefined,
  accessTokenURL: undefined,
  calendarOptions: undefined,
}

const PermissionAddPart = ({
  roleId,
  kennelId,
  hide,
} : {
  roleId: number,
  kennelId: number,
  hide: string[]
}) => {
  const [selected, setSelected] = useState<string|null>(null)
  const { loading, error, data } = useGqlPermissionsEnumQuery({ client: PublicClientHasura })

  if (loading) return <LoadSpinner />
  if (error) return <ErrorBanner error={error} />
  if (!data?.permission_enum || data.permission_enum.length < 1) { return <ErrorBanner error="No permissions defined" /> }
  const show = data.permission_enum.filter((p) => !hide.includes(p.permission))
  if (show.length < 1) return null
  return (
    <InputGroup>
      <Form.Select onChange={
        (e : React.ChangeEvent<HTMLSelectElement>) => setSelected(e.target.value)
      }
      >
        {
          show.map((p) => (
            <option key={p.permission} value={p.permission}>{p.permission}</option>
          ))
        }
      </Form.Select>
      <OverlayTrigger overlay={<Tooltip>Add permission to role</Tooltip>}>
        {({ ref, ...triggerHandler }) => (
          <Button
            variant="success"
            ref={ref}
            {...triggerHandler}
            onClick={() => liveMutate(`/api/kennel/${kennelId}/add_role_permission?role=${roleId}&permission=${selected || show[0].permission}`)}
          >
            <FontAwesomeIcon icon={faPlus} />
          </Button>
        )}
      </OverlayTrigger>
    </InputGroup>
  )
}

const RoleAddPart = ({ kennelId } : {kennelId : number}) => {
  const [roleName, setRoleName] = useState('')
  const [hasher, setHasher] = useState<PublicHasherInfoFragment|null>(null)
  return (
    <InputGroup>
      <Form.Control placeholder="Role Name" onChange={(e : React.ChangeEvent<HTMLInputElement>) => setRoleName(e.target.value)} />
      {
        hasher ? (
          <>
            <InputGroup.Text>{hasher.name}</InputGroup.Text>
            <Button onClick={() => setHasher(null)}>
              <FontAwesomeIcon icon={faRightLeft} />
            </Button>
          </>
        )
          : <HasherPicker onSelect={setHasher} />
      }
      <Button
        variant="success"
        disabled={!hasher || !roleName}
        onClick={() => {
          liveMutate(`/api/kennel/${kennelId}/add_role?title=${roleName}&hasher=${hasher!.id}`)
          setHasher(null)
          setRoleName('')
        }}
      >
        Create Role
      </Button>
    </InputGroup>
  )
}

const EditRoleHasherPart = ({ name, kennelId, roleId }
   : { name: string, kennelId: number, roleId: number }) => {
  const [editing, setEditing] = useState(false)
  return editing ? (
    <HasherPicker onSelect={(h) => {
      setEditing(false)
      liveMutate(`/api/kennel/${kennelId}/change_role_hasher?role=${roleId}&hasher=${h.id}`)
    }}
    />
  )
    : (
      <>
        {name}
        <ButtonGroup className="float-end">
          <OverlayTrigger overlay={<Tooltip>Change Hasher</Tooltip>}>
            {({ ref, ...triggerHandler }) => (
              <Button ref={ref} {...triggerHandler} onClick={() => setEditing(true)}>
                <FontAwesomeIcon icon={faRightLeft} />
              </Button>
            )}
          </OverlayTrigger>
        </ButtonGroup>
      </>
    )
}

const RoleEditPart = ({
  kennelId,
} : {
  kennelId : number
}) => {
  const { loading, error, data } = useSubscription<GqlKennelRolesEditViewSubscription>(
    GqlKennelRolesEditViewDocument,
    {
      variables: { kennelId },
      client: PublicClientHasura,
    },
  )

  const body = (() => {
    if (loading) {
      return <LoadSpinner />
    }
    if (error) {
      return <ErrorBanner error={error} />
    }
    if (!data || data.kennels.length < 1) return <Card.Text>No data</Card.Text>
    return (
      <ListTable
        columns={[
          'Role',
          'Hasher',
          'Permissions',
        ]}
        rows={
          data.kennels[0].management.map((m) => (
            [
              {
                row: (
                  <>
                    { m.title }
                    <ButtonGroup className="float-end">
                      <OverlayTrigger overlay={<Tooltip>Delete this role</Tooltip>}>
                        {({ ref, ...triggerHandler }) => (
                          <Button variant="danger" ref={ref} {...triggerHandler}>
                            <FontAwesomeIcon
                              icon={faTrash}
                              onClick={() => liveMutate(`/api/kennel/${kennelId}/delete_role?role=${m.id}`)}
                            />
                          </Button>
                        )}
                      </OverlayTrigger>
                    </ButtonGroup>
                  </>
                ),
              },
              {
                row: <EditRoleHasherPart
                  name={m.hasherInfo.name!}
                  roleId={m.id}
                  kennelId={kennelId}
                />,
              },
              {
                row: (
                  <>
                    <ListGroup>
                      {
                        m.permissions.map((p) => (
                          <OverlayTrigger
                            key={p.permissionInfo.permission}
                            overlay={<Tooltip>{p.permissionInfo.description}</Tooltip>}
                          >
                            {({ ref, ...triggerHandler }) => (
                              <ListGroup.Item
                                ref={ref}
                                {...triggerHandler}
                              >
                                {p.permissionInfo.permission}
                                <Button className="float-end" variant="danger">
                                  <FontAwesomeIcon
                                    icon={faTrash}
                                    onClick={() => liveMutate(`/api/kennel/${kennelId}/remove_role_permission?role=${m.id}&permission=${p.permissionInfo.permission}`)}
                                  />
                                </Button>
                              </ListGroup.Item>
                            )}
                          </OverlayTrigger>
                        ))
                      }
                    </ListGroup>
                    <PermissionAddPart
                      roleId={m.id}
                      kennelId={kennelId}
                      hide={m.permissions.map((p) => p.permissionInfo.permission)}
                    />
                  </>
                ),
              },
            ]
          ))
        }
      />
    )
  })()

  return (
    <>
      { body }
      <RoleAddPart kennelId={kennelId} />
    </>
  )
}

const FormPart = ({
  name, label, children, help,
} : {
  name: string,
  label: string,
  children: React.ReactNode,
  help: string | undefined
}) => (
  <Form.Group controlId={name} className="mb-3">
    <Form.Label>{label}</Form.Label>
    {children}
    { help ? <Form.Text className="text-muted">{help}</Form.Text> : null }
  </Form.Group>
)

const FormControlPart = ({
  name, label, options,
} : {
  name: string,
  label: string,
  options: {[key: string] : any }
}) => (
  <Form.Control
    placeholder={label}
    name={name}
    {...options}
  />
)

const FormInputPart = ({
  name, label, value, help, options,
} : {
  name: string,
  label: string,
  value?: string | null | undefined | number,
  options?: {[key: string] : any }
  help?: string | undefined
}) => (
  <FormPart name={name} label={label} help={help}>
    <FormControlPart
      label={label}
      name={name}
      options={{
        ...options,
        defaultValue: value,
      }}
    />
  </FormPart>
)

FormInputPart.defaultProps = {
  help: undefined,
  options: [],
  value: undefined,
}

const KennelEditPart = ({ kennelId } : {kennelId : number}) => {
  const { loading, data, error } = useGqlKennelEditPartQuery({
    client: PublicClientHasura,
    variables: { kennelId },
  })
  const kennel = data && data.kennels.length > 0 ? data.kennels[0] : undefined
  const [frequency, setFrequency] = useState<number|undefined>(undefined)
  const kf = kennel ? kennel.frequency : null
  useEffect(() => {
    if (!kf || frequency !== undefined) return
    setFrequency(kf / 7)
  }, [kf, setFrequency, frequency])
  if (error) return <ErrorBanner error={error} />
  if (loading || !data) return <LoadSpinner />
  if (!kennel) return <ErrorBanner error="Kennel not found" />
  let next : Date
  if (kennel.next) {
    next = kennel.next
  } else if (kennel.trails.length > 0) {
    next = kennel.trails[0].start
  } else {
    next = new Date()
    next.setDate(next.getDate() + 1)
  }
  while (next < new Date()) {
    next.setDate(next.getDate() + 7)
  }
  return (
    <Form method="GET" action={`/api/kennel/${kennelId}/edit`}>
      <FormInputPart name="name" label="Kennel Name" value={kennel.name} options={{ required: 1 }} />
      <FormInputPart
        name="short"
        label="Short Name"
        help="Short / Acronymn version of hash name, no spaces or special characters please"
        value={kennel.short_name}
        options={{ required: 1 }}
      />
      <FormInputPart name="area" label="General Area" value={kennel.area} />
      <FormInputPart name="web" label="Website" value={kennel.web} />
      <FormInputPart
        name="description"
        label="Hash Description"
        value={kennel.description}
        options={{
          as: 'textarea',
          required: 1,
        }}
      />
      <FormPart
        name="frequency"
        label="Trail Frequency"
        help="Trail should automatically be created every x weeks, set to 0 for adhoc trails only"
      >
        <FormControlPart
          name="frequency"
          label="Trail Frequency in Weeks"
          options={{
            defaultValue: frequency,
            onChange: (e: React.FormEvent<HTMLInputElement>) => {
              setFrequency(parseInt(e.currentTarget.value, 10) || 0)
            },
          }}
        />
        {
          frequency !== undefined && frequency > 0 && next ? (
            <Form.Group controlId="next">
              <Form.Label>Next Trail</Form.Label>
              <InputDate name="next" initialValue={next} />
            </Form.Group>
          ) : null
        }
      </FormPart>
      <FormInputPart name="price" label="Trail Price" value={(kennel.price || 0).toFixed(2)} />
      <Button type="submit" variant="success">Save Changes</Button>
    </Form>
  )
}

const EditKennelPage = ({ error, body } : EditKennelProps) => {
  if (error) {
    return <BodyError error={error} />
  }
  if (!body) {
    return <BodyError error="No data." />
  }
  const { shortName, kennelId } = body
  return (
    <PageCard title={`Edit ${shortName}:`}>
      <Accordion>
        <Accordion.Item eventKey="info">
          <Accordion.Header>Kennel Info</Accordion.Header>
          <Accordion.Body><KennelEditPart kennelId={parseInt(kennelId, 10)} /></Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="mismanagement">
          <Accordion.Header>Mismanagement</Accordion.Header>
          <Accordion.Body><RoleEditPart kennelId={parseInt(kennelId, 10)} /></Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="calendar">
          <Accordion.Header>Calendar Sync</Accordion.Header>
          <Accordion.Body>
            <CalendarEditPart
              kennelId={kennelId}
              calendarSummary={body.calendarSummary}
              credentialUser={body.credentialUser}
              accessTokenURL={body.accessTokenURL}
              calendarOptions={body.calendarOptions}
            />
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>

      <Row className="mt-3">
        <Button href={`/kennel/${kennelId}`} variant="success">Done</Button>
      </Row>
    </PageCard>
  )
}

EditKennelPage.defaultProps = {
  body: undefined,
  error: undefined,
}

async function setCalendarEditProps(kennel : GqlKennelEditPageKennelFragment, bodyFunc: EditKennelProps['body']) {
  const body = bodyFunc
  if (!body) return null
  if (!kennel.google_token || !kennel.google_refresh) {
    body.accessTokenURL = await accessURL(`${kennel.id}`)
    return null
  }
  body.credentialUser = await getMe(kennel.google_token, kennel.google_refresh).then((me) => {
    if (!me.data.emailAddresses || me.data.emailAddresses.length < 1) {
      throw Error('No email address associated with selected account')
    }
    const user = me.data.emailAddresses[0]
    return user.displayName || user.value!
  })
  if (!kennel.google_calendar) {
    return gcal(kennel.google_token, kennel.google_refresh).calendarList.list()
      .then((r) => {
        body.calendarOptions = r.data.items?.map((i) => ({ id: i.id!, summary: i.summary! }))
      })
      .catch((e) => {
        throw Error(`Google ${e.toString()}`)
      })
  }
  return gcal(kennel.google_token, kennel.google_refresh).calendars.get({
    calendarId: kennel.google_calendar,
  }).then((c) => {
    if (!c.data.summary) {
      throw Error('Invalid calendar selected')
    }
    body.calendarSummary = c.data.summary
  })
}

export const getServerSideProps: GetServerSideProps<EditKennelProps> = async (context) => {
  const { kennelId } : {kennelId? : string} = context.query
  if (!kennelId) { return { props: { error: 'Kennel ID not set' } } }
  const session = await getSession(context)
  if (!session?.user?.email) {
    return {
      props: {
        error: 'Unable to retrieve user from session.',
      },
    }
  }
  const { user: { email } } = session

  try {
    const kennel = await ServerClient().query<GqlKennelEditPageSsrQuery>({
      query: GqlKennelEditPageSsrDocument,
      variables: { kennelId, email },
    })
      .then((r) => {
        if (r.data.kennels.length < 1) {
          throw Error('Kennel not found')
        }
        return r.data.kennels[0]
      })

    // Set defaults
    const body : EditKennelProps['body'] = {
      kennelId,
      shortName: kennel.short_name!,
    }

    await setCalendarEditProps(kennel, body)

    return {
      props: { body },
    }
  } catch (error) {
    const errorString = error instanceof Error ? error.message : 'Unknown error type'
    return {
      props: { error: errorString },
    }
  }
}

export default EditKennelPage
