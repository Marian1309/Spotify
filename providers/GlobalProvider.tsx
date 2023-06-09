'use client'

import type { FC, ReactNode } from 'react'

import { Sidebar } from '@common'

import TanstackReactQueryProvider from './@tanstack-query'
import UserProvider from './_user'
import HotToastProvider from './react-hot-toast'
import SupabaseProvider from './supabase'

const GlobalProvider: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <TanstackReactQueryProvider>
      <HotToastProvider />

      <SupabaseProvider>
        <UserProvider>
          <Sidebar>{children}</Sidebar>
        </UserProvider>
      </SupabaseProvider>
    </TanstackReactQueryProvider>
  )
}

export default GlobalProvider
