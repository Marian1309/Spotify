'use client'

import type { ChangeEvent, FC } from 'react'
import { useState } from 'react'

import { useRouter } from 'next/navigation'

import { zodResolver } from '@hookform/resolvers/zod'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import type { SubmitHandler } from 'react-hook-form'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import uniqid from 'uniqid'

import type { SongUploadSchema } from '@types'

import { getImageDimensions, getPath } from '@utils/helpers'
import { songUploadSchema } from '@utils/schemas'

import { useUser } from '@hooks'
import { useUploadModal, useUploadPreview } from '@hooks/zustand'

import { Button, Input, LazyLoadImage } from '@common'
import { Modal } from '@common/radix-ui'

type ChangeFn = (e: ChangeEvent<HTMLInputElement>) => void

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
    formState: { errors },
    resetField
  } = useForm<SongUploadSchema>({
    defaultValues: {
      author: '',
      title: '',
      song: null,
      image: null
    },
    resolver: zodResolver(songUploadSchema)
  })

  const onModalChange = (open: boolean) => {
    if (!open) {
      reset()
      setPreviewAudio('')
      setPreviewImage('')
      uploadModal.onClose()
    }
  }

  const onSubmit: SubmitHandler<SongUploadSchema> = async (values) => {
    try {
      setIsLoading(true)

      const imageFile = values.image[0] as File
      const songFile = values.song[0] as File

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

      const { data: imageData, error: imageError } =
        await supabaseClient.storage
          .from('images')
          .upload(`image-${values.title}-${uniqueId}`, imageFile, {
            cacheControl: '3600',
            upsert: false
          })

      if (imageError) {
        setIsLoading(false)
        return toast.error('Failed image upload')
      }

      const { error: supabaseError } = await supabaseClient
        .from('songs')
        .insert({
          user_id: user.id,
          title: values.title,
          author: values.author,
          image_path: imageData.path,
          song_path: songData.path
        })

      if (supabaseError) {
        return toast.error(supabaseError.message)
      }

      toast.success('Song uploaded!')
      reset()
      setPreviewAudio('')
      setPreviewImage('')
      uploadModal.onClose()
      refresh()
    } catch (err: any) {
      console.log(err.message)
      toast.error('Something went wrong')
    } finally {
      refresh()
      setIsLoading(false)
    }
  }

  const onSongChange: ChangeFn = (e) => {
    setPreviewAudio('')
    setTimeout(() => {
      const file = e.target.files?.[0] as File
      setPreviewAudio(getPath(file))
    }, 0)
  }

  const onImageChange: ChangeFn = (e) => {
    const file = e.target.files?.[0] as File

    getImageDimensions(
      file,
      (err: Error, dimensions: { width: number; height: number }) => {
        if (err) {
          return toast.error(err.message)
        }

        if (dimensions.width !== dimensions.height) {
          resetField('image')
          return toast.error('You must to upload a square image')
        } else {
          setPreviewImage(getPath(file))
        }
      }
    )
  }

  return (
    <Modal
      description=''
      isOpen={uploadModal.isOpen}
      onChange={onModalChange}
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
          <div className='mili:text-lg atom:text-sm sm:pb-1 atom:pb-4'>
            Select a song
          </div>

          <Input
            accept='.mp3'
            disabled={isLoading}
            id='song'
            type='file'
            {...register('song')}
            onChange={onSongChange}
            placeholder='Song'
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
          <div className='mili:text-lg atom:text-sm sm:pb-1 atom:pb-4'>
            Select a square photo (example: 200x200)
          </div>

          <Input
            accept='image/*'
            disabled={isLoading}
            id='image'
            type='file'
            {...register('image')}
            onChange={onImageChange}
            placeholder='Song image'
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
            <LazyLoadImage
              alt='preview'
              className='atom:h-[100px] atom:w-[100px] mili:h-[200px] mili:w-[200px]'
              src={previewImage}
            />
          </>
        )}

        <Button className='mt-2' disabled={isLoading} type='submit'>
          Create
        </Button>
      </form>
    </Modal>
  )
}

export default UploadModal
