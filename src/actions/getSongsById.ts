import { cookies } from 'next/headers'

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'

import type { Song } from '@types'

const getSongs = async (): Promise<Song[]> => {
  const supabase = createServerComponentClient({ cookies })

  const { data: sessionData, error: sessionError } =
    await supabase.auth.getSession()

  if (sessionError) {
    return []
  }

  const { data, error } = await supabase
    .from('songs')
    .select('*')
    .eq('user_id', sessionData.session?.user.id)
    .order('created_at', { ascending: false })

  if (error) {
    return []
  }

  return (data as Song[]) ?? []
}

export default getSongs
