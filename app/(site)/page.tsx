import { ICONS } from '@utils/constants'

import { getSongs } from '@actions'

import { Header } from '@common'

import { ListItem, PageContent } from './components'

export const revalidate = 0

const Home = async () => {
  const songs = await getSongs()

  return (
    <div
      className='w-full overflow-hidden overflow-y-auto bg-neutral-900
      text-neutral-900 sm:h-[calc(100vh-94px)] mili:h-full mili:rounded-none sm:rounded-lg'
    >
      <Header>
        <div className='mb-2 overflow-y-hidden'>
          <h1 className='text-3xl font-semibold text-white'>Welcome Back</h1>

          <div className='mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4'>
            <ListItem href='/favorites' image={ICONS.liked} name='Liked songs' />
          </div>
        </div>
      </Header>

      <div className='mb-7 mt-2 px-6'>
        <h1 className='text-2xl font-semibold text-white'>Newest songs</h1>

        <PageContent songs={songs} />
      </div>
    </div>
  )
}

export default Home
