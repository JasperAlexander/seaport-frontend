import { FC } from 'react'
import { Box } from '../Box/Box'
import { FlagIcon } from '../Icons/FlagIcon'
import { Text } from '../Text/Text'
import * as styles from './DropdownContent.css'

interface Props {
    
}

export const MoreDropdownContent: FC<Props> = ({
    
}) => {
    return (
        <Box
            className={styles.profileDropdownContainer}
        >
            <Box
                as='button'
                className={styles.profileDropdownItem}
            >
                <FlagIcon />
                <Text
                    as='span'
                    fontWeight='600'
                    fontSize='14'
                >
                    Report
                </Text>
            </Box>
        </Box>
    )
}