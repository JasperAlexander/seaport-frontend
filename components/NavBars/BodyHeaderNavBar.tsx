import { FC, useState } from 'react'
import { Box } from '../Box/Box'
import * as styles from './BodyHeaderNavBar.css'
import { MenuSideDialogTrigger } from '../DialogTriggers/MenuSideDialogTrigger'
import { CustomConnectButton } from '../Buttons/CustomConnectButton'
import { MenuDialogButton } from '../Buttons/MenuDialogButton'
import { ExploreDropdownTrigger } from '../DropdownTriggers/ExploreDropdownTrigger'
import { NextLink } from '../NextLink/NextLink'
import { Text } from '../Text/Text'
import { AccountDropdownTrigger } from '../DropdownTriggers/AccountDropdownTrigger'
import { PersonOutlinedIcon } from '../Icons/PersonOutlinedIcon'
import { useSession } from 'next-auth/react'

export const BodyHeaderNavBar: FC = () => {
    const [menuSideDialogOpen, setMenuSideDialogOpen] = useState<boolean>(false)
    const { data: session } = useSession()

    return (
        <Box 
            as='nav'
            className={styles.bodyHeaderNavBar}
        >
            <Box
                className={styles.bodyHeaderNavBarContainer}
            >
                <ExploreDropdownTrigger>
                    <NextLink 
                        href='/assets' 
                        className={styles.bodyHeaderNavBarItem}
                    >
                    <Text
                        fontWeight='600'
                    >
                        Explore
                    </Text>
                    </NextLink>
                </ExploreDropdownTrigger>

                <NextLink 
                    href='/faucet'
                    className={styles.bodyHeaderNavBarItem}
                >
                    <Text
                        fontWeight='600'
                    >
                        Faucet
                    </Text>
                </NextLink>

                <NextLink 
                    href={session ? '/create' : '/login/?referrer=/create'}
                    className={styles.bodyHeaderNavBarItem}
                >
                    <Text
                        fontWeight='600'
                    >
                        Create
                    </Text>
                </NextLink>

                <AccountDropdownTrigger>
                    <NextLink 
                        href='/account' 
                        className={styles.bodyHeaderNavBarItem}
                    >
                        <PersonOutlinedIcon 
                            width='32'
                        />
                    </NextLink>
                </AccountDropdownTrigger>
                
                <CustomConnectButton />
            </Box>

            <MenuSideDialogTrigger
                open={menuSideDialogOpen}
                setOpen={setMenuSideDialogOpen}
            >
                <MenuDialogButton 
                    open={menuSideDialogOpen}
                />
            </MenuSideDialogTrigger>
        </Box>
    )
}