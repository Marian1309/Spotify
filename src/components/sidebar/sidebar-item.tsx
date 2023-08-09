'use client'

import type { FC } from 'react'

import { useRouter } from 'next/navigation'

import { twMerge } from 'tailwind-merge'

import type { Route } from '@/types'

const SidebarItem: FC<Route> = ({ icon: Icon, label, active, href }) => {
  const { push } = useRouter()

  const handleClick = () => {
    document.title = 'Spotify'
    push(href)
  }

  return (
    <div
      className={twMerge(
        `flex h-auto w-full cursor-pointer items-center gap-x-4 py-1 font-medium
        text-neutral-400 transition hover:text-white`,
        active && 'text-white'
      )}
      onClick={handleClick}
    >
      <Icon size={26} />
      <p className='truncate w-full'>{label}</p>
    </div>
  )
}

export default SidebarItem
