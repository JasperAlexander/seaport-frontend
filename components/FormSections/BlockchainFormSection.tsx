import { FC } from 'react'
import { Box } from '../Box/Box'
import { CreateAssetFormType } from '../Forms/CreateAssetForm'
import { CreateCollectionFormType } from '../Forms/CreateCollectionForm'
import { BlockchainSelect } from '../Selects/BlockchainSelect'
import * as styles from './FormSection.css'
import { Text } from '../Text/Text'
import useTranslation from 'next-translate/useTranslation'
import { EditAssetFormType } from '../Forms/EditAssetForm'

interface Props {
    data: CreateAssetFormType | EditAssetFormType | CreateCollectionFormType
    setData: (e: any) => void
}

export const BlockchainFormSection: FC<Props> = ({
    data,
    setData
}) => {
    const { t } = useTranslation('common')

    return (
        <Box 
            className={styles.formItem}
        >
            <Box 
                className={styles.formItemTop}
            >
                <Text
                    as='label'
                    fontWeight='600'
                >
                    {t('blockchain')}
                </Text>
            </Box>
            <BlockchainSelect 
                data={data}
                setData={setData}
            />
        </Box>
    )
}