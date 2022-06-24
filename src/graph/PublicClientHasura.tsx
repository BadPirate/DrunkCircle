import {
  ApolloClient, HttpLink, InMemoryCache, split,
} from '@apollo/client'
import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { getMainDefinition } from '@apollo/client/utilities'
import { createClient } from 'graphql-ws'

const httpLink = new HttpLink({
  uri: process.env.NEXT_PUBLIC_HASURA_ENDPOINT,
})

const wsLink = typeof window !== 'undefined' ? new GraphQLWsLink(createClient({
  url: process.env.NEXT_PUBLIC_HASURA_WS_ENDPOINT!,
})) : null

const PublicClientHasura = new ApolloClient({
  cache: new InMemoryCache(),
  link: wsLink ? split(
    // split based on operation type
    ({ query }) => {
      const definition = getMainDefinition(query)
      return (
        definition.kind === 'OperationDefinition'
            && definition.operation === 'subscription'
      )
    },
    wsLink,
    httpLink,
  ) : httpLink,
})

export default PublicClientHasura
