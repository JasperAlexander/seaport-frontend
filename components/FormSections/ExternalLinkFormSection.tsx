import { ChangeEvent, Dispatch, FC, SetStateAction } from 'react'
import { Box } from '../Box/Box'
import * as styles from './FormSection.css'
import { CreateAssetFormType } from '../Forms/CreateAssetForm'
import { Input } from '../Input/Input'
import { CloseIcon } from '../Icons/CloseIcon'
import { Text } from '../Text/Text'
import { EditAssetFormType } from '../Forms/EditAssetForm'
import useTranslation from 'next-translate/useTranslation'

interface Props {
    handleChange: 
        (<S extends unknown>(key: keyof CreateAssetFormType, sanitizeFn?: ((value: string) => S) | undefined) => (e: ChangeEvent<HTMLInputElement & HTMLSelectElement>) => void) |
        (<S extends unknown>(key: keyof EditAssetFormType, sanitizeFn?: ((value: string) => S) | undefined) => (e: ChangeEvent<HTMLInputElement & HTMLSelectElement>) => void)
    validate: () => void
    setErrors: 
        (Dispatch<SetStateAction<Partial<Record<keyof CreateAssetFormType, string>>>>) |
        (Dispatch<SetStateAction<Partial<Record<keyof EditAssetFormType, string>>>>)
    errors: 
        (Partial<Record<keyof CreateAssetFormType, string>>) |
        (Partial<Record<keyof EditAssetFormType, string>>)
    data: CreateAssetFormType | EditAssetFormType
}

export const ExternalLinkFormSection: FC<Props> = ({
    handleChange,
    validate,
    setErrors,
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
                    {t('externalLink')}
                </Text>
                <Box
                    marginTop='4'
                >
                    <Text
                        as='span'
                        fontSize='12'
                        color='boxText'
                    >
                        {t('externalLinkFieldDescription')}
                    </Text>
                </Box>
            </Box>
            <Box>
                <Input 
                    type='text'
                    name='external_link'
                    placeholder='https://yoursite.io/item/123'
                    value={data.external_link || ''}
                    onChange={handleChange('external_link')}
                    onBlur={() => { 
                        if (data.external_link.length === 0) {
                            // Remove regex error when input is empty
                            setErrors((currentErrors: any) => {
                                const { external_link, ...errors } = currentErrors
                                return errors
                            })
                        } else {
                            validate()
                        }
                    }}
                />
                {errors.external_link &&
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
                            {errors.external_link}
                        </Text>
                    </Box>
                }
            </Box>
        </Box>
    )
}