'use client'

import type { FC } from 'react'
import { useState } from 'react'

import { useRouter } from 'next/navigation'

import { LazyLoadImage } from '@common'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import type { SubmitHandler } from 'react-hook-form'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import uniqid from 'uniqid'

import type { UploadSchema } from '@types'

import { getPath } from '@utils/helpers'
import { songSchema } from '@utils/schemas'

import { useUser } from '@hooks'
import { useUploadModal, useUploadPreview } from '@hooks/zustand'

import Button from '../Button'
import Input from '../Input'

import Modal from './Modal'

const UploadModal: FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { refresh } = useRouter()
  const supabaseClient = useSupabaseClient()

  const uploadModal = useUploadModal()
  const { previewImage, previewAudio, setPreviewImage, setPreviewAudio } =
    useUploadPreview()
  const { user } = useUser()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<UploadSchema>({
    defaultValues: {
      author: '',
      title: '',
      song: null,
      image: null
    },
    resolver: zodResolver(songSchema)
  })

  const onChange = (open: boolean) => {
    if (!open) {
      reset()
      uploadModal.onClose()
    }
  }

  const onSubmit: SubmitHandler<UploadSchema> = async (values) => {
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
      description=''
      isOpen={uploadModal.isOpen}
      onChange={onChange}
      title='Add a song'
    >
      <form className='flex flex-col gap-y-4' onSubmit={handleSubmit(onSubmit)}>
        <Input
          disabled={isLoading}
          id='title'
          {...register('title')}
          placeholder='Song title'
        />
        {errors.title && (
          <p className='text-md italic text-red-500'>
            {errors?.title?.message as string}
          </p>
        )}

        <Input
          disabled={isLoading}
          id='author'
          {...register('author')}
          placeholder='Song author'
        />
        {errors.author && (
          <p className='text-md italic text-red-500'>
            {errors?.author?.message as string}
          </p>
        )}

        <div>
          <div className='text-lg pb-1'>Select a song</div>

          <Input
            accept='.mp3'
            disabled={isLoading}
            id='song'
            type='file'
            {...register('song')}
            onChange={(e) => setPreviewAudio(getPath(e))}
            placeholder='Song author'
          />
          {errors.song && (
            <p className='text-md italic text-red-500 mt-2'>
              {errors?.song?.message as string}
            </p>
          )}
        </div>

        {previewAudio && (
          <>
            <h3>Song preview</h3>
            <audio className='w-full' controls>
              <source src={previewAudio} type='audio/mp3' />
            </audio>
          </>
        )}

        <div>
          <div className='pb-1 text-lg'>Select a square photo (example: 200x200)</div>

          <Input
            accept='image/*'
            disabled={isLoading}
            id='image'
            type='file'
            {...register('image')}
            onChange={(e) => setPreviewImage(getPath(e))}
            placeholder='Song author'
          />
          {errors.image && (
            <p className='text-md italic text-red-500 mt-2'>
              {errors?.image?.message as string}
            </p>
          )}
        </div>

        {previewImage && (
          <>
            <h3>Image preview</h3>
            <LazyLoadImage alt='preview' src={previewImage} />
          </>
        )}

        <Button disabled={isLoading} type='submit'>
          Create
        </Button>
      </form>
    </Modal>
  )
}

export default UploadModal
