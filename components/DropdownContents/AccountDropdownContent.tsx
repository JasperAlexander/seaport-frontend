import { FC, Fragment } from 'react'
import { Box } from '../Box/Box'
import { NextLink } from '../NextLink/NextLink'
import { ModeNightIcon } from '../Icons/ModeNightIcon'
import { NightModeToggle } from '../Toggles/NightModeToggle'
import { LogoutIcon } from '../Icons/LogoutIcon'
import { GridIcon } from '../Icons/GridIcon'
import { PersonIcon } from '../Icons/PersonIcon'
import { Text } from '../Text/Text'
import useMounted from '../../hooks/useMounted'
import { useAccount, useDisconnect } from 'wagmi'
import * as styles from './DropdownContent.css'

interface Props {
    
}

export const AccountDropdownContent: FC<Props> = ({
    
}) => {
    const { mounted } = useMounted()
    const { disconnect } = useDisconnect()
    const { isConnected } = useAccount()
    
    return (
        <Fragment>
            <Box
                className={styles.dropdownContentItem}
            >
                <NextLink 
                    href='/account' 
                    className={styles.dropdownContentItemLink}
                >
                    <PersonIcon 
                        fill='defaultText' 
                    />
                    <Text
                        fontWeight='600'
                    >
                        Profile
                    </Text>
                </NextLink>
            </Box>
            <Box
                className={styles.dropdownContentItem}
            >
                <NextLink 
                    href='/collections' 
                    className={styles.dropdownContentItemLink}
                >
                    <GridIcon 
                        fill='defaultText' 
                    />
                    <Text
                        fontWeight='600'
                    >
                        My collections
                    </Text>
                </NextLink>
            </Box>
            {mounted && isConnected &&
                <Box
                    className={styles.dropdownContentItem}
                >
                    <Box
                        as='button'
                        type='button'
                        onClick={() => disconnect()}
                        className={styles.dropdownContentItemLink}
                    >
                        <LogoutIcon 
                            fill='defaultText' 
                        />
                        <Text
                            fontWeight='600'
                        >
                            Log Out
                        </Text>
                    </Box>
                </Box>
            }
            <Box
                className={styles.dropdownContentItem}
            >
                <Box
                    as='button'
                    type='button'
                    onClick={() => { return null }}
                    className={styles.dropdownContentItemLink}
                >
                    <ModeNightIcon 
                        fill='defaultText' 
                    />
                    <Text
                        fontWeight='600'
                    >
                        Night mode
                    </Text>
                    <NightModeToggle />
                </Box>
            </Box>
        </Fragment>
    )
}