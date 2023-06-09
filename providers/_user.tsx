'use client'

import { useEffect, useState } from 'react'

import { UserContext } from '@context'
import { useSessionContext, useUser } from '@supabase/auth-helpers-react'

import type { Subscription, UserDetails } from '@types'

export interface Props {
  [propName: string]: any
}

export const UserProvider = (props: Props) => {
  const {
    session,
    isLoading: isLoadingUser,
    supabaseClient: supabase
  } = useSessionContext()
  const user = useUser()

  const accessToken = session?.access_token ?? null

  const [isLoadingData, setIsloadingData] = useState(false)
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null)
  const [subscription, setSubscription] = useState<Subscription | null>(null)

  const getUserDetails = () => supabase.from('users').select('*').maybeSingle()
  const getSubscription = () =>
    supabase
      .from('subscriptions')
      .select('*, prices(*, products(*))')
      .in('status', ['trialing', 'active'])
      .maybeSingle()

  useEffect(() => {
    if (user && !isLoadingData && !userDetails && !subscription) {
      setIsloadingData(true)

      Promise.allSettled([getUserDetails(), getSubscription()]).then((results) => {
        const userDetailsPromise = results[0]
        const subscriptionPromise = results[1]

        if (userDetailsPromise.status === 'fulfilled') {
          setUserDetails(userDetailsPromise.value.data as UserDetails)
        }

        if (subscriptionPromise.status === 'fulfilled') {
          setSubscription(subscriptionPromise.value.data as Subscription)
        }

        setIsloadingData(false)
      })
    } else if (!user && !isLoadingUser && !isLoadingData) {
      setUserDetails(null)
      setSubscription(null)
    }
  }, [user, isLoadingUser])

  const value = {
    accessToken,
    user,
    userDetails,
    isLoading: isLoadingUser || isLoadingData,
    subscription
  }

  return <UserContext.Provider value={value} {...props} />
}

export default UserProvider
