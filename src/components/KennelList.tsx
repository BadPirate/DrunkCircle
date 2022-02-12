import { gql } from '@apollo/client'
import { ListGroup, ListGroupItem } from 'react-bootstrap'
import { GQLKennelListFragment } from '../graph/types'

/* eslint-disable import/prefer-default-export */
export const GQL_KENNEL_LIST_FRAGMENT = gql`
fragment GQLKennelListFragment on kennels {
  id
  name
}
`

const KennelList = ({ kennels } : { kennels: GQLKennelListFragment[] }) => (
  <ListGroup>
    {kennels.map((kennel) => (
      <ListGroupItem key={kennel.id} onClick={() => { window.location.href = `/kennel/${kennel.id}` }}>
        {kennel.name}
      </ListGroupItem>
    ))}
  </ListGroup>
)

export default KennelList
