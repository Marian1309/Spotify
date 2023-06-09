import type { FC } from 'react'

import Link from 'next/link'

import clsx from 'clsx'

import type { Route } from '@types'

const SidebarItem: FC<Route> = ({ icon: Icon, label, active, href }) => {
  return (
    <Link
      className={clsx(
        `flex h-auto w-full cursor-pointer items-center gap-x-4 py-1 
        font-medium text-neutral-400 transition hover:text-white`,
        active && 'text-white'
      )}
      href={href}
    >
      <Icon size={26} />
      <p className='truncate w-full'>{label}</p>
    </Link>
  )
}

export default SidebarItem
