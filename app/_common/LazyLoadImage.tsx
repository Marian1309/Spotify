'use client'

import type { FC, HTMLAttributes } from 'react'

import clsx from 'clsx'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'

interface LazyLoadImageProps extends HTMLAttributes<HTMLImageElement> {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
}

const LazyLoadImg: FC<LazyLoadImageProps> = (
  { src, className, alt, width, height },
  props
) => {
  return (
    <LazyLoadImage
      alt={alt}
      className={clsx('bg-center', className)}
      effect='blur'
      height={height}
      src={src}
      width={width}
      {...props}
    />
  )
}

export default LazyLoadImg
