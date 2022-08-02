import React from 'react'
import { sprinkles } from '../../styles/sprinkles.css'
import { Box } from '../Box/Box'

interface Props {
  ariaLabel?: string
  className?: (string | undefined)[]
  checked?: boolean
  min?: string
  placeholder?: string
  name: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  onClick?: React.MouseEventHandler<HTMLInputElement>
  options?: string[]
  type: string
  value?: string
}

export const Input: React.FC<Props> = ({
  ariaLabel = 'Input',
  className,
  checked,
  min,
  placeholder,
  name,
  onChange,
  onClick,
  options,
  type,
  value,
}) => {
  return (
    <Box
      alignItems='center'
      aria-label={ariaLabel}
      as='input'
      background='defaultBackground' // Transparent??
      borderColor='box'
      borderRadius='10'
      borderStyle='solid'
      borderWidth='2'
      className={sprinkles({
        color: {
          placeholder: 'defaultTextPlaceholder'
        },
        borderColor: {
          focus: 'defaultTextPlaceholder'
        }
      })}
      color='defaultText'
      display='flex'
      // height={mobile ? '30' : '28'}
      justifyContent='center'
      min={min}
      name={name}
      onChange={onChange}
      padding='10'
      style={{ willChange: 'transform' }}
      placeholder={placeholder}
      transition='inputBorderColor'
      type={type}
      value={value}
      // width={mobile ? '30' : '28'}
    />
  )
}