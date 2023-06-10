import type {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters
} from '@tanstack/react-query'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

type Key = string

type UseTanstack = <T>(
  key: Key,
  url: string
) => {
  data: T
  isLoading: boolean
  isError: boolean
  error: unknown
  refetch: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
  ) => Promise<QueryObserverResult<any, unknown>>
}

const useTanstack: UseTanstack = (key, url) => {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: [key],
    queryFn: async () => {
      const { data } = await axios.get(url)
      return data
    }
  })

  return {
    data,
    isLoading,
    isError,
    error,
    refetch
  }
}

export default useTanstack
