'use client'

import type { FC, ReactNode } from 'react'
import { useEffect, useMemo } from 'react'

import { usePathname } from 'next/navigation'

import clsx from 'clsx'
import { BiSearch } from 'react-icons/bi'
import { HiHome } from 'react-icons/hi'

import type { Route, Song } from '@types'

import { usePlayer } from '@hooks/zustand'

import Box from './Box'
import Library from './Library'
import SidebarItem from './SidebarItem'

interface SidebarProps {
  children: ReactNode
  songs: Song[]
}

const Sidebar: FC<SidebarProps> = ({ children, songs }) => {
  const pathname = usePathname()
  const player = usePlayer()

  const routes = useMemo(
    () => [
      { icon: HiHome, label: 'Home', active: pathname !== '/search', href: '/' },
      { icon: BiSearch, label: 'Search', active: pathname === '/search', href: '/search' }
    ],
    [pathname]
  ) satisfies Route[]

  const handleContextMenu = (e: any) => {
    e.preventDefault()
  }

  useEffect(() => {
    if (window.innerWidth < 800) {
      document.addEventListener('contextmenu', handleContextMenu)
    } else {
      return () => {
        document.removeEventListener('contextmenu', handleContextMenu)
      }
    }
  }, [pathname])

  return (
    <div className={clsx('flex h-full', player.activeId && 'h-[calc(100vh-80px)]')}>
      <div className='hidden h-full w-[300px] flex-col gap-y-[8.3px] p-2 md:flex'>
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

      <main className='h-full flex-1 md:py-2 sm:py-0'>{children}</main>
    </div>
  )
}

export default Sidebar
