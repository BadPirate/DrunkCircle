import { gql, useLazyQuery } from '@apollo/client'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { ListGroup } from 'react-bootstrap'
import { BodyError } from '../src/components/ErrorBanner'
import { BodySpinner } from '../src/components/LoadSpinner'
import { trailDateFormat } from '../src/func/dateFormats'
import { queryToInt, queryToStrings } from '../src/func/queryParsing'
import PublicClientHasura from '../src/graph/PublicClientHasura'
import { GQLFeedPageLazy } from '../src/graph/types'

const FeedPage = () => {
  const q = useRouter().query
  const [loadTrails, { data, loading, error }] = useLazyQuery<GQLFeedPageLazy>(gql`
query GQLFeedPageLazy($limit: Int = 10, $kennels: [String!]) {
  trails(order_by: {start: asc}, limit: $limit, where: {draft: {_is_null: true}, start: {_gt: "now()"}, kennelInfo: {short_name: {_in: $kennels}}}) {
    name
    id
    kennelInfo {
      short_name
    }
    start
  }
}
  `, { client: PublicClientHasura })
  useEffect(() => {
    if (!q) return
    const { l } = queryToInt(q)
    const { k } = queryToStrings(q)
    const limit = l || 6
    const kennels = k ? k.split(' ') : ['SVH3', 'FHAgnews', 'FHAC-U']
    loadTrails({
      variables: { limit, kennels },
    })
  }, [loadTrails, q])
  if (error) {
    return <BodyError error={error} />
  }
  if (!data || loading) {
    return <BodySpinner />
  }
  return (
    <ListGroup>
      {
        data.trails.map((trail) => (
          <ListGroup.Item action href={`/trail/${trail.id}`} target="drunkcircle" key={trail.id}>
            <h5>
              {trail.kennelInfo.short_name}
              :
              {' '}
              {trail.name}
            </h5>
            <p>{trailDateFormat(trail.start)}</p>
          </ListGroup.Item>
        ))
      }
    </ListGroup>
  )
}

export default FeedPage
