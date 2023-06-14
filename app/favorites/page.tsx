'use client'

import { useEffect } from 'react'

import { useSessionContext } from '@supabase/auth-helpers-react'
import { useQuery, useQueryClient } from '@tanstack/react-query'

import type { Song } from '@types'

import { ICONS } from '@utils/constants'

import { Header, LazyLoadImage } from '@common'

import { LikedContent } from './components'

const Liked = () => {
  const queryClient = useQueryClient()
  const { supabaseClient } = useSessionContext()
  const { data: songs } = useQuery({
    queryKey: ['liked'],
    queryFn: async () => {
      const {
        data: { session }
      } = await supabaseClient.auth.getSession()

      const { data, error } = await supabaseClient
        .from('liked_songs')
        .select('*, songs(*)')
        .eq('user_id', session?.user.id)
        .order('created_at', { ascending: false })

      if (error) {
        return []
      }

      if (!data) {
        return []
      }

      return data.map((song) => ({
        ...song.songs
      }))
    }
  })

  useEffect(() => {
    queryClient.invalidateQueries(['liked'])
  }, [songs?.length])

  return (
    <div
      className='bg-neutral-900 md:rounded-lg mili:rounded-none w-full overflow-hidden
      mili:h-[calc(100vh-80px)] md:h-[calc(100vh-94px)] mili:last:mb-[80px] md:last:mb-0'
    >
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
        <LikedContent songs={songs as Song[]} />
      </div>
    </div>
  )
}

export default Liked
