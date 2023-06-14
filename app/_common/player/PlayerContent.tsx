'use client'

import type { FC } from 'react'
import { useEffect } from 'react'

import Image from 'next/image'

import { toast } from 'react-hot-toast'
import { AiFillStepBackward, AiFillStepForward } from 'react-icons/ai'
import { BsPauseFill, BsPlayFill } from 'react-icons/bs'
import { HiSpeakerWave, HiSpeakerXMark } from 'react-icons/hi2'

import type { Song } from '@types'

import { ICONS } from '@utils/constants'

import { useUser } from '@hooks'
import { usePlayer, useSound } from '@hooks/zustand'

import { MediaItem } from '@common'
import { SongLoader } from '@common/icons'
import { Slider } from '@common/radix-ui'

interface PlayerContentProps {
  song: Song
  songUrl: string
}

const PlayerContent: FC<PlayerContentProps> = ({ song, songUrl }) => {
  const {
    ids,
    isPlaying,
    activeId,
    setId,
    setSongLoaded,
    setVolume,
    songLoaded,
    volume,
    setIsPlaying
  } = usePlayer()
  const { user } = useUser()

  const onPlayNext = () => {
    if (ids.length === 0) {
      return
    }

    const currentIndex = ids.findIndex((id) => id === activeId)
    const nextSong = ids[currentIndex + 1]

    if (!nextSong) {
      return setId(ids[0])
    }

    setId(nextSong)
  }

  const { play, pause, sound } = useSound({
    songUrl,
    onPlayNext
  }).getState()

  useEffect(() => {
    sound?.play()

    return () => {
      sound?.stop()
    }
  }, [sound])

  useEffect(() => {
    if (!user) {
      setSongLoaded(true)
      setId('')
      pause()
      setIsPlaying(false)
    }
  }, [user])

  const icon = isPlaying ? (
    <BsPauseFill className='text-black' size={30} />
  ) : (
    <BsPlayFill className='text-black relative left-[1.5px]' size={30} />
  )
  const VolumeIcon = volume === 0 ? HiSpeakerXMark : HiSpeakerWave

  const onPlayPrevious = () => {
    if (ids.length === 0) {
      return
    }

    const currentIndex = ids.findIndex((id) => id === activeId)
    const previousSong = ids[currentIndex - 1]

    if (!previousSong) {
      return setId(ids[ids.length - 1])
    }

    setId(previousSong)
  }

  const handlePlay = () => {
    if (!user) {
      return toast.error('Please login in order to listen to music')
    }

    if (user && !activeId) {
      return toast.error('Choose a song to listen to')
    }

    if (!isPlaying && user) {
      return play()
    }

    if (isPlaying && user) {
      return pause()
    }
  }

  const toggleMute = () => {
    if (volume === 0) {
      setVolume(1)
    } else {
      setVolume(0)
    }
  }

  return (
    <div className='h-full flex items-center justify-evenly'>
      <div className='w-full flex justify-start'>
        <div className='flex items-center gap-x-4'>
          {user ? (
            <MediaItem data={song} />
          ) : (
            <Image alt='liked' height={50} src={ICONS.liked} width={50} />
          )}
        </div>
      </div>

      <div className='h-full flex justify-center items-center w-full max-w-[722px] gap-x-6'>
        {songLoaded ? (
          <>
            <AiFillStepBackward
              className='text-neutral-400 cursor-pointer hover:text-white transition-colors'
              onClick={onPlayPrevious}
              size={30}
            />

            <div
              className='flex-center h-10 w-10 rounded-full bg-white p-1 cursor-pointer relative'
              onClick={handlePlay}
            >
              {icon}
            </div>

            <AiFillStepForward
              className='text-neutral-400 cursor-pointer hover:text-white transition-colors'
              onClick={onPlayNext}
              size={30}
            />
          </>
        ) : (
          <div className='relative bottom-[2px]'>
            <SongLoader />
          </div>
        )}
      </div>

      <div className='sm:flex w-full pr-2 mili:hidden justify-end'>
        <div className='flex items-center gap-x-2 w-[120px]'>
          <VolumeIcon
            className='cursor-pointer'
            onClick={toggleMute}
            size={34}
          />

          <Slider onChange={(value) => setVolume(value)} value={volume} />
        </div>
      </div>
    </div>
  )
}

export default PlayerContent
