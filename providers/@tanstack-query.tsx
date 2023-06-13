'use client'

import type { FC } from 'react'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import type { Children } from '@types'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    }
  }
})

const TanstackReactQueryProvider: FC<Children> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}

export default TanstackReactQueryProvider
