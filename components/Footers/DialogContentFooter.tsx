import { FC, ReactNode } from 'react'
import { Box } from '../Box/Box'
import * as styles from './DialogContentFooter.css'

interface Props {
    children: ReactNode
}

/**
 * DialogContentFooter component
 * @param children will be wrapped inside flex component
 * with row direction, padding of 24 and gap of 12
 */
export const DialogContentFooter: FC<Props> = ({
    children
}) => {
  return (
        <Box 
            as='footer' 
            className={styles.dialogContentFooter}
        >
            <Box
                className={styles.dialogContentFooterContent}
            >
                {children}
            </Box>
        </Box>
  )
}