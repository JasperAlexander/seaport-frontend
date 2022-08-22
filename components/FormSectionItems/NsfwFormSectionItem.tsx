import { FC, useEffect } from 'react'
import { Box } from '../Box/Box'
import * as styles from './FormSectionItem.css'
import { WarningIcon } from '../Icons/WarningIcon'
import { FormToggle } from '../Toggles/FormToggle'
import { CreateAssetFormType } from '../Forms/CreateAssetForm'

interface Props {
    data: CreateAssetFormType
    setData: (e: any) => void
}

export const NsfwFormSectionItem: FC<Props> = ({
    data,
    setData
}) => {
    return (
        <Box className={styles.formItemSectionItem}>
            <Box
                display='flex'
                justifyContent='space-between'
            >
                <Box display='flex'>
                    <WarningIcon />
                    <Box marginLeft='16'>
                        <Box 
                            as='span' 
                            fontWeight='600' 
                            fontSize='16'
                            display='block'
                        >
                            Explicit {'&'} Sensitive Content
                        </Box>
                        <Box as='span' fontSize='15'>
                            Set this item as explicit and sensitive content
                        </Box>
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