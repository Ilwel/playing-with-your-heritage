'use client'
import {
  ApolloClient,
  type DocumentNode,
  InMemoryCache,
  type ApolloQueryResult,
  type FetchResult,
  type NormalizedCacheObject,
  HttpLink,
  split,
} from '@apollo/client'

import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { getMainDefinition } from '@apollo/client/utilities'
import { createClient } from 'graphql-ws'

const httpLink = new HttpLink({
  // eslint-disable-next-line @typescript-eslint/non-nullable-type-assertion-style
  uri: process.env.API as string,
})

const token = localStorage.getItem('token')

const wsLink = new GraphQLWsLink(
  createClient({
    // eslint-disable-next-line @typescript-eslint/non-nullable-type-assertion-style
    url: process.env.WS as string,
    connectionParams: {
      authorization: token,
    },
  })
)

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query)
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    )
  },
  wsLink,
  httpLink
)

export default class ApiService {
  uri = process.env.API
  private readonly _client = new ApolloClient({
    link: splitLink,
    cache: new InMemoryCache(),
  })

  public async query<T = Record<string, unknown>>(
    query: DocumentNode,
    headers: Record<string, string> = {}
  ): Promise<ApolloQueryResult<T>> {
    const res = await this._client.query({
      query,
      context: {
        headers,
      },
    })
    return res
  }

  public async mutation<T = Record<string, unknown>>(
    mutation: DocumentNode,
    headers: Record<string, string> = {},
    variables: Record<string, unknown>
  ): Promise<FetchResult<T>> {
    const res = await this._client.mutate({
      mutation,
      variables,
      context: {
        headers,
      },
    })
    return res
  }

  public getClient(): ApolloClient<NormalizedCacheObject> {
    return this._client
  }
}
