'use client'

import type { FC } from 'react'

import { useRouter } from 'next/navigation'

import { FaPlay } from 'react-icons/fa'

import { LazyLoadImage } from '@common'

interface ListItemProps {
  image: string
  name: string
  href: string
}

const ListItem: FC<ListItemProps> = ({ image, name, href }) => {
  const { push } = useRouter()

  return (
    <button
      className='relative group flex items-center rounded-md overflow-hidden
      gap-x-4 bg-neutral-100/10 hover:bg-neutral-100/20 transition pr-4'
      onClick={() => push(href)}
    >
      <div className='relative max-h-[64px] max-w-[64px]'>
        <LazyLoadImage
          alt={name}
          className='object-cover'
          height={64}
          src={image}
          width={64}
        />
      </div>

      <p className='text-white text-lg'>{name}</p>

      <div
        className='absolute transition opacity-0 rounded-full flex-center
        drop-shadow-md bg-green-500 p-4 right-5 group-hover:opacity-100 hover:scale-110'
      >
        <FaPlay className='text-black relative left-[2px]' />
      </div>
    </button>
  )
}

export default ListItem
