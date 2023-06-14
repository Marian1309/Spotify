import useSoundFn from 'use-sound'
import type { PlayFunction } from 'use-sound/dist/types'
import type { StoreApi } from 'zustand'
import { create } from 'zustand'

import usePlayer from './usePlayer'

type SoundStore = {
  play: PlayFunction
  pause: (id?: string | undefined) => void
  sound: any
}

const useSound = ({ songUrl, onPlayNext }: any): StoreApi<SoundStore> => {
  const { volume, setIsPlaying, setSongLoaded } = usePlayer()

  const [play, { pause, sound }] = useSoundFn(songUrl, {
    volume,
    onplay: () => {
      setIsPlaying(true)
      setSongLoaded(true)
    },
    onend: () => {
      setIsPlaying(false)
      onPlayNext()
    },
    onpause: () => {
      setIsPlaying(false)
    },
    onload: () => {
      setSongLoaded(true)
    },
    format: ['mp3']
  })

  return create(() => ({
    play,
    pause,
    sound
  }))
}

export default useSound
