import { gql, useLazyQuery } from '@apollo/client'
import { signOut, useSession } from 'next-auth/react'
import React, { useEffect } from 'react'
import {
  Alert, Button, Container, ListGroup, ListGroupItem, Table,
} from 'react-bootstrap'
import { BodyError } from '../src/components/ErrorBanner'
import { DataRow, DataTable } from '../src/components/ListTable'
import { BodySpinner } from '../src/components/LoadSpinner'
import PageCard from '../src/components/PageCard'
import RootNav from '../src/components/RootNav'
import { GQLPageHasher, GQLPageHasherHares } from '../src/graph/types'

const Body = ({ children } : { children : React.ReactNode }) => (
  <RootNav key="info"><Container>{children}</Container></RootNav>)

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
    return <BodyError error={error} />
  }

  if (hasherLoading || !data?.hashers || data.hashers.length < 1) {
    return <BodySpinner />
  }

  const hasher = data.hashers[0]

  const rows : Array<DataRow> = [
    { title: 'Hash Name', row: hasher.name },
    { title: 'Email', row: hasher.email },
  ]

  if (hasher.gm.length > 0) {
    rows.push({
      title: 'GM',
      row: (
        <ListGroup>
          {hasher.gm.map((kennel) => (
            <ListGroupItem key={kennel.id} onClick={() => { window.location.href = `/kennel/${kennel.id}` }}>
              {kennel.name}
            </ListGroupItem>
          ))}
        </ListGroup>
      ),
    })
  }

  if (haresData && haresData.kennels.length > 0) {
    rows.push({
      title: 'Hares',
      row: (
        <Table>
          <tbody>
            {
              haresData.kennels.map((kennel) => (
                <tr key={kennel.id} onClick={() => { window.location.href = `/kennel/${kennel.id}` }}>
                  <th>{kennel.short_name}</th>
                  <td>{kennel.trails_aggregate.aggregate?.count || 0}</td>
                </tr>
              ))
            }
          </tbody>
        </Table>
      ),
    })
  }
  return (
    <PageCard title={hasher.name || 'Hasher Info'}>
      <DataTable rows={rows} />
      <Button key="logout" onClick={() => signOut()} variant="danger">Logout</Button>
    </PageCard>
  )
}

export default Hasher
