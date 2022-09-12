import { FC } from 'react'
import { Box } from '../Box/Box'
import { CreateCollectionFormType } from '../Forms/CreateCollectionForm'
import { AllNFTsIcon } from '../Icons/AllNFTsIcon'
import { Text } from '../Text/Text'
import * as styles from './DropdownContent.css'

interface Props {
    data: CreateCollectionFormType
    setData: (e: any) => void
}

export const CategoryDropdownContent: FC<Props> = ({
    data,
    setData
}) => {
    return (
        <Box
            className={styles.profileDropdownContainer}
        >
            <Box
                as='button'
                type='button'
                className={styles.profileDropdownItem}
                onClick={() => setData({
                    ...data,
                    // @ts-ignore
                    category: 'art'
                })}
            >
                <AllNFTsIcon />
                <Text
                    as='span'
                    fontWeight='600'
                    fontSize='14'
                >
                    Art
                </Text>
            </Box>
        </Box>
    )
}