'use client'

import React from 'react'
import { Provider } from 'react-redux'
import { store } from './store'

interface ReduxProviderInterface {
  children: React.ReactNode
}

export function ReduxProvider({ children }: ReduxProviderInterface) {
  return <Provider store={store}>{children}</Provider>
}
