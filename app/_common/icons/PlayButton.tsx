import type { FC } from 'react'

import { FaPlay } from 'react-icons/fa'

const PlayButton: FC = () => {
  return (
    <button
      className='transition opacity-0 rounded-full flex items-center justify-center bg-green-500
      p-4 drop-shadow-md translatetranslate-y-1/4group-hover:opacity-100 group-hover:translate-y-0hover:scale-110'
    >
      <FaPlay className='text-black' />
    </button>
  )
}

export default PlayButton
