'use client'

import type { FC } from 'react'

import { toast } from 'react-hot-toast'
import { AiOutlinePlus } from 'react-icons/ai'
import { TbPlaylist } from 'react-icons/tb'

import type { Song } from '@types'

import { useOnPlay, useUser } from '@hooks'
import { useAuthModal, useUploadModal } from '@hooks/zustand'

import MediaItem from '../MediaItem'

interface LibraryProps {
  songs: Song[]
}

const Library: FC<LibraryProps> = ({ songs }) => {
  const authModal = useAuthModal()
  const uploadModal = useUploadModal()
  const { user } = useUser()
  const onPlay = useOnPlay(songs)

  const onClick = () => {
    if (!user) {
      toast.error('You need to sign in in order to add a song to your library')
      return authModal.onOpen()
    }

    uploadModal.onOpen()
  }

  return (
    <div className='flex flex-col'>
      <div className='flex-between px-5 pt-4'>
        <div className='inline-flex items-center gap-x-2'>
          <TbPlaylist className='text-neutral-400' size={26} />
          <p className='text-neutral-400 font-medium text-md'>Your Library</p>
        </div>

        <AiOutlinePlus
          className='text-neutral-400 cursor-pointer hover:text-white transition-colors'
          onClick={onClick}
          size={20}
        />
      </div>

      <div className='flex flex-col gap-y-2 mt-4 px-3'>
        {songs.map((song) => (
          <MediaItem data={song} key={song.id} onClick={(id: string) => onPlay(id)} />
        ))}
      </div>
    </div>
  )
}

export default Library
