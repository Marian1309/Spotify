import type { FC, ReactNode } from 'react'

import { twMerge } from 'tailwind-merge'

interface BoxProps {
  children: ReactNode
  className?: string
}

const Box: FC<BoxProps> = ({ children, className }) => {
  return (
    <div className={twMerge('w-full rounded-lg bg-neutral-900', className)}>
      {children}
    </div>
  )
}

export default Box
