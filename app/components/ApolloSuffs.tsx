import React, { useEffect, useState } from 'react'
import { useApi } from '../utils/hooks/useApi'
import {
  ApolloClient,
  HttpLink,
  split,
  type NormalizedCacheObject,
  InMemoryCache,
  ApolloProvider,
  ApolloLink,
  from,
} from '@apollo/client'
import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { createClient } from 'graphql-ws'
import { getMainDefinition } from '@apollo/client/utilities'
import { useAppSelector } from '../utils/redux/store'

interface ApolloStuffsInterface {
  children: React.ReactNode
}

export default function ApolloStuffs({ children }: ApolloStuffsInterface) {
  const api = useApi()
  const [client, setClient] = useState<ApolloClient<NormalizedCacheObject>>()
  const auth = useAppSelector((state) => state.authReducer.value)

  useEffect(() => {
    const httpLink = new HttpLink({
      // eslint-disable-next-line @typescript-eslint/non-nullable-type-assertion-style
      uri: process.env.API as string,
    })

    const wsLink = new GraphQLWsLink(
      createClient({
        // eslint-disable-next-line @typescript-eslint/non-nullable-type-assertion-style
        url: process.env.WS as string,
        connectionParams: {
          authorization: auth.token,
        },
      })
    )

    const authMiddleware = new ApolloLink((operation, forward) => {
      operation.setContext(({ headers = {} }) => ({
        headers: {
          ...headers,
          authorization: auth.token,
        }
      }));
    
      return forward(operation);
    })


    const splitLink = split(
      ({ query }) => {
        const definition = getMainDefinition(query)
        return (
          definition.kind === 'OperationDefinition' &&
          definition.operation === 'subscription'
        )
      },
      wsLink,
      from([authMiddleware, httpLink])
    )

    const newClient = new ApolloClient({
      link: splitLink,
      cache: new InMemoryCache(),
    })
    setClient(newClient)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth.token])

  return (
    <ApolloProvider client={client ?? api.getClient()}>
      {children}
    </ApolloProvider>
  )
}
