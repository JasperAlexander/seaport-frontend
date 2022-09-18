import { FC, Fragment, useState } from 'react'
import { Box } from '../Box/Box'
import { NextLink } from '../NextLink/NextLink'
import { ModeNightIcon } from '../Icons/ModeNightIcon'
import { LogoutIcon } from '../Icons/LogoutIcon'
import { GridIcon } from '../Icons/GridIcon'
import { PersonIcon } from '../Icons/PersonIcon'
import { Text } from '../Text/Text'
import useMounted from '../../hooks/useMounted'
import * as styles from './DropdownContent.css'
import { useSession, signOut } from 'next-auth/react'
import { FavoriteOutlinedIcon } from '../Icons/FavoriteOutlinedIcon'
import { SettingsIcon } from '../Icons/SettingsIcon'
import { VisibilityIcon } from '../Icons/VisibilityIcon'
import useTranslation from 'next-translate/useTranslation'
import { Toggle } from '../Toggle/Toggle'

interface Props {
    
}

export const AccountDropdownContent: FC<Props> = ({
    
}) => {
    const { t } = useTranslation('common')
    const { mounted } = useMounted()
    const { data: session } = useSession()
    
    const [nightModeActive, setNightModeActive] = useState<boolean>(false)
    
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
                        {t('profile')}
                    </Text>
                </NextLink>
            </Box>
            <Box
                className={styles.dropdownContentItem}
            >
                <NextLink 
                    href='/account?tab=favorites' 
                    className={styles.dropdownContentItemLink}
                >
                    <FavoriteOutlinedIcon
                        fill='defaultText'
                    />
                    <Text
                        fontWeight='600'
                    >
                        {t('favoritesWithCapital')}
                    </Text>
                </NextLink>
            </Box>
            <Box
                className={styles.dropdownContentItem}
            >
                <NextLink 
                    href='/rankings/watchlist' 
                    className={styles.dropdownContentItemLink}
                >
                    <VisibilityIcon 
                        fill='defaultText' 
                    />
                    <Text
                        fontWeight='600'
                    >
                        {t('watchlist')}
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
                        {t('myCollections')}
                    </Text>
                </NextLink>
            </Box>
            <Box
                className={styles.dropdownContentItem}
            >
                <NextLink 
                    href='/account/settings' 
                    className={styles.dropdownContentItemLink}
                >
                    <SettingsIcon
                        fill='defaultText'
                    />
                    <Text
                        fontWeight='600'
                    >
                        {t('settings')}
                    </Text>
                </NextLink>
            </Box>
            {mounted && session &&
                <Box
                    className={styles.dropdownContentItem}
                >
                    <Box
                        as='button'
                        type='button'
                        onClick={() => signOut()}
                        className={styles.dropdownContentItemLink}
                    >
                        <LogoutIcon 
                            fill='defaultText' 
                        />
                        <Text
                            fontWeight='600'
                        >
                            {t('logOut')}
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
                        {t('nightMode')}
                    </Text>
                    <Toggle 
                        active={nightModeActive}
                        setActive={setNightModeActive}
                    />
                </Box>
            </Box>
        </Fragment>
    )
}