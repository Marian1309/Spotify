'use client'

import type { FC } from 'react'
import { useEffect, useState } from 'react'

import { useRouter } from 'next/navigation'

import { useSessionContext } from '@supabase/auth-helpers-react'
import { toast } from 'react-hot-toast'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'

import { useUser } from '@hooks'
import { useAuthModal } from '@hooks/zustand'

interface LikeButtonProps {
  songId: string
}

const LikeButton: FC<LikeButtonProps> = ({ songId }) => {
  const [isLiked, setIsLiked] = useState<boolean>(false)
  const { refresh } = useRouter()
  const { supabaseClient } = useSessionContext()

  const authModal = useAuthModal()
  const { user } = useUser()

  let toastId: string

  useEffect(() => {
    if (!user?.id) {
      return
    }

    const fetchData = async () => {
      const { data, error } = await supabaseClient
        .from('liked_songs')
        .select('*')
        .eq('user_id', user.id)
        .eq('song_id', songId)
        .maybeSingle()

      if (!error && data) {
        setIsLiked(true)
      }
    }

    fetchData()
  }, [songId, supabaseClient, user?.id])

  const Icon = isLiked ? AiFillHeart : AiOutlineHeart

  const handleClick = async () => {
    if (!user) {
      toast.error('You are not signed in')
      return authModal.onOpen()
    }

    if (isLiked) {
      const { error } = await supabaseClient
        .from('liked_songs')
        .delete()
        .eq('user_id', user.id)
        .eq('song_id', songId)

      if (error) {
        toast.error(error.message)
      } else {
        setIsLiked(false)
        toast.remove(toastId)
      }
    } else {
      const { error } = await supabaseClient
        .from('liked_songs')
        .insert({ song_id: songId, user_id: user.id })

      if (error) {
        toast.error(error.message)
      } else {
        setIsLiked(true)
        toastId = toast.success('Liked!')
      }
    }

    refresh()
  }

  return (
    <button
      className='transition-opacity hover:opacity-75'
      onClick={handleClick}
    >
      <Icon color={isLiked ? '#22c55e' : 'white'} size={25} />
    </button>
  )
}

export default LikeButton
