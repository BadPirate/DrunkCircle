import { gql, useQuery } from '@apollo/client'
import { signOut, useSession } from 'next-auth/react'
import React from 'react'
import {
  Button,
} from 'react-bootstrap'
import ErrorBanner from '../../src/components/ErrorBanner'
import HareCount from '../../src/components/HareCount'
import KennelList, { GQL_KENNEL_LIST_FRAGMENT } from '../../src/components/KennelList'
import { DataRow, DataTable } from '../../src/components/ListTable'
import LoadSpinner from '../../src/components/LoadSpinner'
import PageCard from '../../src/components/PageCard'
import { GQLPageHasher } from '../../src/graph/types'

const HasherImp = () => {
  const { data: session } = useSession()
  const { loading, error, data } = useQuery<GQLPageHasher>(gql`
  ${GQL_KENNEL_LIST_FRAGMENT}
  query GQLPageHasher($hasherId: Int) {
  hashers(limit: 1, where: {id: {_eq: $hasherId}}) {
    name
    email
    gm {
      ...GQLKennelListFragment
      short_name
    }
  }
}`, {
    variables: { hasherId: (session?.id || null) },
  })
  if (!session) return <ErrorBanner error="Must log in" />
  const hasherId : string = String(session.id)
  if (error) return <ErrorBanner error={error} />

  if (loading || !data?.hashers || data.hashers.length < 1) return <LoadSpinner />

  const hasher = data.hashers[0]

  const rows : Array<DataRow> = [
    { title: 'Hash Name', row: hasher.name },
    { title: 'Email', row: hasher.email },
  ]

  if (hasher.gm.length > 0) {
    rows.push({
      title: 'GM',
      row: <KennelList kennels={hasher.gm} />,
    })
  }

  rows.push({
    title: 'Hares',
    row: <HareCount hasherId={hasherId} />,
  })

  return (
    <>
      <DataTable rows={rows} />
      <Button key="logout" onClick={() => signOut()} variant="danger">Logout</Button>
    </>
  )
}

const Hasher = () => (
  <PageCard title="Hasher Info" description="Login required">
    <HasherImp />
  </PageCard>
)

export default Hasher
