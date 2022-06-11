import { faPenSquare } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useRouter } from 'next/router'
import {
  Alert,
  Button, Card, Col, Container, Row,
} from 'react-bootstrap'
import { queryToStrings } from '../func/queryParsing'
import RootNav, { RootNavProps } from './RootNav'

interface CardInfo extends RootNavProps {
    preamble?: React.ReactNode | undefined,
    editLink?: string | undefined,
}

export const BodyCard = ({
  title, children, preamble, editLink,
} : CardInfo) => {
  const { message } = queryToStrings(useRouter().query)

  return (
    <>
      { message ? (
        <Alert variant="info">
          {message}
        </Alert>
      ) : null }
      <Card>
        <Card.Body>
          {preamble || null}
          <Row>
            <Col xs key="title"><h2>{title}</h2></Col>
            {editLink ? (
              <Col xs="auto" key="edit">
                <Button href={editLink} variant="link">
                  <FontAwesomeIcon icon={faPenSquare} height="30" width="30" />
                </Button>
              </Col>
            ) : null}
          </Row>
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
  title, children, preamble, description, editLink,
} : CardInfo) => (
  <RootNav key={title} title={title} description={description}>
    <Container>
      <BodyCard title={title} preamble={preamble} editLink={editLink}>
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
