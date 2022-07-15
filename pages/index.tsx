import Link from 'next/link'
import {
  Alert,
  Card,
} from 'react-bootstrap'
import ReactMarkdown from 'react-markdown'
import { DataRow, InfoTable } from '../src/components/ListTable'
import PageCard from '../src/components/PageCard'

const Home = () => {
  const rows : DataRow[] = [
    {
      title: 'New to Hashing?',
      row: (
        <ReactMarkdown>
          {`
Welcome (hashing) Virgin!  The Hash House Harriers is an international group of
non-competitive running social clubs (Called "[Kennels](/kennel)"), founded in 1938.
With a [long and interesting history](https://en.wikipedia.org/wiki/Hash_House_Harriers), 
thousands of active members and hundreds of clubs around the globe, it's very likely
there is a group that has been chalking up streets in your neighborhood for years.

Members of the public are encouraged to come join us on any of our [trails](/trail),
following the directions and instructions provided by the individual responsible for
that weeks trail (called the 'Hare').
          `}
        </ReactMarkdown>
      ),
    },
    {
      title: 'Looking for trail?',
      row: (
        <ReactMarkdown>
          {`
Search by [kennel](/kennel), all [trails](/trail) or add the [hash calendar](/calendar) to your favorite
calendar client. 
        `}
        </ReactMarkdown>
      ),
    },
    {
      title: 'Want to Hare?',
      row: (
        <ReactMarkdown>
          {`
'Haring' means being in charge of leading the 'Pack' for a given week.  Pick the '[Kennel](/kennel)' you'd like to
hare for, and an unclaimed week, and then use DrunkCircle to fill out or update your trail details.
          `}
        </ReactMarkdown>
      ),
    },
    {
      title: 'Don\'t see your Kennel in DrunkCircle?',
      row: (
        <ReactMarkdown>
          {`
Getting your kennel added to DrunkCircle is easy, you'll need to be the current GM (or have their email)
to get started.
          `}
        </ReactMarkdown>
      ),
    },
  ]
  return (
    <PageCard
      title="DrunkCircle"
      description="A site for finding trail and kennel information for the Hash House Harriers drinking and running club"
    >
      <Alert variant="info">
        Looking for the old site?
        {' '}
        <a href="https://crusty.drunkcircle.com">crusty.drunkcircle.com</a>
        .
        But why not give the update site a chance while you&apos;re here.
      </Alert>
      <Card.Text>
        Welcome to the DrunkCircle website.  A free resource for Hash House Harriers.
      </Card.Text>
      <Card.Text>
        Thanklessly maintained by
        {' '}
        <Link href="mailto:ni@fhacu.com">Nothing Interesting</Link>
      </Card.Text>
      <InfoTable rows={rows} />
    </PageCard>
  )
}

export default Home
