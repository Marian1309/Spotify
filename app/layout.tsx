import type { ReactNode } from 'react'

import type { Metadata } from 'next'
import { Figtree } from 'next/font/google'

import clsx from 'clsx'

import ModalProvider from '@providers/_modal'
import UserProvider from '@providers/_user'
import HotToastProvider from '@providers/react-hot-toast'
import SupabaseProvider from '@providers/supabase'

import { ICONS } from '@utils/constants'

import { getSongsById } from '@actions'

import { Player, Sidebar } from '@common'

import '@styles/globals.scss'

const figTree = Figtree({ subsets: ['latin'], fallback: ['system-ui', 'arial'] })

export const metadata: Metadata = {
  title: 'Spotify',
  description: 'Listen to music!',
  icons: { icon: ICONS.favicon },
  authors: [{ name: 'Marian', url: 'https://github.com/Marian1309' }]
}

const RootLayout = async ({ children }: { children: ReactNode }) => {
  const userSongs = await getSongsById()

  return (
    <html lang='en'>
      <body className={clsx(figTree.className, 'select-none')}>
        <HotToastProvider />

        <SupabaseProvider>
          <UserProvider>
            <ModalProvider />
            <Sidebar songs={userSongs}>{children}</Sidebar>
            <Player />
          </UserProvider>
        </SupabaseProvider>
      </body>
    </html>
  )
}

export default RootLayout
