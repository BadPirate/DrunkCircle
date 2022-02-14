/* eslint-disable react/jsx-props-no-spreading */
import { gql, useQuery } from '@apollo/client'
import { faGoogle } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useState, SetStateAction, Dispatch } from 'react'
import { Button, Form } from 'react-bootstrap'
import { BodyError } from '../../../src/components/ErrorBanner'
import { BodySpinner } from '../../../src/components/LoadSpinner'
import PageCard from '../../../src/components/PageCard'
import UserRequired from '../../../src/components/UserRequired'
import { GQLEditKennelFragment, GQLGetKennelEditDetails } from '../../../src/graph/types'

interface FieldWrapperProps {
    id: string,
    help?: string,
    label: string,
}

interface HelpFormProps extends FieldWrapperProps {
    children: React.ReactNode
}

interface FieldProps<T> extends FieldWrapperProps {
    state: [T, Dispatch<SetStateAction<T>>],
    required?: boolean
}

interface TextFieldProps extends FieldProps<string> {
    type?: string
}

const HelpForm = ({
  children, help, id, label,
} : HelpFormProps) => (
  <div>
    <Form.Label htmlFor={id} key="label">{label}</Form.Label>
    <span key="form">
      {children}
    </span>
    { help ? <Form.Text id={`${id}-help-block`} muted>{help}</Form.Text> : null }
  </div>
)

HelpForm.defaultProps = { help: undefined }

const TextField = (props: TextFieldProps) => {
  const {
    id, type, help, state, required,
  } = props
  return (
    <HelpForm {...props}>
      <Form.Control
        type={type}
        id={id}
        key="input"
        required={required}
        aria-describedby={help ? `${id}-help-block` : undefined}
        value={state[0]}
        onChange={(e) => state[1](e.target.value)}
      />
    </HelpForm>
  )
}

TextField.defaultProps = { help: undefined, type: 'text', required: false }

const EditKennelCard = ({ kennel } : { kennel : GQLEditKennelFragment}) => {
  const name = useState<string>(kennel.name || '')
  const shortName = useState<string>(kennel.short_name || '')
  const area = useState<string>(kennel.area || '')
  const web = useState<string>(kennel.web || '')
  return (
    <PageCard title={`Edit ${kennel.name || 'Kennel'}`}>
      <Form>
        <TextField state={name} label="Kennel Name" id="name" help="The longer form name for this kennel" required />
        <TextField
          state={shortName}
          label="Short Name"
          id="shortName"
          help="A short name, usually an acronymn that represents this kennel"
          required
        />
        <TextField state={area} label="Area" id="area" help="The broader area this kennel usually meets" required />
        <TextField state={web} label="Website" id="web" help="Optional: Kennel website" type="url" />
        <HelpForm
          label="Google Calendar Sync"
          id="calendar"
          help="You need to login with Google to enable calendar sync"
        >
          <div>
            <Button onClick={() => signIn('google')}>
              Sign in with Google
              <FontAwesomeIcon icon={faGoogle} size="sm" className="ms-1" />
            </Button>
          </div>
        </HelpForm>
      </Form>
    </PageCard>
  )
}

const EditKennelLoggedIn = () => {
  const { kennelId } = useRouter().query
  const { loading, error, data } = useQuery<GQLGetKennelEditDetails>(gql`
fragment GQLEditKennelFragment on kennels {
    area
    description
    frequency
    gm {
      id
      name
    }
    google_calendar
    google_token
    name
    short_name
    web
}

query GQLGetKennelEditDetails($kennelId: Int) {
  kennels(limit: 1, where: {id: {_eq: $kennelId}}) {
      ...GQLEditKennelFragment
  }
}`, { variables: { kennelId } })
  if (error) return <BodyError error={error} />
  if (loading) return <BodySpinner />
  if (!data || data.kennels.length < 1) return <BodyError error="You do not have permission to edit this Kennel" />
  const kennel = data.kennels[0]
  return <EditKennelCard kennel={kennel} />
}

const EditKennelPage = () => (
  <UserRequired>
    <EditKennelLoggedIn />
  </UserRequired>
)

export default EditKennelPage
