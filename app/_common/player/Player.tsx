'use client'

import type { FC } from 'react'

import type { Song } from '@types'

import { useGetSongById, useLoadSongUrl } from '@hooks'
import { usePlayer } from '@hooks/zustand'

import PlayerContent from './PlayerContent'

const Player: FC = () => {
  const player = usePlayer()
  const { song } = useGetSongById(player.activeId)
  const songUrl = useLoadSongUrl(song as Song)

  if (!song || !songUrl || !player.activeId) {
    return null
  }

  return (
    <div className='fixed bottom-0 bg-black w-full px-4 py-2 h-[80px]'>
      <PlayerContent key={songUrl} song={song} songUrl={songUrl} />
    </div>
  )
}

export default Player
