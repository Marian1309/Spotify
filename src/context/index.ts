import { createContext } from 'react'

import type { User } from '@supabase/auth-helpers-nextjs'

type UserContext = {
  user: User | null
}

export const UserContext = createContext<UserContext | null>(null)
