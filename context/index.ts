'use client'

import { createContext } from 'react'

import type { User } from '@supabase/auth-helpers-react'

import type { Subscription, UserDetails } from '@types'

type UserContext = {
  accessToken: string | null
  user: User | null
  userDetails: UserDetails | null
  isLoading: boolean
  subscription: Subscription | null
}

const UserContext = createContext<UserContext | null>(null)

export { UserContext }
