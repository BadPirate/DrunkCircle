import {
  ApolloClient, InMemoryCache,
} from '@apollo/client'

const PublicClientHasura = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_HASURA_ENDPOINT,
  cache: new InMemoryCache(),
})

export default PublicClientHasura
