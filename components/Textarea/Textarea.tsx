import { FC, FocusEventHandler, FormEventHandler } from 'react'
import { Box } from '../Box/Box'

interface Props {
  name: string
  id?: string
  placeholder?: string
  rows?: number
  resize?: 'vertical' | 'none' | 'both'
  required?: boolean
  value: string | number | readonly string[] | undefined
  onChange: FormEventHandler<HTMLElement> | undefined
  onBlur?: FocusEventHandler<HTMLElement> | undefined
}

export const Textarea: FC<Props> = ({
  name,
  id,
  placeholder,
  rows,
  resize,
  required,
  value,
  onChange,
  onBlur
}) => {
  return (
    <Box 
      as='textarea'
      name={name}
      id={id ? id : name}
      
      rows={rows}
      style={{resize: resize}}
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

      height='auto'
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