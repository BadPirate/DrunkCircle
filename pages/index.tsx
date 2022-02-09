import Link from 'next/link'
import {
  Card,
} from 'react-bootstrap'
import PageCard from '../src/components/PageCard'

const Home = () => (
  <PageCard
    title="DrunkCircle"
    description="A site for finding trail and kennel information for the Hash House Harriers drinking and running club"
  >
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
