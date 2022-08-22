import { ChangeEvent, FC } from 'react'
import { Box } from '../Box/Box'
import * as styles from './FormSection.css'
import { ListAssetFormType } from '../Forms/ListAssetForm'
import { CloseIcon } from '../Icons/CloseIcon'
import { Input } from '../Input/Input'
import { ListingDurationSelect } from '../Selects/ListingDurationSelect'
import { ListingMethodSelect } from '../Selects/ListingMethodSelect'

interface Props {
    handleChange: <S extends unknown>(key: keyof ListAssetFormType, sanitizeFn?: ((value: string) => S) | undefined) => (e: ChangeEvent<HTMLInputElement & HTMLSelectElement>) => void
    validate: () => void
    errors: Partial<Record<keyof ListAssetFormType, string>>
    data: ListAssetFormType
    setData: (e: any) => void
}

export const ListingMethodFormSection: FC<Props> = ({
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
                    as='label'
                    fontWeight='600'
                    fontSize='16'
                >
                    Method
                    <Box as='span' color='error' marginLeft='3'>*</Box>
                </Box>
            </Box>
            <Box>
                <ListingMethodSelect 
                    data={data}
                    setData={setData}
                />
                {errors.method &&
                    <Box
                        display='flex'
                        alignItems='center'
                        color='error'
                        padding='4'
                    >
                        <CloseIcon fill='error' />
                        <Box
                            marginLeft='2'
                            fontSize='12'
                        >
                            {errors.method}
                        </Box>
                    </Box>
                }
            </Box>
        </Box>
    )
}