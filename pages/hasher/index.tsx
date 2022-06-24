import { useSession } from 'next-auth/react'
import React from 'react'
import { HasherInfoPageDetailPart } from '../../src/components/HasherInfoPageDetailPart'
import PageCard from '../../src/components/PageCard'
import UserRequired from '../../src/components/UserRequired'

const HasherImp = () => {
  const { data } = useSession()
  if (!data || !data.user) return null
  const { user: { id } } = data
  return (
    <PageCard title="Hasher Information">
      <HasherInfoPageDetailPart hasherId={parseInt(id, 10)} />
    </PageCard>
  )
}

const Hasher = () => (
  <UserRequired>
    <HasherImp />
  </UserRequired>
)

export default Hasher
