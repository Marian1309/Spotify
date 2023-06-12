import { getSongsByTitle } from '@actions'

import { Header } from '@common'

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
    <div className='bg-neutral-900 rounded-lg w-full overflow-y-auto overflow-hidden h-[calc(100vh-94px)]'>
      <Header className='from-bg-neutral-900'>
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
8
