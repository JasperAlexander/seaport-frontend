import React from 'react'
import { touchableStyles } from '../../styles/touchableStyles'
import { isMobile } from '../../utils/isMobile'
import { Box } from '../Box/Box'
import { ArrowDown } from '../Icons/ArrowDown'

export const Input = ({
  'aria-label': ariaLabel = 'Input',
  className,
  min,
  name,
  onChange,
  options,
  type,
  value,
}: {
  'aria-label'?: string
  'className'?: (string | undefined)[]
  'min'?: string
  'name': string
  'onChange': (e: React.ChangeEvent<HTMLInputElement>) => void
  'options'?: string[]
  'type': string
  'value': string
}) => {
  if(type !== 'select') {
    return (
      <Box
        alignItems='center'
        aria-label={ariaLabel}
        as='input'
        background='defaultBackground' // Transparent??
        borderColor='defaultBackgroundBorder'
        borderRadius='10'
        borderStyle='solid'
        borderWidth='2'
        className={className}
        color='black'
        display='flex'
        // height={mobile ? '30' : '28'}
        justifyContent='center'
        min={min}
        name={name}
        onChange={onChange}
        padding='10'
        style={{ willChange: 'transform' }}
        transition='default'
        type={type}
        value={value}
        // width={mobile ? '30' : '28'}
      />
    )
  } else {
    return(
      <Box display='flex' alignItems='center'>
      <Box
          alignItems='center'
          aria-label={ariaLabel}
          as='select'
          background='defaultBackground' // Transparent??
          borderColor='defaultBackgroundBorder'
          borderRadius='10'
          borderStyle='solid'
          borderWidth='2'
          className={className}
          color='black'
          display='flex'
          // height={mobile ? '30' : '28'}
          justifyContent='center'
          min={min}
          name={name}
          onChange={onChange}
          padding='10'
          paddingRight='40'
          style={{ willChange: 'transform' }}
          transition='default'
          type={type}
          value={value}
          // width={mobile ? '30' : '28'}
        >
          <Box 
            as='option' 
            disabled={true} 
            selected={true} 
            value=''
          >
            Sort by
          </Box>
          {options 
            ? options.length > 0 
              ?
                options.map((option) => (
                  <Box as='option'>{option}</Box>
                ))
              : ''
            : ''
          }
        </Box>
        <ArrowDown />
        </Box>
    )
  }
}