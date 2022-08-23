import { FC } from 'react'
import { Box } from '../Box/Box'
import { CreateAssetFormType } from '../Forms/CreateAssetForm'
import { CreateCollectionFormType } from '../Forms/CreateCollectionForm'
import { BlockchainSelect } from '../Selects/BlockchainSelect'
import * as styles from './FormSection.css'
import { Text } from '../Text/Text'

interface Props {
    data: CreateAssetFormType | CreateCollectionFormType
    setData: (e: any) => void
}

export const BlockchainFormSection: FC<Props> = ({
    data,
    setData
}) => {
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
                    Blockchain
                </Text>
            </Box>
            <BlockchainSelect 
                data={data}
                setData={setData}
            />
        </Box>
    )
}