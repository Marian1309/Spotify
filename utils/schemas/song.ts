import { z } from 'zod'

const songSchema = z.object({
  author: z.string().min(3, { message: 'Author must be at least 3 characters' }),
  title: z.string().min(6, { message: 'Tilte must be at least 6 characters' }),
  song: z.instanceof(File, { message: 'Choose your song' }),
  image: z.instanceof(File, { message: 'Every song must have an image' })
})

export default songSchema
