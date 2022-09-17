import { FC } from 'react'
import { Box } from '../Box/Box'
import * as styles from './FormSectionItem.css'
import { ListIcon } from '../Icons/ListIcon'
import { AddIcon } from '../Icons/AddIcon'
import { Text } from '../Text/Text'
import useTranslation from 'next-translate/useTranslation'

interface Props {
    bottomBorder?: boolean
}

export const PropertiesFormSectionItem: FC<Props> = ({
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
                    <ListIcon />
                    <Box 
                        marginLeft='16'
                    >
                        <Text 
                            as='span' 
                            fontWeight='600' 
                            display='block'
                        >
                            {t('properties')}
                        </Text>
                        <Text 
                            as='span' 
                            fontSize='15'
                        >
                            {t('propertiesDescription')}
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