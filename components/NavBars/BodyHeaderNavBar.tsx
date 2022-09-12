import { FC, useState } from 'react'
import { Box } from '../Box/Box'
import * as styles from './BodyHeaderNavBar.css'
import { MenuSideDialogTrigger } from '../DialogTriggers/MenuSideDialogTrigger'
import { ExploreDropdownTrigger } from '../DropdownTriggers/ExploreDropdownTrigger'
import { NextLink } from '../NextLink/NextLink'
import { Text } from '../Text/Text'
import { AccountDropdownTrigger } from '../DropdownTriggers/AccountDropdownTrigger'
import { PersonOutlinedIcon } from '../Icons/PersonOutlinedIcon'
import { useSession } from 'next-auth/react'
import { WalletSideDialogTrigger } from '../DialogTriggers/WalletSideDialogTrigger'
import { WalletOutlinedIcon } from '../Icons/WalletOutlinedIcon'
import { CloseIcon } from '../Icons/CloseIcon'
import { MenuIcon } from '../Icons/MenuIcon'

export const BodyHeaderNavBar: FC = () => {
    const [menuSideDialogOpen, setMenuSideDialogOpen] = useState<boolean>(false)
    const [walletSideDialogOpen, setWalletSideDialogOpen] = useState<boolean>(false)
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
                        hoverColor='black'
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
                        hoverColor='black'
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
                        hoverColor='black'
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
                            fillOnHover='black'
                        />
                    </NextLink>
                </AccountDropdownTrigger>
                
                <WalletSideDialogTrigger
                    open={walletSideDialogOpen}
                    setOpen={setWalletSideDialogOpen}
                >
                    <Box
                      display='flex'
                      alignItems='center'
                      justifyContent='center'
                      paddingX='10'
                      cursor='pointer'
                    >
                        <WalletOutlinedIcon 
                            width='32' 
                            fillOnHover='black'
                        />
                    </Box>
                </WalletSideDialogTrigger>
            </Box>

            <MenuSideDialogTrigger
                open={menuSideDialogOpen}
                setOpen={setMenuSideDialogOpen}
            >
                <Box
                    as='button'
                    display={{
                        base: 'flex',
                        wideScreen: 'none',
                        largeScreen: 'none'
                    }}
                    alignItems='center'
                    paddingX='10'
                >
                    {menuSideDialogOpen 
                        ? <CloseIcon width='32' />
                        : <MenuIcon width='32' />
                    }
                </Box>
            </MenuSideDialogTrigger>
        </Box>
    )
}