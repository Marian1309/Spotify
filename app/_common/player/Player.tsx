'use client'

import type { FC } from 'react'
import { useEffect } from 'react'

import type { Song } from '@types'

import { useGetSongById, useLoadSongUrl } from '@hooks'
import { usePlayer } from '@hooks/zustand'

import PlayerContent from './PlayerContent'

const Player: FC = () => {
  const { setId, activeId } = usePlayer()

  useEffect(() => {
    const songId = localStorage.getItem('song-id')
    setId(songId as string)
  }, [])

  const { song } = useGetSongById(activeId)
  const songUrl = useLoadSongUrl(song as Song)

  return (
    <div className='h-[80px] w-full bg-black px-4 pb-4 pt-5 mili:fixed mili:bottom-0 sm:block md:py-1'>
      <PlayerContent key={songUrl} song={song as Song} songUrl={songUrl} />
    </div>
  )
}

export default Player
