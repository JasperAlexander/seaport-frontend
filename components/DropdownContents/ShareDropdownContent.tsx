import { FC } from 'react'
import useMounted from '../../hooks/useMounted'
import { Box } from '../Box/Box'
import { Logo } from '../Icons/Logo'
import { TwitterIcon } from '../Icons/TwitterIcon'
import { NextLink } from '../NextLink/NextLink'
import { Text } from '../Text/Text'
import * as styles from './DropdownContent.css'

interface Props {
    
}

export const ShareDropdownContent: FC<Props> = ({
    
}) => {
    const { mounted } = useMounted()
    
    return (
        <Box
            className={styles.profileDropdownContainer}
        >
            <Box
                as='button'
                onClick={() => { if (mounted) navigator.clipboard.writeText(window.location.href) } }
                className={styles.profileDropdownItem}
            >
                <Logo 
                    width='24'
                    fontSize='14'
                />
                <Text
                    as='span'
                    fontWeight='600'
                    fontSize='14'
                >
                    Copy link
                </Text>
            </Box>
            <NextLink
                href='/'
                className={styles.profileDropdownItem}
            >
                <TwitterIcon 
                    width='24'
                    fill='twitter'
                    fillOnHover='twitter'
                />
                <Text
                    as='span'
                    fontWeight='600'
                    fontSize='14'
                >
                    Share on Twitter
                </Text>
            </NextLink>
        </Box>
    )
}