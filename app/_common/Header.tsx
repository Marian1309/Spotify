'use client'

import type { FC, ReactNode } from 'react'
import { Fragment } from 'react'

import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { useSupabaseClient } from '@supabase/auth-helpers-react'
import clsx from 'clsx'
import { toast } from 'react-hot-toast'
import type { IconType } from 'react-icons'
import { BiSearch } from 'react-icons/bi'
import { HiHome } from 'react-icons/hi'
import { RxCaretLeft, RxCaretRight } from 'react-icons/rx'

import { useUser } from '@hooks'
import { useAuthModal, usePlayer } from '@hooks/zustand'

import Button from './Button'

interface HeaderProps {
  children: ReactNode
  className?: string
}

type Arrow = {
  icon: IconType
  onClick: () => void
}

type Action = {
  className: string
  onClick: () => void
  title: 'Sign Up' | 'Log In' | 'Logout' | Object
}

const Header: FC<HeaderProps> = ({ children, className }) => {
  const { setId } = usePlayer()
  const { back, forward, refresh, push } = useRouter()
  const authModal = useAuthModal()
  const supabaseClient = useSupabaseClient()
  const { user } = useUser()

  const handleLogout = async () => {
    const { error } = await supabaseClient.auth.signOut()

    localStorage.removeItem('song-id')
    setId('')

    push('/')
    refresh()

    if (error) {
      toast.error(error.message)
    }
  }

  const arrows = [
    { icon: RxCaretLeft, onClick: back },
    { icon: RxCaretRight, onClick: forward }
  ] satisfies Arrow[]

  const mobileIcons = [
    { icon: HiHome, href: '/' },
    { icon: BiSearch, href: '/search' }
  ] satisfies {
    icon: IconType
    href: string
  }[]

  const headerActions = {
    login: [
      {
        className: 'bg-transparent text-white font-medium whitespace-nowrap',
        onClick: authModal.onOpen,
        title: 'Sign Up'
      },
      { className: 'bg-white px-6 py-[6px]', onClick: authModal.onOpen, title: 'Log In' }
    ],
    logged: [
      {
        className: 'bg-white px-6 py-2',
        onClick: handleLogout,
        title: 'Logout'
      }
      // {
      //   className: 'bg-white px-4 h-[44.18px]',
      //   onClick: () => push('/account'),
      //   title: <FaUserAlt />
      // }
    ]
  } satisfies { login: Action[]; logged: Action[] }

  return (
    <div className={clsx('h-fit bg-gradient-to-b from-emerald-600 p-6', className)}>
      <div className='w-full mb-4 flex-between'>
        <div className='hidden md:flex gap-x-2 items-center'>
          {arrows.map(({ icon: Icon, onClick }, index: number) => (
            <button
              className='rounded-full bg-black flex-center hover:opacity-75 transition-opacity'
              key={index}
              onClick={onClick}
            >
              <Icon className='text-white' size={35} />
            </button>
          ))}
        </div>

        <div className='flex-center md:hidden gap-x-2'>
          {mobileIcons.map(({ icon: Icon, href }, index: number) => (
            <Link
              className='p-3 rounded-full bg-white flex-center hover:opacity-75 transition-opacity'
              href={href}
              key={index}
            >
              <Icon size={20} />
            </Link>
          ))}
        </div>

        <div className='flex-between gap-x-4'>
          {headerActions[user !== null ? 'logged' : 'login'].map(
            ({ title, ...buttonProps }, index: number) => (
              <Fragment key={index}>
                <Button {...buttonProps}>{title}</Button>
              </Fragment>
            )
          )}
        </div>
      </div>

      {children}
    </div>
  )
}

export default Header
