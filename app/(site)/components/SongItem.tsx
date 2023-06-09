import type { FC } from 'react'

import { LazyLoadImage } from '@common'
import { PlayButton } from '@common/icons'

import type { Song } from '@types'

import { ICONS } from '@utils/constants'

import { useLoadImage } from '@hooks'

interface SongItemProps {
  onClick: (id: string) => void
  data: Song
}

const SongItem: FC<SongItemProps> = ({ onClick, data }) => {
  const imagePath = useLoadImage(data)

  return (
    <div
      className='relative group flex-center flex-col rounded-md overflow-hidden
      gap-x-4 bg-neutral-400/5 cursor-pointer hover:bg-neutral-400/10 transition p-3'
      onClick={() => onClick(data.id)}
    >
      <div className='relative aspect-square w-full h-full rounded-md overflow-hidden'>
        <LazyLoadImage className='object-cover' src={imagePath || ICONS.liked} />
      </div>

      <div className='flex flex-col items-start w-full p-4 gap-y-1 text-white'>
        <p className='font-semibold truncate w-full'>{data.title}</p>
        <p className='text-neutral-400 text-sm pb-4 w-full truncate'>By {data.author}</p>
      </div>

      <div className='absolute bottom-24 right-5'>
        <PlayButton />
      </div>
    </div>
  )
}

export default SongItem
