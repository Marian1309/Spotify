'use client'

import { useUser } from '@supabase/auth-helpers-react'

import { UserContext } from '@context'

export interface Props {
  [propName: string]: any
}

export const UserProvider = (props: Props) => {
  const user = useUser()

  return <UserContext.Provider value={{ user }} {...props} />
}

export default UserProvider
