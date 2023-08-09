'use client'

import type { FC } from 'react'

import * as RadixSlider from '@radix-ui/react-slider'

interface SliderProps {
  value?: number
  onChange?: (value: number) => void
}

const Slider: FC<SliderProps> = ({ value = 1, onChange }) => {
  const handleChange = (newValue: number[]) => {
    onChange?.(newValue[0])
  }

  return (
    <RadixSlider.Root
      aria-label='Volume'
      className='relative flex items-center select-none touch-none w-full h-10'
      defaultValue={[0.5]}
      max={1}
      onValueChange={handleChange}
      step={0.1}
      value={[value]}
    >
      <RadixSlider.Track className='bg-neutral-600 relative grow rounded-full h-[3px]'>
        <RadixSlider.Range className='absolute bg-white rounded-full h-full' />
      </RadixSlider.Track>
    </RadixSlider.Root>
  )
}

export default Slider
