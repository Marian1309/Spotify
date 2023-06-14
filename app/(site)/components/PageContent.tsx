'use client'

import type { FC } from 'react'

import type { Song } from '@types'

import { checkUser } from '@utils/helpers'

import { useOnPlay, useUser } from '@hooks'

import SongItem from './SongItem'

interface PageContentProps {
  songs: Song[]
}

const PageContent: FC<PageContentProps> = ({ songs }) => {
  const onPlay = useOnPlay(songs)
  const { user } = useUser()

  const handleClick = (id: string) => {
    checkUser(user, () => {
      const currentSong = songs.find((song) => song.id === id)
      document.title = currentSong?.title as string

      onPlay(id)
    })
  }

  if (songs.length === 0) {
    return (
      <div className='mt-4 text-neutral-400 text-xl'>No songs available.</div>
    )
  }

  return (
    <div
      className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4
      xl:grid-cols-5 2xl:grid-cols-8 gap-4 mt-6 mili:last:mb-[100px] md:last:mb-0`}
    >
      {songs.map((song) => (
        <SongItem
          data={song}
          key={song.id}
          onClick={() => handleClick(song.id)}
        />
      ))}
    </div>
  )
}

export default PageContent
