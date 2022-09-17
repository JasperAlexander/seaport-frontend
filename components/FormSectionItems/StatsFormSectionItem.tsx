import { FC } from 'react'
import { Box } from '../Box/Box'
import * as styles from './FormSectionItem.css'
import { AddIcon } from '../Icons/AddIcon'
import { BarChartIcon } from '../Icons/BarChartIcon'
import { Text } from '../Text/Text'
import useTranslation from 'next-translate/useTranslation'

interface Props {
    bottomBorder?: boolean
}

export const StatsFormSectionItem: FC<Props> = ({
    bottomBorder = true
}) => {
    const { t } = useTranslation('common')

    return (
        <Box 
            className={styles.formSectionItem}
            borderBottomWidth={bottomBorder ? '1' : '0'}
        >
            <Box
                display='flex'
                justifyContent='space-between'
            >
                <Box 
                    display='flex'
                >
                    <BarChartIcon />
                    <Box 
                        marginLeft='16'
                    >
                        <Text 
                            as='span' 
                            fontWeight='600' 
                            display='block'
                        >
                            {t('stats')}
                        </Text>
                        <Text 
                            as='span' 
                            fontSize='15'
                        >
                            {t('statsDescription')}
                        </Text>
                    </Box>
                </Box>
                <Box>
                    <Box
                        as='button'
                        type='button'
                        className={styles.formSectionItemButton}
                    >
                        <AddIcon 
                            fill='orderAction' 
                        />
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}