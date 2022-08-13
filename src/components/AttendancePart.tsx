/* eslint-disable camelcase */
import { Session } from 'next-auth'
import { signIn, useSession } from 'next-auth/react'
import React, { useState } from 'react'
import {
  Badge, Button, ButtonGroup, Card, InputGroup, ListGroup,
} from 'react-bootstrap'
import { liveMutate } from '../func/liveMutate'
import PublicClientHasura from '../graph/PublicClientHasura'
import {
  Permission_Enum_Enum, useGqlAttendanceViewSubscription,
  useGqlUpdateAttendanceMutation, useGqlUpdateNoteMutation,
} from '../graph/types'
import ErrorBanner from './ErrorBanner'
import { FormInputPart } from './FormInputPart'
import { HasherPicker } from './HasherPicker'
import { LoadSpinner } from './LoadSpinner'
import UserRequired from './UserRequired'
import { useUserPermissions } from '../func/useUserPerms'

const AttendingBadge = ({ attending } : {attending : boolean|null|undefined }) => {
  let variant = 'warning'
  let text = 'Invited (Maybe)'
  if (attending) {
    variant = 'success'
    text = 'Yes!!'
  } else if (attending === false) {
    variant = 'danger'
    text = 'no.'
  }
  return <Badge bg={variant}>{text}</Badge>
}

const PaidBadge = ({ paid } : {paid : boolean|null|undefined }) => {
  if (paid === null || paid === undefined) return null
  return <Badge className="ms-1" bg={paid ? 'success' : 'danger'}>{paid ? 'Paid' : 'Didn\'t pay'}</Badge>
}

const AttendingRequestPart = ({
  user, trailId, attending, note: dNote, takeAttendance,
} : {user: Session['user'], trailId: number, attending: boolean|undefined|null, note: string, takeAttendance: boolean }) => {
  const [update, { error, loading: disabled }] = useGqlUpdateAttendanceMutation()
  const [updateNote] = useGqlUpdateNoteMutation()
  const [note, setNote] = useState(dNote)
  const [modified, setModified] = useState(false)

  if (error) return <ErrorBanner error={error} />
  if (!user) return <ErrorBanner error="User not available" />
  const hasher = parseInt(user.id, 10)
  return (
    <>
      <InputGroup className="mb-3">
        <InputGroup.Text>
          {attending ? (user.name ?? 'Attending') : 'Attending?'}
        </InputGroup.Text>
        <Button
          variant="success"
          disabled={disabled}
          onClick={() => update({
            variables: {
              hasher,
              attended: true,
              trail: trailId,
              note,
            },
          })}
        >
          Yes
        </Button>
        <Button
          variant="danger"
          disabled={disabled}
          onClick={() => update({
            variables: {
              hasher,
              attended: false,
              trail: trailId,
              note,
            },
          })}
        >
          No
        </Button>
        <Button
          variant="warning"
          disabled={disabled}
          onClick={() => update({
            variables: {
              hasher,
              attended: null,
              trail: trailId,
              note,
            },
          })}
        >
          Maybe
        </Button>
      </InputGroup>
      <FormInputPart
        label={
          attending === false ? 'Excuse:' : 'Comment about (Trash) the trail:'
        }
        name="note"
        value={note}
        options={{
          onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
            setNote(e.currentTarget.value)
            if (!modified) {
              setModified(true)
            }
          },
        }}
        append={(
          <Button
            onClick={() => {
              setModified(false)
              updateNote({
                variables: {
                  hasherId: hasher, trailId, note,
                },
              })
            }}
          >
            Update Note
          </Button>
        )}
      />
      {
        takeAttendance ? (
          <>
            <Card.Text>Mark others as having attended trail (without inviting):</Card.Text>
            <HasherPicker
              addName="Mark"
              allowMultiple={false}
              onSelect={(h) => liveMutate(`/api/trail/${trailId}/paid?hasherId=${h.id}&attended=true`)}
            />
          </>
        ) : null
      }
      <Card.Text className="mt-3">Invite other hashers to join you on this trail:</Card.Text>
      <HasherPicker
        addName="Invite"
        allowMultiple={false}
        onSelect={(h) => liveMutate(`/api/trail/${trailId}/invite?hasher=${h.id}`)}
      />
    </>
  )
}

export default ({ trailId, kennelID, isHare }
  : { trailId: number, kennelID: number, isHare : boolean }) => {
  const { data: sessionData } = useSession()
  const user = sessionData?.user
  const perms = useUserPermissions(kennelID)
  const { loading, data, error } = useGqlAttendanceViewSubscription(
    { variables: { trailId }, client: PublicClientHasura },
  )
  const [showNoShows, setShowNoShows] = useState(false)

  if (loading) { return <LoadSpinner /> }
  if (error) { return <ErrorBanner error={error} /> }
  if (!data) { return <ErrorBanner error="No data." /> }
  const hasherAttendance = user
    ? data.attendance.find(((a) => a.hasherInfo.id === parseInt(user.id, 10)))
    : undefined
  const takeAttendance = perms.includes(Permission_Enum_Enum.Cash) || isHare
  const attending = showNoShows ? data.attendance
    : data.attendance.filter((a) => a.attended !== false)
  return (
    <>
      {
        data.attendance && data.attendance.length > 0 ? (
          <ListGroup className="mb-3 mt-3">
            {
              attending.sort((a, b) => {
                if ((a.attended === false && b.attended !== false) || !a.hasherInfo.name) {
                  return 1
                }
                if ((b.attended === false && a.attended !== false) || !b.hasherInfo.name) {
                  return -1
                }
                return a.hasherInfo.name.localeCompare(b.hasherInfo.name)
              }).map((a) => (
                <ListGroup.Item key={a.hasherInfo.id} action href={takeAttendance ? undefined : `/hasher/${a.hasherInfo.id}`}>
                  {a.hasherInfo.name || `Unnamed hasher #${a.hasherInfo.id}`}
                  {' '}
                  <AttendingBadge attending={a.attended} />
                  { takeAttendance ? <PaidBadge paid={a.paid} /> : null}
                  <i className="ms-2">{a.note}</i>
                  {
                    takeAttendance ? (
                      <p className="mt-2">
                        <ButtonGroup className="ms-auto">
                          <Button
                            variant={a.paid === true ? 'primary' : 'success'}
                            disabled={a.paid === true}
                            onClick={() => liveMutate(`/api/trail/${trailId}/paid?hasherId=${a.hasherInfo.id}&attended=true&paid=true`)}
                          >
                            Paid
                          </Button>
                          <Button
                            variant={a.paid === false ? 'primary' : 'danger'}
                            disabled={a.paid === false}
                            onClick={() => liveMutate(`/api/trail/${trailId}/paid?hasherId=${a.hasherInfo.id}&attended=true&paid=false`)}
                          >
                            Owes
                          </Button>
                          <Button
                            variant="warning"
                            onClick={() => liveMutate(`/api/trail/${trailId}/paid?hasherId=${a.hasherInfo.id}&attended=false`)}
                          >
                            No Show
                          </Button>
                        </ButtonGroup>
                      </p>
                    ) : null
                  }
                </ListGroup.Item>
              ))
            }
          </ListGroup>
        ) : null
      }
      {
        data.attendance.filter((a) => a.attended === false).length > 0 ? (
          <Button className="mb-3" onClick={() => setShowNoShows(!showNoShows)}>
            {showNoShows ? 'Hide "No" responses' : 'Show "No" Responses'}
          </Button>
        ) : null
      }
      {
        user ? (
          <UserRequired>
            <AttendingRequestPart
              user={user}
              note={hasherAttendance?.note ?? ''}
              trailId={trailId}
              attending={hasherAttendance?.attended}
              takeAttendance={takeAttendance}
            />
          </UserRequired>
        ) : (
          <InputGroup>
            <InputGroup.Text>
              Will you be attending this trail?
            </InputGroup.Text>
            <Button
              variant="success"
              onClick={() => signIn()}
            >
              Yes
            </Button>
            <Button
              variant="danger"
              onClick={() => signIn()}
            >
              No
            </Button>
            <Button
              variant="warning"
              onClick={() => signIn()}
            >
              Maybe
            </Button>
          </InputGroup>
        )
      }
    </>
  )
}
