'use client'
import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
  type NormalizedCacheObject,
  split,
} from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { JetBrains_Mono } from 'next/font/google'
import Loading from './Loading'
import { useApi } from '../utils/hooks/useApi'
import { ReduxProvider } from '../utils/redux/provider'
import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { getMainDefinition } from '@apollo/client/utilities'
import { createClient } from 'graphql-ws'

const jetBrains = JetBrains_Mono({ weight: '400', subsets: ['latin-ext'] })

interface RootLayoutInterface {
  children: React.ReactNode
}

export default function RootLayoutContent({ children }: RootLayoutInterface) {
  const api = useApi()
  const [client, setClient] = useState<ApolloClient<NormalizedCacheObject>>()

  useEffect(() => {
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

    const newClient = new ApolloClient({
      link: splitLink,
      cache: new InMemoryCache(),
    })
    setClient(newClient)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <ApolloProvider client={client ?? api.getClient()}>
      <body className={jetBrains.className + ' h-svh overflow-hidden'}>
        <ReduxProvider>
          <Loading />
          {children}
        </ReduxProvider>
      </body>
    </ApolloProvider>
  )
}
