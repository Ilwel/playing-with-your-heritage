'use client'
import React from 'react'
import { JetBrains_Mono } from 'next/font/google'
import Loading from './Loading'
import { ReduxProvider } from '../utils/redux/provider'
import ApolloStuffs from './ApolloSuffs'

const jetBrains = JetBrains_Mono({ weight: '400', subsets: ['latin-ext'] })

interface RootLayoutInterface {
  children: React.ReactNode
}

export default function RootLayoutContent({ children }: RootLayoutInterface) {
  return (
    <body className={jetBrains.className + ' h-svh overflow-hidden'}>
      <ReduxProvider>
        <ApolloStuffs>
          <Loading />
          {children}
        </ApolloStuffs>
      </ReduxProvider>
    </body>
  )
}
