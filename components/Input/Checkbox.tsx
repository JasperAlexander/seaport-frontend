import { sprinkles } from '../../styles/sprinkles.css'
import { Box } from '../Box/Box'

interface Props {
    ariaLabel?: string,
    checked: boolean,
    name: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const Checkbox: React.FC<Props> = ({
    ariaLabel = 'Checkbox',
    checked,
    name,
    onChange,
}) => {
    return (
        <Box
            alignItems='center'
            aria-label={ariaLabel}
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
            transition='inputBorderColor'
            overflow='hidden'
        >
            <input 
                type='checkbox'
                name={name}
                checked={checked}
                onChange={onChange}
                style={{
                    opacity: checked ? '1' : '0',
                    width: '100%',
                    height: '100%',
                    margin: '0px',
                    cursor: 'pointer'
                }}
            />
        </Box>
    )
}