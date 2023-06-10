'use client'

import type { NextPage } from 'next'

import { useSessionContext } from '@supabase/auth-helpers-react'
import { useQuery } from '@tanstack/react-query'

import type { Song } from '@types'

import { getSongsByTitle } from '@actions'

import { Header } from '@common'

import { SearchContent, SearchInput } from './components'

interface SearchProps {
  searchParams: {
    title: string
  }
}

const Search: NextPage<SearchProps> = ({ searchParams }) => {
  const { supabaseClient } = useSessionContext()
  const { data: songs } = useQuery({
    queryKey: ['search'],
    queryFn: async () => await getSongsByTitle(supabaseClient, searchParams.title)
  })

  return (
    <div className='bg-neutral-900 rounded-lg w-full h-full overflow-hidden overflow-y-auto'>
      <Header className='from-bg-neutral-900'>
        <div className='mb-2 flex flex-col gap-y-6'>
          <h1 className='text-white text-3xl font-semibold'>Search</h1>

          <SearchInput />
        </div>
      </Header>

      <SearchContent songs={songs as Song[]} />
    </div>
  )
}

export default Search
