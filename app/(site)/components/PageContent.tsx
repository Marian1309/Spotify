'use client'

import type { FC } from 'react'

import clsx from 'clsx'

import type { Song } from '@types'

import { useOnPlay } from '@hooks'
import { usePlayer } from '@hooks/zustand'

import SongItem from './SongItem'

interface PageContentProps {
  songs: Song[]
}

const PageContent: FC<PageContentProps> = ({ songs }) => {
  const onPlay = useOnPlay(songs)
  const { activeId } = usePlayer()

  if (songs.length === 0) {
    return <div className='mt-4 text-neutral-400 text-xl'>No songs available.</div>
  }

  return (
    <div
      className={clsx(
        `grid grid-cols-2 sm:grid-cols-3 sm:max-h-[78.6vh] md:grid-cols-3 lg:grid-cols-4
        first-letter:xl:grid-cols-5 2xl:grid-cols-8 gap-4 mt-6`,
        activeId && 'max-h-[71.1vh]'
      )}
    >
      {songs.map((song) => (
        <SongItem data={song} key={song.id} onClick={(id: string) => onPlay(id)} />
      ))}
    </div>
  )
}

export default PageContent
