'use client'

import type { FC } from 'react'

import MediaItem from '@common/sidebar/MediaItem'

import type { Song } from '@types'

interface SearchContentProps {
  songs: Song[]
}

const SearchContent: FC<SearchContentProps> = ({ songs }) => {
  if (songs.length === 0) {
    return (
      <div className='flex flex-col gap-y-2 w-full px-6 text-neutral-400'>
        No songs found.
      </div>
    )
  }

  return (
    <div className='flex flex-col gap-y-2 w-full px-6'>
      {songs.map((song) => (
        <div className='flex items-center gap-x-4 w-full' key={song.id}>
          <div className='flex-1'>
            <MediaItem data={song} onClick={() => {}} />
          </div>

          {/* TODO: Add Like Button Here */}
        </div>
      ))}
    </div>
  )
}

export default SearchContent
