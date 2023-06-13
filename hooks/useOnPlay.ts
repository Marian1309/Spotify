import type { Song } from '@types'

import { useAuthModal, usePlayer } from './zustand'

import useUser from './useUser'

const useOnPlay = (songs: Song[]) => {
  const { setId, setIds } = usePlayer()
  const authModal = useAuthModal()

  const user = useUser()

  const onPlay = (id: string) => {
    if (!user) {
      return authModal.onOpen()
    }

    setId(id)
    setIds(songs.map((song) => song.id))
  }

  return onPlay
}

export default useOnPlay
