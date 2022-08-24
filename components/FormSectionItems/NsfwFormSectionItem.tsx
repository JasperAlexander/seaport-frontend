import { FC } from 'react'
import { Box } from '../Box/Box'
import * as styles from './FormSectionItem.css'
import { WarningIcon } from '../Icons/WarningIcon'
import { FormToggle } from '../Toggles/FormToggle'
import { CreateAssetFormType } from '../Forms/CreateAssetForm'
import { Text } from '../Text/Text'

interface Props {
    data: CreateAssetFormType
    setData: (e: any) => void
}

export const NsfwFormSectionItem: FC<Props> = ({
    data,
    setData
}) => {
    return (
        <Box 
            className={styles.formSectionItem}
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
                            Explicit {'&'} Sensitive Content
                        </Text>
                        <Text 
                            as='span' 
                            fontSize='15'
                        >
                            Set this item as explicit and sensitive content
                        </Text>
                    </Box>
                </Box>
                <Box>
                    <FormToggle 
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