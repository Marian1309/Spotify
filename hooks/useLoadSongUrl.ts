import { useSupabaseClient } from '@supabase/auth-helpers-react'

import type { Song } from '@types'

const useLoadSongUrl = (song: Song) => {
  const { storage } = useSupabaseClient()

  if (!song) {
    return ''
  }

  const {
    data: { publicUrl }
  } = storage.from('songs').getPublicUrl(song.song_path)

  return publicUrl
}

export default useLoadSongUrl
