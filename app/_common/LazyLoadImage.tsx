import type { FC, HTMLAttributes } from 'react'

import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'

interface LazyLoadImageProps extends HTMLAttributes<HTMLImageElement> {
  src: string
  className?: string
}

const LazyLoadImg: FC<LazyLoadImageProps> = ({ src, className }, props) => {
  return <LazyLoadImage alt='' className={className} effect='blur' src={src} {...props} />
}

export default LazyLoadImg
