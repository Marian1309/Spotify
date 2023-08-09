import { cookies } from 'next/headers'

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'

const getUser = async () => {
  const supabase = createServerComponentClient({ cookies })

  const user = await supabase.auth.getUser()

  return user ?? null
}

export default getUser
