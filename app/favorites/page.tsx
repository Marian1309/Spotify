import { ICONS } from '@utils/constants'

import { getLikedSongs } from '@actions'

import { Header, LazyLoadImage } from '@common'

import { LikedContent } from './components'

export const revalidate = 0

const Liked = async () => {
  const songs = await getLikedSongs()

  return (
    <div className='bg-neutral-900 sm:rounded-lg mili:rounded-none w-full overflow-hidden mili:h-full sm:h-[calc(100vh-94px)]'>
      <Header>
        <div className='mt-20'>
          <div className='flex flex-col md:flex-row items-center gap-x-5'>
            <div className='relative h-32 w-32 lg:h-44 lg:w-44'>
              <LazyLoadImage
                alt='liked'
                className='object-cover'
                src={ICONS.liked}
              />
            </div>

            <div className='flex flex-col gap-y-2 mt-4 md:mt-0'>
              <p className='hidden md:block font-semibold lg:text-xl text-sm'>
                Playlist
              </p>
              <h1 className='text-white text-4xl sm:text-5xl lg:text-7xl font-bold'>
                Liked Songs
              </h1>
            </div>
          </div>
        </div>
      </Header>

      <div className='overflow-y-auto'>
        <LikedContent songs={songs} />
      </div>
    </div>
  )
}

export default Liked
