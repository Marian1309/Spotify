import { Header, ListItem } from '@common'

import { ICONS } from '@utils/constants'

import { getSongs } from '../../actions'

import { PageContent } from './components'

const Home = async () => {
  const songs = await getSongs()

  return (
    <div className='text-neutral-900 rounded-lg h-full w-full overflow-hidden overflow-y-auto'>
      <Header>
        <div className='mb-2'>
          <h1 className='text-white text-3xl font-semibold'>Welcome Back</h1>

          <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3 mt-4'>
            <ListItem href='liked' image={ICONS.liked} name='Liked songs' />
          </div>
        </div>
      </Header>

      <div className='mt-2 mb-7 px-6'>
        <div className='flex-between'>
          <h1 className='text-white text-2xl font-semibold'>Newest songs</h1>
        </div>

        <PageContent songs={songs} />
      </div>
    </div>
  )
}

export default Home
