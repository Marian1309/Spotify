'use client'

import type { FC, ReactNode } from 'react'

import TanstackReactQueryProvider from './@tanstack-query'
import HotToastProvider from './react-hot-toast'

const GlobalProvider: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <>
      <HotToastProvider />
      <TanstackReactQueryProvider>{children}</TanstackReactQueryProvider>
    </>
  )
}

export default GlobalProvider
