'use client'

import type { FC } from 'react'

import type { Song } from '@types'

import { ICONS } from '@utils/constants'
import { checkUser } from '@utils/helpers'

import { useLoadImage, useUser } from '@hooks'

import { LazyLoadImage } from '@common'
import { PlayButton } from '@common/icons'

interface SongItemProps {
  onClick: (id: string) => void
  data: Song
}

const SongItem: FC<SongItemProps> = ({ onClick, data }) => {
  const imagePath = useLoadImage(data)
  const { user } = useUser()

  const handleSongPlaying = () => {
    checkUser(user, () => {
      localStorage.setItem('song-id', data.id)
      onClick(data.id)
    })
  }

  return (
    <div
      className='relative group flex-center flex-col rounded-md overflow-hidden h-full
      bg-neutral-400/5 cursor-pointer hover:bg-neutral-400/10 transition-colors p-3'
      onClick={handleSongPlaying}
    >
      <div className='relative aspect-square w-full h-full rounded-md overflow-hidden'>
        <LazyLoadImage alt='song' src={imagePath || ICONS.liked} />
      </div>

      <div className='flex flex-col items-start w-full p-4 gap-y-1 text-white'>
        <p className='font-semibold truncate w-full'>{data.title}</p>
        <p className='text-neutral-400 text-sm w-full truncate'>
          By {data.author}
        </p>
      </div>

      <div className='absolute bottom-24 right-5 hover:block'>
        <PlayButton />
      </div>
    </div>
  )
}

export default SongItem
