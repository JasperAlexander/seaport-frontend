import { Dispatch, FC, SetStateAction } from 'react'
import { Box } from '../Box/Box'

interface Props {
    active: boolean
    setActive: Dispatch<SetStateAction<boolean>>
}

export const FormToggle: FC<Props> = ({ 
    active,
    setActive
}) => {
    return (
        <Box
            display='flex'
            flexDirection='column'
            justifyContent='center'
        >
            <Box 
                as='input'
                type='checkbox'
                onChange={() => { return null }}
                onClick={() => setActive(!active)}
                checked={active}
                role='switch'
                display='flex'
                alignItems='center'
                paddingX='6'
                height={{
                    base: '24',
                    after: '14'
                }}
                width={{
                    base: '48',
                    after: '14'
                }}
                cursor='pointer'
                outline='none'
                borderRadius={{
                    base: '100',
                    after: '50p'
                }}
                background={{
                    base: active ? 'accentColor' : 'defaultTextPlaceholder',
                    hover: active ? 'accentColorHover' : 'defaultTextPlaceholderHover',
                    after: 'defaultBackground'
                }}
                transition={{
                    base: 'toggle',
                    after: 'toggle'
                }}
                transform={{
                    after: active ? 'translateX(22px)' : 'translateX(0px)'
                }}
                // @ts-ignore
                content={{ // To do: find out why this type error occurs
                    after: 'empty'
                }}
            />
        </Box>
    )
}