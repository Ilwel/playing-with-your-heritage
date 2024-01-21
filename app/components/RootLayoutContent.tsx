'use client'
import { ApolloProvider } from '@apollo/client'
import { useApi } from '../hooks/useApi'
import React from 'react'
import { JetBrains_Mono } from 'next/font/google'
import { ReduxProvider } from '../redux/provider'
import Loading from './Loading'

const jetBrains = JetBrains_Mono({ weight: '400', subsets: ['latin-ext'] })

interface RootLayoutInterface {
  children: React.ReactNode
}

export default function RootLayoutContent({ children }: RootLayoutInterface) {
  const api = useApi()
  return (
    <ApolloProvider client={api.getClient()}>
      <body className={jetBrains.className + ' h-svh overflow-hidden'}>
        <ReduxProvider>
          <Loading />
          {children}
        </ReduxProvider>
      </body>
    </ApolloProvider>
  )
}
