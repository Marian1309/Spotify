'use client'

import type { FC } from 'react'
import { useEffect } from 'react'

import { useRouter } from 'next/navigation'

import { useSessionContext } from '@supabase/auth-helpers-react'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'

import { useAuthModal } from '@hooks/zustand'

import { Modal } from '@common/radix-ui'

const AuthModal: FC = () => {
  const router = useRouter()
  const { session, supabaseClient } = useSessionContext()
  const { isOpen, onClose } = useAuthModal()

  useEffect(() => {
    if (session) {
      router.refresh()
      onClose()
    }
  }, [session, router, onClose])

  const onChange = (open: boolean) => {
    if (!open) {
      onClose()
    }
  }

  return (
    <div className='sm:grid sm:place-items-center'>
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
          socialLayout='vertical'
          supabaseClient={supabaseClient}
          theme='dark'
          view='sign_in'
        />
      </Modal>
    </div>
  )
}

export default AuthModal
