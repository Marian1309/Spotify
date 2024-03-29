'use client'

import type { FC } from 'react'

import Image from 'next/image'

import { twMerge } from 'tailwind-merge'

import type { Song } from '@/types'

import { ICONS } from '@/lib/constants'

import { useLoadImage } from '@/hooks'

interface MediaItemProps {
  data: Song
  onClick?: (id: string) => void
  playerStyles?: string
}

const MediaItem: FC<MediaItemProps> = ({ data, onClick, playerStyles }) => {
  const imageUrl = useLoadImage(data)

  const handleClick = () => {
    if (onClick) {
      return onClick(data?.id)
    }
  }

  return (
    <div
      className='flex items-center gap-x-3 cursor-pointer transition-colors
      hover:bg-neutral-800/50 w-full p-2 pt-0 pb-0 rounded-md'
      onClick={handleClick}
    >
      <div className='rounded-md overflow-hidden pt-2'>
        <Image
          alt={data?.title}
          height={100}
          src={imageUrl || ICONS.liked}
          style={{ width: '50px', height: '50px' }}
          width={100}
        />
      </div>

      <div
        className={twMerge(
          'flex flex-col gap-y-1 overflow-hidden',
          playerStyles
        )}
      >
        <p className='text-white truncate'>{data?.title}</p>

        <p className='text-sm truncate max-w-[190px] text-neutral-400'>
          {data?.author}
        </p>
      </div>
    </div>
  )
}

export default MediaItem
