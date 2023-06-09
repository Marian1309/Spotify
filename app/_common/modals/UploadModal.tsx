'use client'

import type { FC } from 'react'
import { useState } from 'react'

import { useRouter } from 'next/navigation'

import { useSupabaseClient } from '@supabase/auth-helpers-react'
import type { FieldValues, SubmitHandler } from 'react-hook-form'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import uniqid from 'uniqid'

import { useUser } from '@hooks'
import { useUploadModal } from '@hooks/zustand'

import Button from '../Button'
import Input from '../Input'

import Modal from './Modal'

type DefaultValues = {
  author: string
  title: string
  song: any
  image: any
}

const UploadModal: FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const uploadModal = useUploadModal()
  const { user } = useUser()
  const supabaseClient = useSupabaseClient()
  const { refresh } = useRouter()

  const { register, handleSubmit, reset } = useForm<FieldValues>({
    defaultValues: {
      author: '',
      title: '',
      song: null,
      image: null
    }
  })

  const onChange = (open: boolean) => {
    if (!open) {
      reset()
      uploadModal.onClose()
    }
  }

  const onSubmit: SubmitHandler<FieldValues | DefaultValues> = async (values) => {
    try {
      setIsLoading(true)

      const imageFile = values.image[0]
      const songFile = values.song[0]

      if (!imageFile || !songFile || !user) {
        return toast.error('Missing fields')
      }

      const uniqueId = uniqid()

      const { data: songData, error: songError } = await supabaseClient.storage
        .from('songs')
        .upload(`song-${values.title}-${uniqueId}`, songFile, {
          cacheControl: '3600',
          upsert: false
        })

      if (songError) {
        setIsLoading(false)
        return toast.error('Failed song upload')
      }

      const { data: imageData, error: imageError } = await supabaseClient.storage
        .from('images')
        .upload(`image-${values.title}-${uniqueId}`, imageFile, {
          cacheControl: '3600',
          upsert: false
        })

      if (imageError) {
        setIsLoading(false)
        return toast.error('Failed image upload')
      }

      const { error: supabaseError } = await supabaseClient.from('songs').insert({
        user_id: user.id,
        title: values.title,
        author: values.author,
        image_path: imageData.path,
        song_path: songData.path
      })

      if (supabaseError) {
        return toast.error(supabaseError.message)
      }

      refresh()
      toast.success('Song created!')
      reset()
      uploadModal.onClose()
    } catch (err: unknown) {
      toast.error('Something went wrong')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Modal
      description='Upload an mp3 file'
      isOpen={uploadModal.isOpen}
      onChange={onChange}
      title='Add a song'
    >
      <form className='flex flex-col gap-y-4' onSubmit={handleSubmit(onSubmit)}>
        <Input
          disabled={isLoading}
          id='title'
          {...register('title', { required: true })}
          placeholder='Song title'
        />
        <Input
          disabled={isLoading}
          id='author'
          {...register('author', { required: true })}
          placeholder='Song author'
        />

        <div>
          <div className='pb-1'>Select a song name</div>

          <Input
            accept='.mp3'
            disabled={isLoading}
            id='song'
            type='file'
            {...register('song', { required: true })}
            placeholder='Song author'
          />
        </div>

        <div>
          <div className='pb-1'>Select an image</div>

          <Input
            accept='image/*'
            disabled={isLoading}
            id='image'
            type='file'
            {...register('image', { required: true })}
            placeholder='Song author'
          />
        </div>

        <Button disabled={isLoading} type='submit'>
          Create
        </Button>
      </form>
    </Modal>
  )
}

export default UploadModal
