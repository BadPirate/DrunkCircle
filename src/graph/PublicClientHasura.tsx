import {
  ApolloClient, HttpLink, InMemoryCache, split,
} from '@apollo/client'
import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { getMainDefinition } from '@apollo/client/utilities'
import { createClient } from 'graphql-ws'

const hasuraEndpoint = process.env.NEXT_PUBLIC_HASURA_ENDPOINT

const httpLink = new HttpLink({
  uri: hasuraEndpoint,
})

let wsEndpoint: string | undefined
if (hasuraEndpoint?.startsWith('https://')) {
  wsEndpoint = `wss://${hasuraEndpoint.substring('https://'.length)}`
} else if (hasuraEndpoint?.startsWith('http://')) {
  wsEndpoint = `ws://${hasuraEndpoint.substring('http://'.length)}`
} else {
  wsEndpoint = undefined
}

const wsLink = (typeof window !== 'undefined' && wsEndpoint) ? new GraphQLWsLink(createClient({
  url: wsEndpoint,
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
