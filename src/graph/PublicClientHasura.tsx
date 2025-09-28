import {
  ApolloClient, HttpLink, InMemoryCache, split,
} from '@apollo/client'
import type { NormalizedCacheObject } from '@apollo/client'
import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { getMainDefinition } from '@apollo/client/utilities'
import { createClient } from 'graphql-ws'
import { ilog } from '../func/Logging'

const getWsEndpoint = (endpoint?: string) => {
  if (endpoint?.startsWith('https://')) {
    return `wss://${endpoint.substring('https://'.length)}`
  }

  if (endpoint?.startsWith('http://')) {
    return `ws://${endpoint.substring('http://'.length)}`
  }

  throw new Error(`Invalid endpoint, must start with https:// or http://: ${endpoint}`)
}

let cachedClient: ApolloClient<NormalizedCacheObject> | null = null

const createClientLink = () => {
  const hasuraEndpoint = process.env.NEXT_PUBLIC_HASURA_ENDPOINT

  const httpLink = new HttpLink({
    uri: hasuraEndpoint,
  })

  const wsEndpoint = getWsEndpoint(hasuraEndpoint)

  const wsLink = (typeof window !== 'undefined' && wsEndpoint) ? new GraphQLWsLink(createClient({
    url: wsEndpoint,
  })) : null

  ilog('createClientLink', { wsEndpoint, hasuraEndpoint })

  return wsLink ? split(
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
  ) : httpLink
}

const createPublicClientHasura = () => new ApolloClient({
  cache: new InMemoryCache(),
  link: createClientLink(),
})

const getPublicClientHasura = () => {
  if (!cachedClient) {
    cachedClient = createPublicClientHasura()
  }

  return cachedClient
}

export default getPublicClientHasura
