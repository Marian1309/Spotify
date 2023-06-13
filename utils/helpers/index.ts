import type { User } from '@supabase/auth-helpers-nextjs'
import { toast } from 'react-hot-toast'

const getPath = (file: File) => {
  const path = URL.createObjectURL(file)
  return path
}

const getImageDimensions = (file: File, callback: Function) => {
  const img = new Image()

  img.onload = () => {
    const width = img.width
    const height = img.height
    callback(null, { width, height })
  }

  img.onerror = () => {
    callback(new Error('Не вдалося завантажити зображення.'))
  }

  img.src = URL.createObjectURL(file)
}

export const checkUser = (user: User | null, fn: () => void) => {
  if (user) {
    fn()
  } else {
    toast.error('Please login in order to listen to music')
  }
}

export { getPath, getImageDimensions }
