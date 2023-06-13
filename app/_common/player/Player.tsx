'use client'

import type { FC } from 'react'
import { useEffect } from 'react'

import { useRouter } from 'next/navigation'

import { useGetSongById, useLoadSongUrl, useUser } from '@hooks'
import { usePlayer } from '@hooks/zustand'

import PlayerContent from './PlayerContent'

const Player: FC = () => {
  const { refresh } = useRouter()
  const { setId, activeId } = usePlayer()
  const { song } = useGetSongById(activeId)
  const songUrl = useLoadSongUrl(song)
  const { user } = useUser()

  useEffect(() => {
    const songId = localStorage.getItem('song-id') as string
    setId(songId)
    refresh()
  }, [user])

  return (
    <div className='h-[80px] w-full bg-black px-4 mili:bottom-0 mili:fixed sm:block md:py-1'>
      <PlayerContent key={songUrl} song={song} songUrl={songUrl} />
    </div>
  )
}

export default Player
