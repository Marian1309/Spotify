'use client'

import type { FC } from 'react'

import type { Song } from '@types'

import { ICONS } from '@utils/constants'

import { useLoadImage } from '@hooks'

import { LazyLoadImage } from '@common'

interface MediaItemProps {
  data: Song
  onClick?: (id: string) => void
}

const MediaItem: FC<MediaItemProps> = ({ data, onClick }) => {
  const imageUrl = useLoadImage(data)

  const handleClick = () => {
    if (onClick) {
      return onClick(data.id)
    }
  }

  return (
    <div
      className='flex items-center gap-x-3 cursor-pointer hover:bg-neutral-800/50 w-full p-2 rounded-md'
      onClick={handleClick}
    >
      <div className='relative rounded-md min-h-[50px] min-w-[50px] overflow-hidden'>
        <LazyLoadImage
          alt='Media Item'
          className='object-fill'
          height={50}
          src={imageUrl || ICONS.liked}
          width={50}
        />
      </div>

      <div className='flex flex-col gap-y-1 overflow-hidden'>
        <p className='text-white truncate'>{data.title}</p>

        <p className='text-sm truncate text-neutral-400'>{data.author}</p>
      </div>
    </div>
  )
}

export default MediaItem
