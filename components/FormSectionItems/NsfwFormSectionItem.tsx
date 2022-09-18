import { FC } from 'react'
import { Box } from '../Box/Box'
import * as styles from './FormSectionItem.css'
import { WarningIcon } from '../Icons/WarningIcon'
import { CreateAssetFormType } from '../Forms/CreateAssetForm'
import { Text } from '../Text/Text'
import { CreateCollectionFormType } from '../Forms/CreateCollectionForm'
import useTranslation from 'next-translate/useTranslation'
import { EditAssetFormType } from '../Forms/EditAssetForm'
import { Toggle } from '../Toggle/Toggle'

interface Props {
    data: CreateAssetFormType | EditAssetFormType | CreateCollectionFormType
    setData: (e: any) => void
    bottomBorder?: boolean
}

export const NsfwFormSectionItem: FC<Props> = ({
    data,
    setData,
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
                    <WarningIcon />
                    <Box 
                        marginLeft='16'
                    >
                        <Text 
                            as='span' 
                            fontWeight='600' 
                            display='block'
                        >
                            {t('nsfw')}
                        </Text>
                        <Text 
                            as='span' 
                            fontSize='15'
                        >
                            {t('nsfwFieldDescription')}
                        </Text>
                    </Box>
                </Box>
                <Box>
                    <Toggle 
                        active={data.is_nsfw}
                        setActive={() => setData({
                            ...data,
                            is_nsfw: !data.is_nsfw
                        })}
                    />
                </Box>
            </Box>
        </Box>
    )
}