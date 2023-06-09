import type { FC } from 'react'

import { Toaster } from 'react-hot-toast'

const HotToastProvider: FC = () => {
  return <Toaster toastOptions={{ style: { background: '#333', color: '#fff' } }} />
}

export default HotToastProvider
