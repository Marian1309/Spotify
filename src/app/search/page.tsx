import { getSongsByTitle } from '@/actions'

import { Header } from '@/components/common'

import { SearchContent, SearchInput } from './components'

interface SearchProps {
  searchParams: {
    title: string
  }
}

export const revalidate = 0

const Search = async ({ searchParams }: SearchProps) => {
  const songs = await getSongsByTitle(searchParams.title)

  return (
    <div
      className='bg-neutral-900 md:rounded-lg mili:rounded-none w-full overflow-y-auto
      overflow-hidden mili:h-[calc(100vh-80px)] md:h-[calc(100vh-94px)] mili:last:mb-[80px] md:last:mb-0'
    >
      <Header>
        <div className='mb-2 flex flex-col gap-y-6'>
          <h1 className='text-white text-3xl font-semibold'>Search</h1>

          <SearchInput />
        </div>
      </Header>

      <SearchContent songs={songs} />
    </div>
  )
}

export default Search
