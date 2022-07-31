/* eslint-disable camelcase */
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { BodyError } from '../../../src/components/ErrorBanner'
import PageCard from '../../../src/components/PageCard'
import { queryToInt } from '../../../src/func/queryParsing'
import PublicClientHasura from '../../../src/graph/PublicClientHasura'
import { HasherInfoPageDetailPart } from '../../../src/components/HasherInfoPageDetailPart'
import { GqlHasherInfoServerDocument, GqlHasherInfoServerQuery } from '../../../src/graph/types'

interface ServerSideProps {
    data?: GqlHasherInfoServerQuery | null | undefined,
    error?: any | undefined
}

const HasherInfoPage = (props : ServerSideProps) => {
  const { data, error } = props
  const { hasherId } = queryToInt(useRouter().query)
  if (!data?.hashers || data.hashers.length < 1 || !hasherId) return <BodyError error="Hasher not found" />
  if (error) return <BodyError error={error} />
  const { name } = data.hashers[0]
  if (typeof name !== 'string') return <BodyError error="Name should be string" />
  return (
    <PageCard
      title={name || 'Hasher info'}
      description={`DrunkCircle hash record for ${name}`}
    >
      <HasherInfoPageDetailPart hasherId={hasherId} />
    </PageCard>
  )
}

HasherInfoPage.defaultProps = {
  data: undefined,
  error: undefined,
}

export const getServerSideProps: GetServerSideProps = async ({ query: { hasherId } }) => {
  const props : ServerSideProps = {}
  await PublicClientHasura.query<GqlHasherInfoServerQuery>({
    query: GqlHasherInfoServerDocument,
    variables: { hasherId },
  })
    .catch((error) => { props.error = error })
    .then((data) => { if (data) props.data = data.data })
  return { props }
}

export default HasherInfoPage
