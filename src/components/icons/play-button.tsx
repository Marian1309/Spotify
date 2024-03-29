import { memo } from 'react'
import type { FC } from 'react'

import { FaPlay } from 'react-icons/fa'

const PlayButton: FC = memo(() => {
  return (
    <button
      className='transition-opacity flex items-center justify-center opacity-0 rounded-full bg-green-500 p-4
      drop-shadow-md translate-y-1/4 group-hover:opacity-100 group-hover:translate-y-0 hover:scale-110'
    >
      <FaPlay className='text-black' />
    </button>
  )
})

export default PlayButton
