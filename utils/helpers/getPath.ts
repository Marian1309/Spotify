import type { ChangeEvent } from 'react'

const getPath = (e: ChangeEvent<HTMLInputElement>) => {
  const path = URL.createObjectURL(e.target.files?.[0] as any)
  return path
}

export default getPath
