'use client'

import type { FC } from 'react'
import { useEffect, useState } from 'react'

import { useRouter } from 'next/navigation'

import { Input } from '@common'
import qs from 'query-string'

import { useDebounce } from '@hooks'

const SearchInput: FC = () => {
  const router = useRouter()
  const [value, setValue] = useState<string>('')
  const debouncedValue = useDebounce<string>(value, 500)

  useEffect(() => {
    const query = { title: debouncedValue }

    const url = qs.stringifyUrl({
      url: '/search',
      query
    })

    router.push(url)
  }, [debouncedValue, router])

  return (
    <Input
      onChange={(e) => setValue(e.target.value)}
      placeholder='What do you want to listen to?'
      value={value}
    />
  )
}

export default SearchInput
