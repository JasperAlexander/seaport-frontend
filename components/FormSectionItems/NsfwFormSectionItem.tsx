import { FC } from 'react'
import { Box } from '../Box/Box'
import * as styles from './FormSectionItem.css'
import { WarningIcon } from '../Icons/WarningIcon'

interface Props {
    
}

export const NsfwFormSectionItem: FC<Props> = ({
    
}) => {
    return (
        <Box className={styles.formItemSectionItem}>
            <Box
                display='flex'
                justifyContent='space-between'
            >
                <Box display='flex'>
                    <WarningIcon />
                    <Box marginLeft='16'>
                        <Box 
                            as='span' 
                            fontWeight='600' 
                            fontSize='16'
                            display='block'
                        >
                            Explicit {'&'} Sensitive Content
                        </Box>
                        <Box as='span' fontSize='15'>
                            Set this item as explicit and sensitive content
                        </Box>
                    </Box>
                </Box>
                <Box>
                    <Box
                        display='flex'
                        alignItems='center'
                        justifyContent='center'
                    >
                        {/* Input checkbox */}
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}