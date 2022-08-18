import { FC, FocusEventHandler, FormEventHandler } from 'react'
import { Box } from '../Box/Box'

interface Props {
  type: 'text' | 'number' | 'url'
  name: string
  id?: string
  placeholder?: string
  min?: number
  max?: number
  required?: boolean
  value: string | number | readonly string[] | undefined
  onChange: FormEventHandler<HTMLElement> | undefined
  onBlur?: FocusEventHandler<HTMLElement> | undefined
}

export const Input: FC<Props> = ({
  type,
  name,
  id,
  placeholder,
  min,
  max,
  required,
  value,
  onChange,
  onBlur
}) => {
  return (
    <Box 
      as='input'
      type={type}
      name={name}
      id={id ? id : name}
      
      min={min}
      max={max}
      required={required}

      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onBlur={onBlur}

      spellCheck={false}
      autoCapitalize='none'
      autoComplete='none'
      autoCorrect='off'

      display='flex'
      alignItems='center'

      height='48'
      width='full'

      fontSize='16'
      color={{
        placeholder: 'defaultTextPlaceholder'
      }}

      padding='12'

      outline='none'
      borderWidth='2'
      borderStyle='solid'
      borderRadius='10'
      borderColor={{
        base: 'box',
        focus: 'buttonBorderHover'
      }}
      transition='inputBorderColor'
      boxShadow={{
        hover: 'inputHover'
      }}

      background='transparent'
      opacity={{
        disabled: 'disabled'
      }}
      cursor={{
        disabled: 'default'
      }}
    />
  )
}