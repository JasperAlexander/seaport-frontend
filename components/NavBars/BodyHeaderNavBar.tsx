import { FC, useState } from 'react'
import { Box } from '../Box/Box'
import * as styles from './BodyHeaderNavBar.css'
import { NextLink } from '../NextLink/NextLink'
import { Text } from '../Text/Text'
import { PersonOutlinedIcon } from '../Icons/PersonOutlinedIcon'
import { useSession } from 'next-auth/react'
import { WalletOutlinedIcon } from '../Icons/WalletOutlinedIcon'
import { CloseIcon } from '../Icons/CloseIcon'
import { MenuIcon } from '../Icons/MenuIcon'
import useTranslation from 'next-translate/useTranslation'
import { DropdownTrigger } from '../DropdownTrigger/DropdownTrigger'
import { AccountDropdownContent } from '../DropdownContents/AccountDropdownContent'
import { ExploreDropdownContent } from '../DropdownContents/ExploreDropdownContent'
import { DialogTrigger } from '../DialogTrigger/DialogTrigger'
import { MenuSideDialogContent } from '../DiaglogContents/MenuSideDialogContent'
import { WalletSideDialogContent } from '../DiaglogContents/WalletSideDialogContent'

export const BodyHeaderNavBar: FC = () => {
    const { t } = useTranslation('common')
    const { data: session } = useSession()

    const [menuSideDialogOpen, setMenuSideDialogOpen] = useState<boolean>(false)
    const [walletSideDialogOpen, setWalletSideDialogOpen] = useState<boolean>(false)

    return (
        <Box 
            as='nav'
            className={styles.bodyHeaderNavBar}
        >
            <Box
                className={styles.bodyHeaderNavBarContainer}
            >
                <DropdownTrigger
                    content={<ExploreDropdownContent />}
                    placement='bottom'
                    trigger='mouseenter'
                >
                    <NextLink 
                        href='/assets' 
                        className={styles.bodyHeaderNavBarItem}
                    >
                        <Text
                            fontWeight='600'
                            hoverColor='black'
                        >
                            {t('explore')}
                        </Text>
                    </NextLink>
                </DropdownTrigger>

                <NextLink 
                    href='/faucet'
                    className={styles.bodyHeaderNavBarItem}
                >
                    <Text
                        fontWeight='600'
                        hoverColor='black'
                    >
                        {t('faucet')}
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
                        {t('create')}
                    </Text>
                </NextLink>

                <DropdownTrigger
                    content={<AccountDropdownContent />}
                    placement='bottom'
                    trigger='mouseenter'
                >
                    <NextLink 
                        href='/account' 
                        className={styles.bodyHeaderNavBarItem}
                    >
                        <PersonOutlinedIcon 
                            width='32'
                            fillOnHover='black'
                        />
                    </NextLink>
                </DropdownTrigger>
                <DialogTrigger
                    content={
                        <WalletSideDialogContent 
                            open={walletSideDialogOpen} 
                            setOpen={setWalletSideDialogOpen} 
                        />
                    }
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
                </DialogTrigger>
            </Box>
            <DialogTrigger
                content={
                    <MenuSideDialogContent 
                        open={menuSideDialogOpen} 
                        setOpen={setMenuSideDialogOpen} 
                    />
                }
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
            </DialogTrigger>
        </Box>
    )
}