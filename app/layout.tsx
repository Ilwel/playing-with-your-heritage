'use client'
import { JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { ApolloProvider } from '@apollo/client'
import { useApi } from './hooks/useApi'

const jetBrains = JetBrains_Mono({ weight: '400', subsets: ['latin-ext'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const api = useApi()

  return (
    <html lang="en">
      <ApolloProvider client={api.getClient()}>
        <body className={jetBrains.className + ' h-svh overflow-hidden'}>
          {children}
        </body>
      </ApolloProvider>
    </html>
  )
}
