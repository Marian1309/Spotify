'use client'

import type { FC } from 'react'

import Image from 'next/image'
import { useRouter } from 'next/navigation'

import { FaPlay } from 'react-icons/fa'

interface ListItemProps {
  image: string
  name: string
  href: string
}

const ListItem: FC<ListItemProps> = ({ image, name, href }) => {
  const router = useRouter()

  const onClick = () => {
    router.push(href)
  }

  return (
    <button
      className='relative group flex items-center rounded-md overflow-hidden
      gap-x-4 bg-neutral-100/10 hover:bg-neutral-100/20 transition pr-4'
      onClick={onClick}
    >
      <div className='relative min-h-[64px] min-w-[64px]'>
        <Image
          alt={name}
          className='object-cover'
          fill
          priority
          sizes='auto'
          src={image}
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
