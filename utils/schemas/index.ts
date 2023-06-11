import { z } from 'zod'

const songUploadSchema = z.object({
  author: z.string().min(3, { message: 'Author must have at least 3 characters' }),
  title: z.string().min(3, { message: 'Title must have at least 3 characters' }),
  song: z.any().refine((files) => files?.length == 1, 'File is required.'),
  image: z.any().refine((files) => files?.length == 1, 'File is required.')
})

export { songUploadSchema }
