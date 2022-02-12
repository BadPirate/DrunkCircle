import { gql, useQuery } from '@apollo/client'
import { useRouter } from 'next/router'
import ReactMarkdown from 'react-markdown'
import dateFormat from 'dateformat'
import Link from 'next/link'
import { GetServerSideProps } from 'next'
import ErrorBanner, { BodyError } from '../../../src/components/ErrorBanner'
import ListTable, { DataRow, InfoTable } from '../../../src/components/ListTable'
import LoadSpinner from '../../../src/components/LoadSpinner'
import PageCard from '../../../src/components/PageCard'
import PublicClientHasura from '../../../src/graph/PublicClientHasura'
import { GQLGetKennelPage, GQLHareRank } from '../../../src/graph/types'

const HareRank = ({ kennelId } : { kennelId : string | string[] }) => {
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

  const hareCounts = [...data.hashers]
  hareCounts.sort((a, b) => b.hares_aggregate.aggregate!.count - a.hares_aggregate.aggregate!.count)
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
    error? : any | undefined,
    data? : GQLGetKennelPage | null | undefined
}

const KennelPage = ({ error: kennelError, data: kennelData } : ServerSideProps) => {
  const { kennelId } = useRouter().query

  if (!kennelId) return <BodyError error="Kennel ID not set" />
  if (kennelError) return <BodyError error={kennelError} />
  if (!kennelData) return <BodyError error="Unknown Kennel" />

  const kennel = kennelData.kennels[0]
  if (!kennel) { return <BodyError error="Unable to retrieve Kennel" /> }

  const rows : DataRow[] = [
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

  rows.push({
    title: 'Trails',
    row: (
      <ListTable
        columns={['#', 'Date', 'Name', 'Hare']}
        rows={
          kennel.trails.map((t) => {
            const link = `/trail/${t.id}`
            return [
              { row: `#${t.calculated_number}`, link },
              { row: dateFormat(t.start, 'dddd, mmmm dS'), link },
              { row: t.name, link, wrap: true },
              { row: t.hares.length > 0 ? t.hares.map((h) => h.hasherInfo.name).join(', ') : 'Could be you!', link },
            ]
          })
        }
      />
    ),
  })

  rows.push({
    title: 'Hares',
    row: <HareRank kennelId={kennelId} />,
  })

  return (
    <PageCard title={kennel.name || 'DrunkCircle Kennel'} description={kennel.description || undefined}>
      <InfoTable rows={rows} />
    </PageCard>
  )
}

KennelPage.defaultProps = {
  error: undefined,
  data: undefined,
}

export const getServerSideProps: GetServerSideProps = async ({ query: { kennelId } }) => {
  let props : ServerSideProps = {}
  const after = new Date()
  after.setHours(after.getHours() - 8)
  await PublicClientHasura.query<GQLGetKennelPage>({
    query: gql`
      query GQLGetKennelPage($kennelId: Int, $after: timestamptz) {
        kennels(limit: 1, where: {id: {_eq: $kennelId}}) {
          short_name
          name
          id
          description
          area
          web
          trails(limit: 10, order_by: {calculated_number: asc}, where: {start: {_gt: $after}}) {
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
