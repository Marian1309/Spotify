'use client'

import type { FC } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'

import Image from 'next/image'

import { AiFillStepBackward, AiFillStepForward } from 'react-icons/ai'
import { BsPauseFill, BsPlayFill } from 'react-icons/bs'
import { HiSpeakerWave, HiSpeakerXMark } from 'react-icons/hi2'
import useSound from 'use-sound'

import type { Song } from '@types'

import { ICONS } from '@utils/constants'

import { useUser } from '@hooks'
import { usePlayer } from '@hooks/zustand'

import { LikeButton, MediaItem } from '@common'
import { SongLoader } from '@common/icons'
import { Slider } from '@common/radix-ui'

interface PlayerContentProps {
  song: Song
  songUrl: string
}

const PlayerContent: FC<PlayerContentProps> = ({ song, songUrl }) => {
  const player = usePlayer()
  const { user } = useUser()
  const [volume, setVolume] = useState<number>(1)
  const [isPlaying, setIsPlaying] = useState<boolean>(false)
  const [songLoaded, setSongLoaded] = useState<boolean>(false)
  const [play, { pause, sound }] = useSound(songUrl, {
    volume,
    onplay: () => {
      setIsPlaying(true)
    },
    onend: () => {
      setIsPlaying(false)
      onPlayNext()
    },
    onpause: () => {
      setIsPlaying(false)
    },
    onload: () => {
      setSongLoaded(true)
    },
    format: ['mp3']
  })

  // document.body.addEventListener('keydown', (e) => {
  //   if (e.code === 'Space') {
  //     handlePlay()
  //   }
  // })

  useEffect(() => {
    sound?.play()

    return () => {
      sound?.unload()
    }
  }, [sound])

  useEffect(() => {
    if (!user) {
      setSongLoaded(true)
    }
  }, [user])

  const icon = isPlaying ? (
    <BsPauseFill className='text-black' size={30} />
  ) : (
    <BsPlayFill className='text-black relative left-[1.5px]' size={30} />
  )
  const VolumeIcon = volume === 0 ? HiSpeakerXMark : HiSpeakerWave

  const onPlayNext = () => {
    if (player.ids.length === 0) {
      return
    }

    const currentIndex = player.ids.findIndex((id) => id === player.activeId)
    const nextSong = player.ids[currentIndex + 1]

    if (!nextSong) {
      return player.setId(player.ids[0])
    }

    player.setId(nextSong)
  }

  const onPlayPrevious = () => {
    if (player.ids.length === 0) {
      return
    }

    const currentIndex = player.ids.findIndex((id) => id === player.activeId)
    const previousSong = player.ids[currentIndex - 1]

    if (!previousSong) {
      return player.setId(player.ids[player.ids.length - 1])
    }

    player.setId(previousSong)
  }

  const handlePlay = () => {
    if (!isPlaying) {
      play()
    } else {
      pause()
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
          {song ? (
            <MediaItem data={song} />
          ) : (
            <Image alt='liked' height={50} src={ICONS.liked} width={50} />
          )}
          <LikeButton songId={song?.id} />
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
          <div className='relative bottom-[3px]'>
            <SongLoader />
          </div>
        )}
      </div>

      <div className='flex w-full pr-2 mili:hidden '>
        <div className='flex items-center gap-x-2 w-[120px]'>
          <VolumeIcon className='cursor-pointer' onClick={toggleMute} size={34} />

          <Slider onChange={(value) => setVolume(value)} value={volume} />
        </div>
      </div>
    </div>
  )
}

export default PlayerContent
