import type { ReactNode } from 'react'

import type { IconType } from 'react-icons'
import type { z } from 'zod'

import type { songUploadSchema } from '@utils/schemas'

export type Children = {
  children: ReactNode
}

export type SongUploadSchema = z.infer<typeof songUploadSchema>

export type Song = {
  id: string
  user_id: string
  author: string
  title: string
  song_path: string
  image_path: string
}

export type Route = {
  icon: IconType
  label: 'Home' | 'Search'
  active: boolean
  href: '/' | '/search'
}
