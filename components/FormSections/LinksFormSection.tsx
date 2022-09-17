import { ChangeEvent, FC } from 'react'
import { Box } from '../Box/Box'
import * as styles from './FormSection.css'
import { Input } from '../Input/Input'
import { CloseIcon } from '../Icons/CloseIcon'
import { CreateCollectionFormType } from '../Forms/CreateCollectionForm'
import { Text } from '../Text/Text'
import useTranslation from 'next-translate/useTranslation'

interface Props {
    handleChange: 
        (<S extends unknown>(key: keyof CreateCollectionFormType, sanitizeFn?: ((value: string) => S) | undefined) => (e: ChangeEvent<HTMLInputElement & HTMLSelectElement>) => void)
    validate: () => void
    errors: 
        (Partial<Record<keyof CreateCollectionFormType, string>>)
    data: CreateCollectionFormType
}

export const LinkFormSection: FC<Props> = ({
    handleChange,
    validate,
    errors,
    data
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
                        {t('links')}
                    </Text>
                </Box>
            </Box>
            <Box>
                <Input 
                    type='text'
                    name='external_link'
                    placeholder='yoursite/io'
                    value={data.external_link || ''}
                    onChange={handleChange('external_link')}
                    onBlur={() => validate()}
                />
                <Input 
                    type='text'
                    name='discord_link'
                    placeholder='http://discord.gg/abcdef'
                    value={data.discord_link || ''}
                    onChange={handleChange('discord_link')}
                    onBlur={() => validate()}
                />
                <Input 
                    type='text'
                    name='instagram_link'
                    placeholder='https://instagram.com/abcdef'
                    value={data.instagram_link || ''}
                    onChange={handleChange('instagram_link')}
                    onBlur={() => validate()}
                />
                <Input 
                    type='text'
                    name='medium_link'
                    placeholder='https://medium.com/@YourMediumHandle'
                    value={data.medium_link || ''}
                    onChange={handleChange('medium_link')}
                    onBlur={() => validate()}
                />
                <Input 
                    type='text'
                    name='telegram_link'
                    placeholder='https://t.me/abcdef'
                    value={data.telegram_link || ''}
                    onChange={handleChange('telegram_link')}
                    onBlur={() => validate()}
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