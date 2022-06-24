/* eslint-disable camelcase */
/* eslint-disable import/prefer-default-export */
import { gql, useQuery } from '@apollo/client'
import ErrorBanner from './ErrorBanner'
import HareCount from './HareCount'
import KennelList, { GQL_KENNEL_LIST_FRAGMENT } from './KennelList'
import ListTable, { DataRow, DataTable } from './ListTable'
import LoadSpinner from './LoadSpinner'
import PublicClientHasura from '../graph/PublicClientHasura'
import { GQLHasherInfoClient, GQLHasherInfoClient_hashers_management } from '../graph/types'

type MMRolesType = { roles: GQLHasherInfoClient_hashers_management[] }
export const MismanagementRolesPart = ({ roles } : MMRolesType) => (
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

type HIPType = { hasherId: number; }
export const HasherInfoPageDetailPart = ({ hasherId }: HIPType) => {
  const { loading, data, error } = useQuery<GQLHasherInfoClient>(gql`
  ${GQL_KENNEL_LIST_FRAGMENT}
query GQLHasherInfoClient($hasherId: Int) {
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
    attendance_aggregate(where: {attended: {_eq: true}}) {
      aggregate {
        count
      }
    }
  }
}
  `, { variables: { hasherId }, client: PublicClientHasura })
  if (loading) { return <LoadSpinner /> }
  if (error) { return <ErrorBanner error={error} /> }
  if (!data || data.hashers.length < 1) { return <ErrorBanner error="No data" /> }
  const hasher = data.hashers[0]
  const rows: DataRow[] = [
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
  const attendance = hasher.attendance_aggregate.aggregate?.count
  if (attendance && attendance > 0) {
    rows.push({
      title: 'Trails attended',
      row: attendance,
    })
  }
  return <DataTable rows={rows} />
}
