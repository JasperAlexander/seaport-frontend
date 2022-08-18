import { FC } from 'react'
import { Box } from '../Box/Box'
import * as styles from './FormSection.css'

interface Props {
    
}

export const BlockchainFormSection: FC<Props> = ({
    
}) => {
    return (
        <Box className={styles.formItem}>
            <Box className={styles.formItemTop}>
                <Box
                    as='label'
                    fontWeight='600'
                    fontSize='16'
                >
                    Blockchain
                </Box>
            </Box>
            {/* Select blockchain */}
        </Box>
    )
}