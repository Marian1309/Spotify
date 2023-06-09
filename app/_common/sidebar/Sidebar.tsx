'use client'

import type { FC, ReactNode } from 'react'
import { useMemo } from 'react'

import { usePathname } from 'next/navigation'

import { BiSearch } from 'react-icons/bi'
import { HiHome } from 'react-icons/hi'

import type { Route, Song } from '@types'

import Box from './Box'
import Library from './Library'
import SidebarItem from './SidebarItem'

interface SidebarProps {
  children: ReactNode
  songs: Song[]
}

const Sidebar: FC<SidebarProps> = ({ children, songs }) => {
  const pathname = usePathname()

  const routes = useMemo(
    () => [
      { icon: HiHome, label: 'Home', active: pathname !== '/search', href: '/' },
      { icon: BiSearch, label: 'Search', active: pathname === '/search', href: '/search' }
    ],
    [pathname]
  ) satisfies Route[]

  return (
    <div className='flex h-full'>
      <div className='hidden h-full w-[300px] flex-col gap-y-2 bg-black p-2 md:flex'>
        <Box>
          <div className='flex flex-col gap-y-4 px-5 py-4'>
            {routes.map((route) => (
              <SidebarItem key={route.label} {...route} />
            ))}
          </div>
        </Box>

        <Box className='h-[calc(100vh-130px)] overflow-y-auto'>
          <Library songs={songs} />
        </Box>
      </div>

      <main className='h-full flex-1 overflow-y-auto py-2'>{children}</main>
    </div>
  )
}

export default Sidebar
