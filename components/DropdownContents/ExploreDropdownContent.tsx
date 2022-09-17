import { FC, Fragment } from 'react'
import { Box } from '../Box/Box'
import { NextLink } from '../NextLink/NextLink'
import { Text } from '../Text/Text'
import * as styles from './DropdownContent.css'
import useTranslation from 'next-translate/useTranslation'

interface Props {
    
}

export const ExploreDropdownContent: FC<Props> = ({
    
}) => {
    const { t } = useTranslation('common')

    return (
        <Fragment>
            <Box
                className={styles.dropdownContentItem}
            >
                <NextLink 
                    href='/assets'
                    className={styles.dropdownContentItemLink}
                >
                    <Text
                        fontWeight='600'
                    >
                        {t('allAssets')}
                    </Text>
                </NextLink>
            </Box>
            <Box
                className={styles.dropdownContentItem}
            >
                <NextLink 
                    href='/'
                    className={styles.dropdownContentItemLink}
                >
                    <Text
                        fontWeight='600'
                    >
                        {t('allCollections')}
                    </Text>
                </NextLink>
            </Box>
        </Fragment>
    )
}