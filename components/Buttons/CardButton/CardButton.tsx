import { FC, ReactNode } from 'react'
import { Box } from '../../Box/Box'
import * as styles from './CardButton.css'

interface Props {
    children: ReactNode
    onClick: () => void
    href?: string
    disabled?: boolean
}

export const CardButton: FC<Props> = ({ 
    children,
    onClick,
    href,
    disabled = false
}) => {
    return (
        <Box
            id='assetCardButton'
            className={styles.cardButtonContainer}
        >
            {/* To do: check if Box below is necessary */}
            <Box
                fontWeight='500'
                fontSize='15'
            >
                <Box
                    as='button'
                    type='button'
                    onClick={onClick}
                    disabled={disabled}
                    className={styles.cardButton}
                >
                    {children}
                </Box>
            </Box>
        </Box>
    )
}