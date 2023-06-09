import type { FC, ReactNode } from 'react'

import clsx from 'clsx'

interface BoxProps {
  children: ReactNode
  className?: string
}

const Box: FC<BoxProps> = ({ children, className }) => {
  return (
    <div className={clsx('w-full rounded-lg bg-neutral-900', className)}>{children}</div>
  )
}

export default Box
