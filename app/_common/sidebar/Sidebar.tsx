'use client'

import type { FC, ReactNode } from 'react'
import { useMemo } from 'react'

import { usePathname } from 'next/navigation'

import { BiSearch } from 'react-icons/bi'
import { HiHome } from 'react-icons/hi'
import { MdLibraryMusic } from 'react-icons/md'
import { twMerge } from 'tailwind-merge'
import uniqid from 'uniqid'

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
      {
        icon: HiHome,
        label: 'Home',
        active: pathname === '/',
        href: '/'
      },
      {
        icon: BiSearch,
        label: 'Search',
        active: pathname === '/search',
        href: '/search'
      }
    ],
    [pathname]
  ) satisfies Route[]

  const id = uniqid()

  return (
    <div className='flex'>
      <div
        className={twMerge(
          'hidden h-full w-[300px] flex-col gap-y-[8.3px] p-2 md:flex',
          pathname === '/library' && 'flex w-full'
        )}
      >
        <Box>
          <div className='flex sm:flex-col gap-y-4 px-5 py-4 mili:flex-row'>
            {routes.map((route) => (
              <SidebarItem key={route.label} {...route} />
            ))}

            <div className='mili:block md:hidden'>
              <SidebarItem
                active={pathname === '/library'}
                href='/library'
                icon={MdLibraryMusic}
                key={id}
                label='Library'
              />
            </div>
          </div>
        </Box>

        <Box className='sm:h-[calc(100vh-210.5px)] mili:h-[calc(100vh-164px)] overflow-y-auto last:mb-[80px]'>
          <Library songs={songs} />
        </Box>
      </div>

      <main className='h-full flex-1 md:py-2 sm:py-0'>{children}</main>
    </div>
  )
}

export default Sidebar
