import Link from 'next/link'
import {
  Card,
} from 'react-bootstrap'
import PageCard from '../src/components/PageCard'

const Home = () => (
  <PageCard title="DrunkCircle">
    <Card.Text>
      Welcome to the DrunkCircle website.  A free resource for Hash House Harriers.
    </Card.Text>
    <Card.Text>
      Thanklessly maintained by
      {' '}
      <Link href="mailto:ni@fhacu.com">Nothing Interesting</Link>
    </Card.Text>
  </PageCard>
)

export default Home
