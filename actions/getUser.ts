import { cookies } from 'next/headers'

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'

const getUser = async () => {
  const supabase = createServerComponentClient({ cookies })

  const user = supabase.auth.getUser()

  if (user) {
    return user
  } else {
    return null
  }
}

export default getUser
