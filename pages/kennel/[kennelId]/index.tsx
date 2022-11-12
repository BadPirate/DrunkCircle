/* eslint-disable camelcase */
import { useRouter } from 'next/router'
import ReactMarkdown from 'react-markdown'
import Link from 'next/link'
import { GetServerSideProps } from 'next'
import { Button, Tab, Tabs } from 'react-bootstrap'
import moment from 'moment'
import ErrorBanner, { BodyError } from '../../../src/components/ErrorBanner'
import ListTable, { DataRow, InfoTable } from '../../../src/components/ListTable'
import { LoadSpinner } from '../../../src/components/LoadSpinner'
import PageCard from '../../../src/components/PageCard'
import PublicClientHasura from '../../../src/graph/PublicClientHasura'
import FormattedDate, { MobileAlt } from '../../../src/components/FormattedDate'
import { queryToInt } from '../../../src/func/queryParsing'
import { useUserPermissions } from '../../../src/func/useUserPerms'
import {
  GqlGetKennelPageDocument, GqlGetKennelPageKennelFragment,
  GqlGetKennelPageQuery,
  Permission_Enum_Enum,
  useGqlHareRankQuery,
  useGqlMismanagementViewQuery,
} from '../../../src/graph/types'

const HareRank = ({ kennelId }: { kennelId: number }) => {
  const { data, error } = useGqlHareRankQuery({
    client: PublicClientHasura,
    variables: { kennelId },
  })

  if (error) return <ErrorBanner error={error} />
  if (!data) return <LoadSpinner />

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
  data?: GqlGetKennelPageQuery | null | undefined
}

const TrailsPart = ({
  kennel: { trails, id: kennelId },
} : { kennel: GqlGetKennelPageKennelFragment }) => (
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
  const { loading, data, error } = useGqlMismanagementViewQuery({
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

  rows.push({
    title: 'Frequency',
    row: kennel.frequency && kennel.frequency > 0 && kennel.next
      ? `Hashes every ${kennel.frequency > 0 ? `${kennel.frequency / 7} weeks` : 'week'} on ${moment(kennel.next).format('dddd')}`
      : 'Hashes periodically.  Click on Add trail to host your own trail for this kennel.',
  })

  return (
    <PageCard
      title={kennel.name || 'DrunkCircle Kennel'}
      description={kennel.description || undefined}
      editLink={perms.includes(Permission_Enum_Enum.Mismanage) ? `/kennel/${kennelId}/edit` : undefined}
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
        {
          kennel.google_calendar ? (
            <Tab eventKey="calendar" title="Calendar">
              <iframe
                title="Calendar"
                src={`https://calendar.google.com/calendar/embed?src=${kennel.google_calendar}`}
                style={{ border: 0 }}
                height="600"
                width="800"
              />
            </Tab>
          ) : null
        }
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
  await PublicClientHasura.query<GqlGetKennelPageQuery>({
    query: GqlGetKennelPageDocument,
    fetchPolicy: 'no-cache',
    variables: { kennelId, after },
  })
    .catch((error) => { props = { error } })
    .then((r) => { props = { data: r ? r.data : null } })
  return { props }
}

export default KennelPage
