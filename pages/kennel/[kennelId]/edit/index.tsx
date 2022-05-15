/* eslint-disable camelcase */
/* eslint-disable react/jsx-props-no-spreading */
import { gql } from '@apollo/client'
import { Button, Card, ListGroup } from 'react-bootstrap'
import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'
import { BodyError } from '../../../../src/components/ErrorBanner'
import PageCard from '../../../../src/components/PageCard'
import { accessURL } from '../../../../src/func/calendar/CalendarAuthFlow'
import { GQLKennelEditPageSSR, GQLKennelEditPageSSR_kennels } from '../../../../src/graph/types'
import { ServerClient } from '../../../../src/graph/hasura'
import { gcal, getMe } from '../../../../src/api/google'

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
              You&quot;ll need to authorize Drunk Circle to access your Google Calendar.
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
      <CalendarEditPart
        kennelId={kennelId}
        calendarSummary={body.calendarSummary}
        credentialUser={body.credentialUser}
        accessTokenURL={body.accessTokenURL}
        calendarOptions={body.calendarOptions}
      />
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
