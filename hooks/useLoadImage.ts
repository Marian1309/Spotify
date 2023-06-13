import { useSupabaseClient } from '@supabase/auth-helpers-react'

import type { Song } from '@types'

const useLoadImage = (song: Song) => {
  const { storage } = useSupabaseClient()

  if (!song) {
    return null
  }

  const {
    data: { publicUrl }
  } = storage.from('images').getPublicUrl(song.image_path)

  return publicUrl
}

export default useLoadImage
