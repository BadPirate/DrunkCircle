import { gql, useMutation, useSubscription } from '@apollo/client'
import { Session } from 'next-auth'
import { signIn, useSession } from 'next-auth/react'
import {
  Badge, Button, Card, InputGroup, ListGroup,
} from 'react-bootstrap'
import { liveMutate } from '../func/liveMutate'
import PublicClientHasura from '../graph/PublicClientHasura'
import { GQLAttendanceView } from '../graph/types'
import ErrorBanner from './ErrorBanner'
import { GQL_UPDATE_ATTENDANCE } from '../graph/GQL_UPDATE_ATTENDANCE'
import { HasherPicker } from './HasherPicker'
import LoadSpinner from './LoadSpinner'
import UserRequired from './UserRequired'

const AttendingBadge = ({ attending } : {attending : boolean|null }) => {
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

const AttendingRequestPart = ({ user, trailId, attending } : {user: Session['user'], trailId: number, attending: boolean }) => {
  const [update, { error, loading: disabled }] = useMutation(GQL_UPDATE_ATTENDANCE)
  if (error) return <ErrorBanner error={error} />
  if (!user) return <ErrorBanner error="User not available" />
  return (
    <>
      <InputGroup className="mb-3">
        <InputGroup.Text>
          {attending ? 'Update your attendance:' : 'Will you be attending this trail?'}
        </InputGroup.Text>
        <Button
          variant="success"
          disabled={disabled}
          onClick={() => update({
            variables: {
              hasher: user.id,
              attended: true,
              trail: trailId,
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
              hasher: user.id,
              attended: false,
              trail: trailId,
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
              hasher: user.id,
              attended: null,
              trail: trailId,
            },
          })}
        >
          Maybe
        </Button>
      </InputGroup>
      <Card.Text>Invite other hashers to join you on this trail:</Card.Text>
      <HasherPicker
        addName="Invite"
        allowMultiple={false}
        onSelect={(h) => liveMutate(`/api/trail/${trailId}/invite?hasher=${h.id}`)}
      />
    </>
  )
}

export default ({ trailId }: { trailId: number; }) => {
  const { data: sessionData } = useSession()
  const user = sessionData?.user
  const { loading, data, error } = useSubscription<GQLAttendanceView>(gql`
subscription GQLAttendanceView($trailId: Int) {
  attendance(where: {trail: {_eq: $trailId}}) {
    hasherInfo {
      name
      id
    }
    attended
  }
}
  `, { variables: { trailId }, client: PublicClientHasura })
  if (loading) { return <LoadSpinner /> }
  if (error) { return <ErrorBanner error={error} /> }
  if (!data) { return <ErrorBanner error="No data." /> }
  return (
    <>
      {
        data.attendance && data.attendance.length > 0 ? (
          <ListGroup className="mb-3 mt-3">
            {
              data.attendance.map((a) => (
                <ListGroup.Item key={a.hasherInfo.id} action href={`/hasher/${a.hasherInfo.id}`}>
                  {a.hasherInfo.name}
                  {' '}
                  <AttendingBadge attending={a.attended} />
                </ListGroup.Item>
              ))
            }
          </ListGroup>
        ) : null
      }
      {
        user ? (
          <UserRequired>
            <AttendingRequestPart
              user={user}
              trailId={trailId}
              attending={data.attendance
                .find(((a) => a.hasherInfo.id === parseInt(user.id, 10))) !== undefined}
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
