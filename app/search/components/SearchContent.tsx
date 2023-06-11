'use client'

import type { FC } from 'react'

import type { Song } from '@types'

import { useOnPlay } from '@hooks'

import { LikeButton } from '@common'
import MediaItem from '@common/MediaItem'

interface SearchContentProps {
  songs: Song[]
}

const SearchContent: FC<SearchContentProps> = ({ songs }) => {
  const onPlay = useOnPlay(songs)

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
            <MediaItem data={song} onClick={(id: string) => onPlay(id)} />
          </div>

          <LikeButton songId={song.id} />
        </div>
      ))}
    </div>
  )
}

export default SearchContent
