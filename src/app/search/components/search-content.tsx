'use client'

import type { FC } from 'react'

import type { Song } from '@/types'

import { checkUser } from '@/lib/utils'

import { useOnPlay, useUser } from '@/hooks'
import { usePlayer } from '@/hooks/zustand'

import { LikeButton, MediaItem } from '@/components/common'

interface SearchContentProps {
  songs: Song[]
}

const SearchContent: FC<SearchContentProps> = ({ songs }) => {
  const onPlay = useOnPlay(songs)
  const { setId } = usePlayer()
  const { user } = useUser()

  const handleClick = (id: string) => {
    checkUser(user, () => {
      const currentSong = songs.find((song) => song.id === id)
      document.title = `${currentSong?.title} | Spotify`

      onPlay(id)
      setId(id)
    })
  }

  if (songs.length === 0) {
    return (
      <div className='flex flex-col gap-y-2 w-full px-6 text-neutral-400 text-xl pb-4'>
        No songs found.
      </div>
    )
  }

  return (
    <div className='flex flex-col h-[calc(82vh)] overflow-y-auto gap-y-2 w-full px-6'>
      {songs.map((song) => (
        <div
          className='flex items-center gap-x-4 w-full first:pt-4 last:pb-4'
          key={song.id}
        >
          <div className='flex-1 py-2'>
            <MediaItem data={song} onClick={handleClick} />
          </div>

          <LikeButton songId={song.id} />
        </div>
      ))}
    </div>
  )
}

export default SearchContent
