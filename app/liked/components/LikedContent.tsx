'use client'

import type { FC } from 'react'
import { useEffect } from 'react'

import { useRouter } from 'next/navigation'

import type { Song } from '@types'

import { useOnPlay, useUser } from '@hooks'

import { LikeButton, MediaItem } from '@common'

interface LikedContentProps {
  songs: Song[]
}

const LikedContent: FC<LikedContentProps> = ({ songs }) => {
  const router = useRouter()
  const { isLoading, user } = useUser()
  const onPlay = useOnPlay(songs)

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace('/')
    }
  }, [isLoading, user, router])

  if (songs?.length === 0) {
    return (
      <div className='flex flex-col gap-y-2 w-full px-6 text-neutral-400 text-xl pb-4 sm:min-h-[calc(100vh-282.7px)] lg:min-h-[calc(100vh-325px)]'>
        No liked songs.
      </div>
    )
  }

  return (
    <div className='flex flex-col gap-y-2 w-full p-6 min-h-[73.2vh] lg:min-h-[69.2vh]'>
      {songs?.map((song) => (
        <div className='flex items-center gap-x-4 w-full' key={song.id}>
          <div className='flex-1'>
            <MediaItem data={song} onClick={(id: string) => onPlay(id)} />
          </div>

          <LikeButton songId={song.id} />
        </div>
      ))}
    </div>
  )
}

export default LikedContent
