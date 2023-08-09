'use client'

import type { FC } from 'react'
import { useEffect, useState } from 'react'

import { AuthModal, UploadModal } from '@/components/modals'

const ModalProvider: FC = () => {
  const [isMounted, setIsMounted] = useState<boolean>(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <>
      <AuthModal />
      <UploadModal />
    </>
  )
}

export default ModalProvider
