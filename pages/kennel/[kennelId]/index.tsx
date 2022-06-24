/* eslint-disable camelcase */
import { gql, useQuery } from '@apollo/client'
import { useRouter } from 'next/router'
import ReactMarkdown from 'react-markdown'
import Link from 'next/link'
import { GetServerSideProps } from 'next'
import { Button, Tab, Tabs } from 'react-bootstrap'
import ErrorBanner, { BodyError } from '../../../src/components/ErrorBanner'
import ListTable, { DataRow, InfoTable } from '../../../src/components/ListTable'
import LoadSpinner from '../../../src/components/LoadSpinner'
import PageCard from '../../../src/components/PageCard'
import PublicClientHasura from '../../../src/graph/PublicClientHasura'
import {
  GQLGetKennelPage, GQLGetKennelPage_kennels, GQLHareRank,
  GQLMismanagementView, permission_enum_enum,
} from '../../../src/graph/types'
import FormattedDate, { MobileAlt } from '../../../src/components/FormattedDate'
import { queryToInt } from '../../../src/func/queryParsing'
import { useUserPermissions } from '../../../src/func/useUserPerms'

const HareRank = ({ kennelId }: { kennelId: number }) => {
  const { data, loading, error } = useQuery<GQLHareRank>(
    gql`
   query GQLHareRank($kennelId: Int) {
  hashers(where: {name: {_is_null: false}, hares: {trailInfo: {kennel: {_eq: $kennelId}}}}, limit: 50) {
    name
    id
    hares_aggregate(where: {trailInfo: {kennel: {_eq: $kennelId}}}) {
      aggregate {
        count
      }
    }
  }
}
`,
    { variables: { kennelId }, client: PublicClientHasura },
  )
  if (loading || !data) return <LoadSpinner />
  if (error) return <ErrorBanner error={error} />

  let hareCounts = [...data.hashers]
  hareCounts.sort((a, b) => b.hares_aggregate.aggregate!.count - a.hares_aggregate.aggregate!.count)
  hareCounts = hareCounts.slice(0, 14)
  return (
    <ListTable
      columns={['Hasher', 'Hare Count']}
      rows={hareCounts.map((h) => [
        {
          row: h.name,
          link: `/hasher/${h.id}`,
        },
        {
          row: h.hares_aggregate.aggregate!.count,
          link: `/hasher/${h.id}`,
        },
      ])}
    />
  )
}

interface ServerSideProps {
  error?: any | undefined,
  data?: GQLGetKennelPage | null | undefined
}

const TrailsPart = ({ kennel: { trails, id: kennelId } } : { kennel: GQLGetKennelPage_kennels}) => (
  <MobileAlt
    mobile={(
      <>
        <ListTable
          key="desktop"
          className="d-none d-sm-block"
          columns={['#', 'Date', 'Name', 'Hare']}
          rows={trails.map((t) => {
            const link = `/trail/${t.id}`
            return [{
              row: `#${t.calculated_number}`,
              link,
            }, {
              row: <FormattedDate date={t.start} />,
              link,
            }, {
              row: t.name,
              link,
              wrap: true,
            }, {
              row: t.hares.length > 0 ? t.hares.map((h) => h.hasherInfo.name).join(', ') : 'Could be you!',
              link,
            }]
          })}
        />
        <Button variant="success" href={`/api/kennel/${kennelId}/create_draft`}>
          Add a trail
        </Button>
      </>
    )}
    desktop={
      (
        <>
          <ListTable
            key="mobile"
            className=".d-none d-sm-block .d-md-none"
            columns={['Date', 'Name']}
            rows={trails.map((t) => {
              const link = `/trail/${t.id}`
              return [{
                row: <FormattedDate date={t.start} />,
                link,
              }, {
                row: `#${t.calculated_number}: ${t.name}`,
                link,
                wrap: true,
              }]
            })}
          />
          <Button variant="success" href={`/api/kennel/${kennelId}/create_draft`}>
            Add a trail
          </Button>
        </>
      )
    }
  />
)

const MismanagementPart = ({ kennelId } : { kennelId : number }) => {
  const { loading, data, error } = useQuery<GQLMismanagementView>(gql`
query GQLMismanagementView($kennelId: Int) {
  management(where: {kennel: {_eq: $kennelId}}) {
    hasherInfo {
      name
      id
    }
    title
  }
}
  `, {
    variables: { kennelId },
    client: PublicClientHasura,
  })
  if (loading) return <LoadSpinner />
  if (error) return <ErrorBanner error={error} />
  if (!data) return <p>No Mismanagement listed</p>
  return (
    <ListTable
      columns={['Hasher', 'Title']}
      rows={data.management.map((m) => ([
        {
          row: m.hasherInfo.name,
          link: `/hasher/${m.hasherInfo.id}`,
        },
        {
          row: m.title,
        },
      ]))}
    />
  )
}

const KennelPage = ({ error: kennelError, data: kennelData }: ServerSideProps) => {
  const { kennelId } = queryToInt(useRouter().query)
  const perms = useUserPermissions(kennelId)
  if (!kennelId) return <BodyError error="Kennel ID not set" />
  if (kennelError) return <BodyError error={kennelError} />
  if (!kennelData) return <BodyError error="Unknown Kennel" />

  const kennel = kennelData.kennels[0]
  if (!kennel) { return <BodyError error="Unable to retrieve Kennel" /> }

  const rows: DataRow[] = [
    {
      title: kennel.short_name || 'Description',
      row: <ReactMarkdown>{kennel.description || 'New kennel.'}</ReactMarkdown>,
    },
  ]

  if (kennel.area) {
    rows.push({
      title: 'Hashing Area',
      row: kennel.area,
    })
  }

  if (kennel.web) {
    rows.push({
      title: 'Web',
      row: <Link href={kennel.web}>{kennel.web}</Link>,
    })
  }

  return (
    <PageCard
      title={kennel.name || 'DrunkCircle Kennel'}
      description={kennel.description || undefined}
      editLink={perms.includes(permission_enum_enum.mismanage) ? `/kennel/${kennelId}/edit` : undefined}
    >
      <InfoTable rows={rows} />
      <Tabs className="mt-3">
        <Tab eventKey="trails" title="Trails">
          <TrailsPart kennel={kennel} />
        </Tab>
        <Tab eventKey="hares" title="Top Hares">
          <HareRank kennelId={kennelId} />
        </Tab>
        <Tab eventKey="mismanagement" title="Mismanagement">
          <MismanagementPart kennelId={kennelId} />
        </Tab>
      </Tabs>
    </PageCard>
  )
}

KennelPage.defaultProps = {
  error: undefined,
  data: undefined,
}

export const getServerSideProps: GetServerSideProps = async ({ query: { kennelId } }) => {
  let props: ServerSideProps = {}
  const after = new Date()
  after.setHours(after.getHours() - 8)
  await PublicClientHasura.query<GQLGetKennelPage>({
    query: gql`
      query GQLGetKennelPage($kennelId: Int, $after: timestamptz) {
        kennels(limit: 1, where: {id: {_eq: $kennelId}}, ) {
          short_name
          name
          id
          description
          area
          web
          trails(limit: 10, order_by: {calculated_number: asc}, where: {start: {_gt: $after}, draft: {_is_null: true}}) {
            calculated_number
            hares {
              hasherInfo {
                name
              }
            }
            id
            start
            name
          }
        }
      }`,
    variables: { kennelId, after },
  })
    .catch((error) => { props = { error } })
    .then((r) => { props = { data: r ? r.data : null } })
  return { props }
}

export default KennelPage
