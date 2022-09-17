import { ChangeEvent, FC } from 'react'
import { Box } from '../Box/Box'
import * as styles from './FormSection.css'
import { ListAssetFormType } from '../Forms/ListAssetForm'
import { CloseIcon } from '../Icons/CloseIcon'
import { ListingMethodSelect } from '../Selects/ListingMethodSelect'
import { Text } from '../Text/Text'
import useTranslation from 'next-translate/useTranslation'

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
    const { t } = useTranslation('common')

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
                        {t('method')}
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
                <ListingMethodSelect 
                    data={data}
                    setData={setData}
                />
                {errors.method &&
                    <Box
                        display='flex'
                        alignItems='center'
                        padding='4'
                        gap='2'
                    >
                        <CloseIcon 
                            fill='error' 
                        />
                        <Text
                            fontSize='12'
                            color='error'
                        >
                            {errors.method}
                        </Text>
                    </Box>
                }
            </Box>
        </Box>
    )
}