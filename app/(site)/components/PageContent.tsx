'use client'

import type { FC } from 'react'

import { twMerge } from 'tailwind-merge'

import type { Song } from '@types'

import { useOnPlay } from '@hooks'
import { usePlayer } from '@hooks/zustand'

import SongItem from './SongItem'

interface PageContentProps {
  songs: Song[]
}

const PageContent: FC<PageContentProps> = ({ songs }) => {
  const onPlay = useOnPlay(songs)
  const { setSongLoaded } = usePlayer()

  const handleClick = (id: string) => {
    onPlay(id)
    setSongLoaded(false)
  }

  if (songs.length === 0) {
    return (
      <div className='mt-4 text-neutral-400 text-xl'>No songs available.</div>
    )
  }

  return (
    <div
      className={twMerge(
        `grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4
        xl:grid-cols-5 2xl:grid-cols-8 gap-4 mt-6`
      )}
    >
      {songs.map((song) => (
        <SongItem data={song} key={song.id} onClick={handleClick} />
      ))}
    </div>
  )
}

export default PageContent
