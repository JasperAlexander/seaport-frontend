import { FC } from 'react'
import { Box } from '../Box/Box'
import { FlagIcon } from '../Icons/FlagIcon'
import { Text } from '../Text/Text'
import * as styles from './DropdownContent.css'
import useTranslation from 'next-translate/useTranslation'

interface Props {
    
}

export const MoreDropdownContent: FC<Props> = ({
    
}) => {
    const { t } = useTranslation('common')

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
                    {t('report')}
                </Text>
            </Box>
        </Box>
    )
}