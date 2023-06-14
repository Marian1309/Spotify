'use client'

import { BounceLoader } from 'react-spinners'

import Box from './Box'

const Loading = () => {
  return (
    <Box className='h-[calc(100vh-80px)] flex items-center justify-center'>
      <BounceLoader color='#22c55e' size={40} />
    </Box>
  )
}

export default Loading
