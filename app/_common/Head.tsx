import type { FC } from 'react'

import NextHead from 'next/head'

interface HeadProps {
  title: string
  favicon?: string
  description?: string
}

const Head: FC<HeadProps> = ({ title, favicon, description }) => {
  return (
    <NextHead>
      <title>{title}</title>
      <link href={favicon} rel='shortcut icon' />
      <meta content={description} name='description' />
    </NextHead>
  )
}

export default Head
