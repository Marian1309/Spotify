'use client'

import type { FC } from 'react'

import { toast } from 'react-hot-toast'
import { AiOutlinePlus } from 'react-icons/ai'
import { TbPlaylist } from 'react-icons/tb'

import type { Song } from '@types'

import { checkUser } from '@utils/helpers'

import { useOnPlay, useUser } from '@hooks'
import { useAuthModal, usePlayer, useUploadModal } from '@hooks/zustand'

import MediaItem from '../MediaItem'

interface LibraryProps {
  songs: Song[]
}

const Library: FC<LibraryProps> = ({ songs }) => {
  const authModal = useAuthModal()
  const uploadModal = useUploadModal()
  const { user } = useUser()
  const onPlay = useOnPlay(songs)
  const { setId } = usePlayer()

  const handleUploadClick = () => {
    if (!user) {
      toast.error('Please login in order to upload your song')
      return authModal.onOpen()
    }

    uploadModal.onOpen()
  }

  const handleItemClick = (id: string) => {
    checkUser(user, () => {
      const currentSong = songs.find((song) => song.id === id)
      document.title = `${currentSong?.title} | Spotify`

      onPlay(id)
      setId(id)
    })
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
          onClick={handleUploadClick}
          size={20}
        />
      </div>

      <div className='flex flex-col gap-y-4 mt-4 px-3 last:mb-4'>
        {songs.map((song) => (
          <MediaItem data={song} key={song.id} onClick={handleItemClick} />
        ))}
      </div>
    </div>
  )
}

export default Library
