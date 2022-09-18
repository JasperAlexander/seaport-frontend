import { Dispatch, FC, SetStateAction } from 'react'
import { Box } from '../Box/Box'
import * as styles from './Toggle.css'

interface Props {
    active: boolean
    setActive: Dispatch<SetStateAction<boolean>>
}

export const Toggle: FC<Props> = ({ 
    active,
    setActive
}) => {
    return (
        <Box
            className={styles.toggleContainer}
        >
            <Box 
                as='input'
                type='checkbox'
                onChange={() => { return null }}
                onClick={() => setActive(!active)}
                checked={active}
                role='switch'
                
                className={styles.toggleCheckbox}
                background={{
                    base: active ? 'accentColor' : 'defaultTextPlaceholder',
                    hover: active ? 'accentColorHover' : 'defaultTextPlaceholderHover',
                    after: 'defaultBackground'
                }}
                transform={{
                    after: active ? 'translateX(22px)' : 'translateX(0px)'
                }}
            />
        </Box>
    )
}