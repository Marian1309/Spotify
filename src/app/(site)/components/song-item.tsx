'use client'

import type { FC } from 'react'

import Image from 'next/image'

import type { Song } from '@/types'

import { ICONS } from '@/lib/constants'

import { useLoadImage } from '@/hooks'

import { PlayButton } from '@/components/icons'

interface SongItemProps {
  onClick: () => void
  data: Song
}

const SongItem: FC<SongItemProps> = ({ onClick, data }) => {
  const imagePath = useLoadImage(data)

  return (
    <div
      className='relative group flex-center flex-col rounded-md overflow-hidden h-full
      bg-neutral-400/5 cursor-pointer hover:bg-neutral-400/10 transition-colors p-3'
      onClick={onClick}
    >
      <div className='relative aspect-square w-full h-full rounded-md overflow-hidden'>
        <Image
          alt='song'
          height={100}
          src={imagePath || ICONS.liked}
          style={{ height: '100%', width: '100%' }}
          width={100}
        />
      </div>

      <div className='flex flex-col items-start w-full p-4 gap-y-1 text-white'>
        <p className='font-semibold truncate w-full'>{data.title}</p>
        <p className='text-neutral-400 text-sm w-full truncate'>
          {data.author}
        </p>
      </div>

      <div className='absolute bottom-24 right-5 hover:block'>
        <PlayButton />
      </div>
    </div>
  )
}

export default SongItem
