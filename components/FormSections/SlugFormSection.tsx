import { ChangeEvent, Dispatch, FC, SetStateAction } from 'react'
import { Box } from '../Box/Box'
import * as styles from './FormSection.css'
import { Input } from '../Input/Input'
import { CloseIcon } from '../Icons/CloseIcon'
import { Text } from '../Text/Text'
import { CreateCollectionFormType } from '../Forms/CreateCollectionForm'
import useTranslation from 'next-translate/useTranslation'

interface Props {
    handleChange: 
        (<S extends unknown>(key: keyof CreateCollectionFormType, sanitizeFn?: ((value: string) => S) | undefined) => (e: ChangeEvent<HTMLInputElement & HTMLSelectElement>) => void)
    validate: () => void
    setErrors: 
        (Dispatch<SetStateAction<Partial<Record<keyof CreateCollectionFormType, string>>>>)
    errors: 
        (Partial<Record<keyof CreateCollectionFormType, string>>)
    data: CreateCollectionFormType
}

export const SlugFormSection: FC<Props> = ({
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
                    {t('url')}
                </Text>
                <Box
                    marginTop='4'
                >
                    <Text
                        as='span'
                        fontSize='12'
                        color='boxText'
                    >
                        {t('urlFieldDescription')}
                    </Text>
                </Box>
            </Box>
            <Box>
                <Input 
                    type='text'
                    name='slug'
                    placeholder='https://opensea.io/collection/...'
                    value={data.external_link || ''}
                    onChange={handleChange('slug')}
                    onBlur={() => { 
                        if (data.slug.length === 0) {
                            // Remove regex error when input is empty
                            setErrors((currentErrors: any) => {
                                const { slug, ...errors } = currentErrors
                                return errors
                            })
                        } else {
                            validate()
                        }
                    }}
                />
                {errors.slug &&
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
                            {errors.slug}
                        </Text>
                    </Box>
                }
            </Box>
        </Box>
    )
}