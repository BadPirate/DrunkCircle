/* eslint-disable camelcase */
import { gql } from '@apollo/client'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { BodyError } from '../../../src/components/ErrorBanner'
import HareCount from '../../../src/components/HareCount'
import KennelList, { GQL_KENNEL_LIST_FRAGMENT } from '../../../src/components/KennelList'
import ListTable, { DataRow, DataTable } from '../../../src/components/ListTable'
import PageCard from '../../../src/components/PageCard'
import PublicClientHasura from '../../../src/graph/PublicClientHasura'
import { GQLHasherInfo, GQLHasherInfo_hashers_management } from '../../../src/graph/types'

interface ServerSideProps {
    data?: GQLHasherInfo | null | undefined,
    error?: any | undefined
}

const MismanagementRolesPart = ({ roles } : { roles: GQLHasherInfo_hashers_management[] }) => (
  <ListTable
    columns={['Kennel', 'Title']}
    rows={roles.map((r) => ([
      {
        row: r.kennelInfo.short_name,
        link: `/kennel/${r.kennelInfo.id}`,
      },
      {
        row: r.title,
      },
    ]))}
  />
)

const HasherInfoPage = (props : ServerSideProps) => {
  const { data, error } = props
  const { hasherId } = useRouter().query
  if (error) return <BodyError error={error} />
  if (!data?.hashers || data.hashers.length < 1 || typeof hasherId !== 'string') return <BodyError error="Hasher not found" />
  const hasher = data.hashers[0]
  const rows : DataRow[] = [
    {
      title: 'Hash Name',
      row: hasher.name,
    },
  ]
  if (hasher.management.length > 0) {
    rows.push({
      title: 'Mismanagement',
      row: <MismanagementRolesPart roles={hasher.management} />,
    })
  }
  if (hasher.gm.length > 0) {
    rows.push({
      title: 'GM',
      row: <KennelList kennels={hasher.gm} />,
    })
  }
  rows.push({
    title: 'Hare Count',
    row: <HareCount hasherId={hasherId} />,
  })
  return (
    <PageCard
      title={hasher.name || 'Hasher info'}
      description={`DrunkCircle hash record for ${hasher.name}`}
    >
      <DataTable rows={rows} />
    </PageCard>
  )
}

HasherInfoPage.defaultProps = {
  data: undefined,
  error: undefined,
}

export const getServerSideProps: GetServerSideProps = async ({ query: { hasherId } }) => {
  const props : ServerSideProps = {}
  await PublicClientHasura.query<GQLHasherInfo>({
    query: gql`
${GQL_KENNEL_LIST_FRAGMENT}
query GQLHasherInfo($hasherId: Int) {
  hashers(limit: 1, where: {id: {_eq: $hasherId}}) {
    name
    gm {
      ...GQLKennelListFragment
    }
    management {
      kennelInfo {
        id
        short_name
      }
      title
    }
  }
}
`,
    variables: { hasherId },
  })
    .catch((error) => { props.error = error })
    .then((data) => { if (data) props.data = data.data })
  return { props }
}

export default HasherInfoPage
