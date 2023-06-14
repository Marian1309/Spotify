import type { Metadata } from 'next'
import { Figtree } from 'next/font/google'

import type { Children } from '@types'

import TanstackReactQueryProvider from '@providers/@tanstack-query'
import ModalProvider from '@providers/_modal'
import UserProvider from '@providers/_user'
import HotToastProvider from '@providers/react-hot-toast'
import SupabaseProvider from '@providers/supabase'

import { ICONS } from '@utils/constants'

import { getSongsById } from '@actions'

import { Sidebar } from '@common'
import { Player } from '@common/player'

import '@styles/globals.scss'

const figTree = Figtree({
  subsets: ['latin'],
  fallback: ['system-ui', 'arial']
})

export const metadata: Metadata = {
  title: 'Spotify',
  description: 'Listen to music!',
  icons: { icon: ICONS.favicon },
  authors: [{ name: 'Marian', url: 'https://github.com/Marian1309' }]
}

export const revalidate = 0

const RootLayout = async ({ children }: Children) => {
  const userSongs = await getSongsById()

  return (
    <SupabaseProvider>
      <TanstackReactQueryProvider>
        <UserProvider>
          <html lang='en'>
            <body className={figTree.className}>
              <HotToastProvider />

              <ModalProvider />
              <Sidebar songs={userSongs}>{children}</Sidebar>
              <Player />
            </body>
          </html>
        </UserProvider>
      </TanstackReactQueryProvider>
    </SupabaseProvider>
  )
}

export default RootLayout
