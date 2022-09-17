import { FC, ReactNode } from 'react'
import { Box } from '../../Box/Box'
import * as styles from './RoundButton.css'

interface Props {
    children: ReactNode
    onClick?: () => void
    disabled?: boolean
}

/**
 * Round button component, has a default padding of 12px, 
 * boxShadow and background will change on hover
 * @param children will be wrapped inside HTML button element
 * @param onClick defaults null
 * @param disabled defaults to false
 */
export const RoundButton: FC<Props> = ({ 
    children,
    onClick = () => { return null },
    disabled = false
}) => {
    return (
        <Box
            as='button'
            type='button'
            onClick={onClick}
            disabled={disabled}
            className={styles.roundButton}
        >
            {children}
        </Box>
    )
}