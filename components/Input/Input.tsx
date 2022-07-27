import React from 'react'
import { sprinkles } from '../../styles/sprinkles.css'
import { Box } from '../Box/Box'
import { ArrowDown } from '../Icons/ArrowDown'

export const Input = ({
  'aria-label': ariaLabel = 'Input',
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
}: {
  'aria-label'?: string
  'className'?: (string | undefined)[]
  'checked'?: boolean
  'min'?: string
  'placeholder'?: string
  'name': string
  'onChange'?: (e: React.ChangeEvent<HTMLInputElement>) => void
  'onClick'?: React.MouseEventHandler<HTMLInputElement>
  'options'?: string[]
  'type': string
  'value'?: string
}) => {
  if(type === 'select') {
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
                  <Box 
                    as='option'
                    key={option}
                  >
                      {option}
                  </Box>
                ))
              : ''
            : ''
          }
        </Box>
        <ArrowDown />
        </Box>
    )
  } else if(type === 'checkbox') {
    return (
      <Box
        alignItems='center'
        aria-label={ariaLabel}
        as='input'
        type='checkbox'
        background='defaultBackground' // Transparent??
        borderColor='box'
        borderRadius='6'
        borderStyle='solid'
        borderWidth='2'
        width='24'
        height='24'
        className={sprinkles({
          color: {
            placeholder: 'defaultTextPlaceholder'
          },
          borderColor: {
            focus: 'defaultTextPlaceholder'
          }
        })}
        checked={checked}
        color='defaultText'
        display='flex'
        justifyContent='center'
        name={name}
        onClick={onClick}
        onChange={onChange}
        padding='10'
        style={{ willChange: 'transform' }}
        transition='inputBorderColor'
        // value={value}
      />
    )
  } else {
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
}