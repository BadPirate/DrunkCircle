/* eslint-disable camelcase */
/* eslint-disable react/jsx-props-no-spreading */
import { gql, useQuery, useSubscription } from '@apollo/client'
import {
  Button, ButtonGroup, Card, Form, InputGroup, ListGroup, OverlayTrigger, Row, Tooltip,
} from 'react-bootstrap'
import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faRightLeft, faTrash } from '@fortawesome/free-solid-svg-icons'
import React, { useState } from 'react'
import ErrorBanner, { BodyError } from '../../../../src/components/ErrorBanner'
import PageCard from '../../../../src/components/PageCard'
import { accessURL } from '../../../../src/func/calendar/CalendarAuthFlow'
import {
  GQLKennelEditPageSSR, GQLKennelEditPageSSR_kennels, GQLKennelRolesEditView,
  GQLPermissionsEnum, PublicHasherInfo,
} from '../../../../src/graph/types'
import { ServerClient } from '../../../../src/graph/hasura'
import { gcal, getMe } from '../../../../src/api/google'
import PublicClientHasura from '../../../../src/graph/PublicClientHasura'
import LoadSpinner from '../../../../src/components/LoadSpinner'
import ListTable from '../../../../src/components/ListTable'
import { HasherPicker } from '../../../../src/components/HasherPicker'
import { liveMutate } from '../../../../src/func/liveMutate'

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
    <Card>
      <Card.Body>
        <Card.Title>Google Calendar Sync</Card.Title>
        Automatically synchronize the r*n calendar with a google calendar.
      </Card.Body>
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
    </Card>
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
  const { loading, error, data } = useQuery<GQLPermissionsEnum>(gql`
query GQLPermissionsEnum {
  permission_enum {
    description
    permission
  }
}
  `, {
    client: PublicClientHasura,
  })
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
  const [hasher, setHasher] = useState<PublicHasherInfo|null>(null)
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
  const { loading, error, data } = useSubscription<GQLKennelRolesEditView>(gql`
subscription GQLKennelRolesEditView($kennelId: Int) {
  kennels(limit: 1, where: {id: {_eq: $kennelId}}) {
    management {
      id
      hasherInfo {
        id
        name
      }
      permissions {
        permissionInfo {
          description
          permission
        }
      }
      title
    }
  }
}
  `, {
    variables: { kennelId },
    client: PublicClientHasura,
  })

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
    <Card>
      <Card.Body>
        <Card.Title>Edit Mismanagement</Card.Title>
        { body }
        <RoleAddPart kennelId={kennelId} />
      </Card.Body>
    </Card>
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
      <RoleEditPart kennelId={parseInt(kennelId, 10)} />
      <CalendarEditPart
        kennelId={kennelId}
        calendarSummary={body.calendarSummary}
        credentialUser={body.credentialUser}
        accessTokenURL={body.accessTokenURL}
        calendarOptions={body.calendarOptions}
      />
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

async function setCalendarEditProps(kennel : GQLKennelEditPageSSR_kennels, bodyFunc: EditKennelProps['body']) {
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
    const kennel = await ServerClient().query<GQLKennelEditPageSSR>({
      query: gql`
        query GQLKennelEditPageSSR($kennelId: Int, $email: String) {
          kennels(where: {id: {_eq: $kennelId}, gm: {email: {_eq: $email}}}, limit: 1) {
            id
            short_name
            google_refresh
            google_token
            google_calendar
          }
        }
      `,
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
