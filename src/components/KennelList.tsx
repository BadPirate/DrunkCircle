import { ListGroup, ListGroupItem } from 'react-bootstrap'
import { GqlKennelListFragment } from '../graph/types'

/* eslint-disable import/prefer-default-export */

const KennelList = ({ kennels } : { kennels: GqlKennelListFragment[] }) => (
  <ListGroup>
    {kennels.map((kennel) => (
      <ListGroupItem key={kennel.id} onClick={() => { window.location.href = `/kennel/${kennel.id}` }}>
        {kennel.name}
      </ListGroupItem>
    ))}
  </ListGroup>
)

export default KennelList
