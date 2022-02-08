import { Card, Container } from 'react-bootstrap'
import RootNav from './RootNav'

type CardInfo = {
    title: string,
    children: React.ReactNode,
    preamble?: React.ReactNode | undefined,
}

export const BodyCard = ({ title, children, preamble } : CardInfo) => (
  <Card>
    <Card.Body>
      {preamble || null}
      <Card.Title>{title}</Card.Title>
      {children}
    </Card.Body>
  </Card>
)

BodyCard.defaultProps = {
  preamble: null,
}

const PageCard = ({ title, children, preamble } : CardInfo) => (
  <RootNav key={title} title={title}>
    <Container>
      <BodyCard title={title} preamble={preamble}>
        {children}
      </BodyCard>
    </Container>
  </RootNav>
)

PageCard.defaultProps = {
  preamble: null,
}

export default PageCard
