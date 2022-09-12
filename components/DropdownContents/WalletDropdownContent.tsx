import { signOut } from 'next-auth/react'
import { FC } from 'react'
import { Box } from '../Box/Box'
import { LogoutIcon } from '../Icons/LogoutIcon'
import { Text } from '../Text/Text'
import * as styles from './DropdownContent.css'

interface Props {
    
}

export const WalletDropdownContent: FC<Props> = ({
    
}) => {
    return (
        <Box
            className={styles.profileDropdownContainer}
        >
            <Box
                as='button'
                className={styles.profileDropdownItem}
                onClick={() => signOut()}
            >
                <LogoutIcon />
                <Text
                    as='span'
                    fontWeight='600'
                    fontSize='14'
                >
                    Log out
                </Text>
            </Box>
        </Box>
    )
}