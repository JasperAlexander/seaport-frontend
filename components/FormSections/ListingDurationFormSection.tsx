import { ChangeEvent, FC } from 'react'
import { Box } from '../Box/Box'
import * as styles from './FormSection.css'
import { ListAssetFormType } from '../Forms/ListAssetForm'
import { CloseIcon } from '../Icons/CloseIcon'
import { ListingDurationSelect } from '../Selects/ListingDurationSelect'
import { Text } from '../Text/Text'

interface Props {
    handleChange: <S extends unknown>(key: keyof ListAssetFormType, sanitizeFn?: ((value: string) => S) | undefined) => (e: ChangeEvent<HTMLInputElement & HTMLSelectElement>) => void
    validate: () => void
    errors: Partial<Record<keyof ListAssetFormType, string>>
    data: ListAssetFormType
    setData: (e: any) => void
}

export const ListingDurationFormSection: FC<Props> = ({
    handleChange,
    validate,
    errors,
    data,
    setData
}) => {
    return (
        <Box className={styles.formItem}>
            <Box className={styles.formItemTop}>
                <Box
                    display='flex'
                    gap='3'
                >
                    <Text
                        as='label'
                        fontWeight='600'
                    >
                        Duration
                    </Text>
                    <Text 
                        as='span' 
                        color='error' 
                    >
                        *
                    </Text>
                </Box>
            </Box>
            <Box>
                <ListingDurationSelect 
                    data={data}
                    setData={setData}
                />
                {errors.duration &&
                    <Box
                        display='flex'
                        alignItems='center'
                        padding='4'
                        gap='2'
                    >
                        <CloseIcon fill='error' />
                        <Text
                            fontSize='12'
                            color='error'
                        >
                            {errors.duration}
                        </Text>
                    </Box>
                }
            </Box>
        </Box>
    )
}