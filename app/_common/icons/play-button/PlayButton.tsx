import type { FC } from 'react'

import { FaPlay } from 'react-icons/fa'

import styles from './PlayButton.module.scss'

const PlayButton: FC = () => {
  return (
    <button className={styles.container}>
      <FaPlay className='text-black' />
    </button>
  )
}

export default PlayButton
