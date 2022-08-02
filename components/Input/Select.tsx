import React from 'react'
import { sprinkles } from '../../styles/sprinkles.css'
import { Box } from '../Box/Box'
import { ArrowDown } from '../Icons/ArrowDown'

interface Props {
  ariaLabel?: string
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

export const Select: React.FC<Props> = ({
  ariaLabel = 'Input',
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
                color='black'
                className={sprinkles({
                    borderColor: {
                        focus: 'defaultTextPlaceholder'
                    }
                })}
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
}