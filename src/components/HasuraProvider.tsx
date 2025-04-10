import {
  ApolloClient, ApolloProvider, HttpLink, InMemoryCache,
} from '@apollo/client'
import { useSession } from 'next-auth/react'
import { useMemo } from 'react'
import { Spinner } from 'react-bootstrap'
import PublicClientHasura from '../graph/PublicClientHasura'
import { HasuraSession } from '../../pages/api/auth/[...nextauth]'

const HasuraProvider = ({ children } : {children : React.ReactNode}) => {
  const { data, status } = useSession()
  const session = data as HasuraSession

  const client = useMemo(() => {
    if (!session || !session.hasura_token) {
      return PublicClientHasura
    }
    return new ApolloClient({
      link: new HttpLink({
        uri: process.env.NEXT_PUBLIC_HASURA_ENDPOINT,
        headers: {
          Authorization: `Bearer ${session.hasura_token}`,
          'X-Hasura-Role': 'hasher',
        },
      }),
      uri: process.env.NEXT_PUBLIC_HASURA_ENDPOINT,
      cache: new InMemoryCache(),
    })
  }, [session])

  if (status === 'loading') {
    return <Spinner animation="grow" />
  }

  return (
    <ApolloProvider client={client}>
      {children}
    </ApolloProvider>
  )
}

export default HasuraProvider
