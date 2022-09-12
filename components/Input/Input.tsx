import { FC, FocusEventHandler, FormEventHandler, forwardRef, Ref } from 'react'
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

/**
 * Box component as input
 * @param type 
 * @param name 
 * @param id 
 * @param placeholder 
 * @param min
 * @param max
 * @param required
 * @param value
 * @param onChange
 * @param onBlur
 * @param ref will be passed to Box component
 */
export const Input = forwardRef(
  (
    {
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
    }: Props,
    ref: Ref<HTMLElement>
  ) => {
    return (
      <Box 
        as='input'
        type={type}
        name={name}
        id={id ? id : name}
        ref={ref}
        
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
        // borderWidth='2'
        borderTopWidth={{
          firstchild: '2'
        }}
        borderRightWidth='2'
        borderBottomWidth='2'
        borderLeftWidth='2'
        borderStyle='solid'
        // borderRadius='10'
        borderTopLeftRadius={{
          firstchild: '10'
        }}
        borderTopRightRadius={{
          firstchild: '10'
        }}
        borderBottomLeftRadius={{
          lastbutton: '10'
        }}
        borderBottomRightRadius={{
          lastbutton: '10'
        }}
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
)