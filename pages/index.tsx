import {
  Card, Container,
} from 'react-bootstrap'
import RootNav from '../src/components/RootNav'

const Home = () => (
  <RootNav>
    <Container>
      <Card>
        <Card.Body>
          <Card.Title>DrunkCircle</Card.Title>
          <Card.Text>
            Welcome to the DrunkCircle website.  A free resource for Hash House Harriers.
          </Card.Text>
          <Card.Text>
            Thanklessly maintained by
            {' '}
            <a href="mailto:ni@fhacu.com">Nothing Interesting</a>
          </Card.Text>
        </Card.Body>
      </Card>
    </Container>
  </RootNav>
)

export default Home
