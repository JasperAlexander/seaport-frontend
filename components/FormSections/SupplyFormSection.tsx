import { ChangeEvent, FC } from 'react'
import { Box } from '../Box/Box'
import * as styles from './FormSection.css'
import { CreateAssetFormType } from '../Forms/CreateAssetForm'
import { Input } from '../Input/Input'
import { CloseIcon } from '../Icons/CloseIcon'
import { Text } from '../Text/Text'
import useTranslation from 'next-translate/useTranslation'
import { EditAssetFormType } from '../Forms/EditAssetForm'

interface Props {
    handleChange: 
        (<S extends unknown>(key: keyof CreateAssetFormType, sanitizeFn?: ((value: string) => S) | undefined) => (e: ChangeEvent<HTMLInputElement & HTMLSelectElement>) => void) |
        (<S extends unknown>(key: keyof EditAssetFormType, sanitizeFn?: ((value: string) => S) | undefined) => (e: ChangeEvent<HTMLInputElement & HTMLSelectElement>) => void)
    validate: () => void
    errors: 
        Partial<Record<keyof CreateAssetFormType, string>> |
        Partial<Record<keyof EditAssetFormType, string>>
    data: CreateAssetFormType | EditAssetFormType
}

export const SupplyFormSection: FC<Props> = ({
    handleChange,
    validate,
    errors,
    data
}) => {
    const { t } = useTranslation('common')

    return (
        <Box className={styles.formItem}>
            <Box className={styles.formItemTop}>
                <Text
                    as='label'
                    fontWeight='600'
                >
                    {t('supply')}
                </Text>
                <Box
                    marginTop='4'
                >
                    <Text
                        as='span'
                        fontSize='12'
                        color='boxText'
                    >
                        {t('supplyFieldDescription')}
                    </Text>
                </Box>
            </Box>
            <Box>
                <Input 
                    type='text'
                    name='supply'
                    required={true}
                    value={data.supply || ''}
                    onChange={handleChange('supply')}
                    onBlur={() => validate()}
                />
                {errors.supply &&
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
                            {errors.supply}
                        </Text>
                    </Box>
                }
            </Box>
        </Box>
    )
}