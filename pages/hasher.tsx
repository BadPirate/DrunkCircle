import { gql, useLazyQuery } from '@apollo/client'
import { signOut, useSession } from 'next-auth/react'
import React, { useEffect } from 'react'
import {
  Alert, Button, Card, Container, ListGroup, ListGroupItem, Spinner, Table,
} from 'react-bootstrap'
import ErrorBanner from '../src/components/ErrorBanner'
import RootNav from '../src/components/RootNav'
import { GQLPageHasher, GQLPageHasherHares } from '../src/graph/types'

const Body = ({ children } : { children : React.ReactNode }) => (
  <RootNav><Container>{children}</Container></RootNav>)

const TableRow = ({ title, children } : { title: string, children: React.ReactNode }) => (
  <tr key={title}>
    <th>{title}</th>
    <td>{children}</td>
  </tr>
)

const Hasher = () => {
  const { data: session, status } = useSession()
  const [getHasher, { loading: hasherLoading, error: hasherError, data }] = useLazyQuery<GQLPageHasher>(gql`
  query GQLPageHasher($id: Int) {
  hashers(limit: 1, where: {id: {_eq: $id}}) {
    name
    email
    gm {
      short_name
      name
      id
    }
  }
}`)
  const [getHares, { error: haresError, data: haresData }] = useLazyQuery<GQLPageHasherHares>(gql`
  query GQLPageHasherHares($id: Int) {
  kennels(where: {trails: {hares: {hasher: {_eq: $id}}}}, order_by: {trails_aggregate: {count: desc}}) {
    id
    short_name
    trails_aggregate {
      aggregate {
        count
      }
    }
  }
}`)

  const sessionId = session?.id
  const error = hasherError || haresError
  useEffect(() => {
    if (!sessionId) return
    getHasher({ variables: { id: sessionId } })
    getHares({ variables: { id: sessionId } })
  }, [sessionId, getHasher, getHares])

  if (status === 'unauthenticated') {
    return (<Body><Alert>Login required</Alert></Body>)
  }

  if (error) {
    return <Body><ErrorBanner error={error} /></Body>
  }

  if (hasherLoading || !data?.hashers || data.hashers.length < 1) {
    return (
      <Body><Spinner animation="grow" /></Body>
    )
  }

  const hasher = data.hashers[0]

  return (
    <Body>
      <Card>
        <Card.Body>
          <Card.Title>{hasher.name}</Card.Title>
          <Table>
            <tbody>
              <TableRow title="Hash Name">{hasher.name}</TableRow>
              <TableRow title="Email">{hasher.email}</TableRow>
              {
                hasher.gm.length > 0
                  ? (
                    <TableRow title="GM">
                      <ListGroup>
                        {hasher.gm.map((kennel) => (
                          <ListGroupItem>
                            {kennel.name}
                          </ListGroupItem>
                        ))}
                      </ListGroup>
                    </TableRow>
                  )
                  : null
              }
              {
                haresData && haresData.kennels.length > 0
                  ? (
                    <TableRow title="Hares">
                      <Table>
                        {
                          haresData.kennels.map((kennel) => (
                            <tr key={kennel.id}>
                              <th>{kennel.short_name}</th>
                              <td>{kennel.trails_aggregate.aggregate?.count || 0}</td>
                            </tr>
                          ))
                        }
                      </Table>
                    </TableRow>
                  ) : null
              }
            </tbody>
          </Table>
          <Button onClick={() => signOut()} variant="danger">Logout</Button>
        </Card.Body>
      </Card>
    </Body>
  )
}

export default Hasher
