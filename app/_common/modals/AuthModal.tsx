'use client'

import type { FC } from 'react'
import { useEffect } from 'react'

import { useRouter } from 'next/navigation'

import { useSessionContext, useSupabaseClient } from '@supabase/auth-helpers-react'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { toast } from 'react-hot-toast'

import { useAuthModal } from '@hooks/zustand'

import Modal from './Modal'

const AuthModal: FC = () => {
  const supabaseClient = useSupabaseClient()
  const { session } = useSessionContext()
  const router = useRouter()
  const { isOpen, onClose } = useAuthModal()

  useEffect(() => {
    if (session) {
      onClose()
    }
  }, [session, router, onClose])

  const onChange = (open: boolean) => {
    if (!open) {
      onClose()
    }

    if (session) {
      toast.success('You are logged in 🔥')
    }
  }

  return (
    <Modal
      description='Login to your account'
      isOpen={isOpen}
      onChange={onChange}
      title='Welcome Back'
    >
      <Auth
        appearance={{
          theme: ThemeSupa,
          variables: {
            default: {
              colors: {
                brand: '#404040',
                brandAccent: '#22c55e'
              }
            }
          }
        }}
        magicLink
        providers={['github', 'google']}
        supabaseClient={supabaseClient}
        theme='dark'
        view='sign_in'
      />
    </Modal>
  )
}

export default AuthModal
