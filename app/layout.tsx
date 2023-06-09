import type { FC, ReactNode } from 'react'

import type { Metadata } from 'next'
import { Figtree } from 'next/font/google'

import GlobalProvider from '@providers/GlobalProvider'

import { ICONS } from '@utils/constants'

import '@styles/globals.scss'

const figTree = Figtree({ subsets: ['latin'], fallback: ['system-ui', 'arial'] })

export const metadata: Metadata = {
  title: 'Spotify',
  description: 'Listen to music!',
  icons: { icon: ICONS.favicon },
  authors: [{ name: 'Marian', url: 'https://github.com/Marian1309' }]
}

const RootLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <html lang='en'>
      <body className={figTree.className}>
        <GlobalProvider>{children}</GlobalProvider>
      </body>
    </html>
  )
}

export default RootLayout
