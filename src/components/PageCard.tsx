import { faPen } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import {
  Alert,
  Button, Card, Container,
} from 'react-bootstrap'
import { queryToStrings } from '../func/queryParsing'
import RootNav, { RootNavProps } from './RootNav'

interface CardInfo extends RootNavProps {
    preamble?: React.ReactNode | undefined,
    editLink?: string | undefined,
}

export const BodyCard = ({
  title, accessory, children, preamble, editLink,
} : CardInfo) => {
  const { query } = useRouter()
  const { message, warning } = queryToStrings(query)
  useEffect(() => {
    if (!message && !warning) return
    window.history.pushState('', '', window.location.pathname)
  }, [message, warning])
  return (
    <>
      { message ? (
        <Alert variant="info">
          {message}
        </Alert>
      ) : null }
      { warning ? (
        <Alert variant="warning">
          {warning}
        </Alert>
      ) : null }
      <Card>
        <Card.Body>
          {preamble || null}
          <Card.Title className="d-flex">
            <span>{title}</span>
            { accessory ? <span className="ms-auto me-2">{accessory}</span> : null}
            {editLink ? (
              <Button href={editLink} className="float-end">
                <FontAwesomeIcon icon={faPen} />
              </Button>
            ) : null}
          </Card.Title>
          {children}
        </Card.Body>
      </Card>
    </>
  )
}
BodyCard.defaultProps = {
  preamble: null,
  editLink: null,
}

const PageCard = ({
  title, accessory, children, preamble, description, editLink,
} : CardInfo) => (
  <RootNav key={title} title={title} description={description}>
    <Container>
      <BodyCard title={title} accessory={accessory} preamble={preamble} editLink={editLink}>
        {children}
      </BodyCard>
    </Container>
  </RootNav>
)

PageCard.defaultProps = {
  preamble: null,
  editLink: null,
}

export default PageCard
