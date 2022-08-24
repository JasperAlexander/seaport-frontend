import { ChangeEvent, FC } from 'react'
import { Box } from '../Box/Box'
import * as styles from './FormSection.css'
import { CreateAssetFormType } from '../Forms/CreateAssetForm'
import { Textarea } from '../Textarea/Textarea'
import { CloseIcon } from '../Icons/CloseIcon'
import { CreateCollectionFormType } from '../Forms/CreateCollectionForm'
import { Text } from '../Text/Text'
import { EditAssetFormType } from '../Forms/EditAssetForm'

interface Props {
    label?: string
    handleChange: 
        (<S extends unknown>(key: keyof CreateAssetFormType, sanitizeFn?: ((value: string) => S) | undefined) => (e: ChangeEvent<HTMLInputElement & HTMLSelectElement>) => void) | 
        (<S extends unknown>(key: keyof CreateCollectionFormType, sanitizeFn?: ((value: string) => S) | undefined) => (e: ChangeEvent<HTMLInputElement & HTMLSelectElement>) => void) |
        (<S extends unknown>(key: keyof EditAssetFormType, sanitizeFn?: ((value: string) => S) | undefined) => (e: ChangeEvent<HTMLInputElement & HTMLSelectElement>) => void)
    validate: () => void
    errors: 
        (Partial<Record<keyof CreateAssetFormType, string>>) | 
        (Partial<Record<keyof EditAssetFormType, string>>) |
        (Partial<Record<keyof CreateCollectionFormType, string>>)
    data: CreateAssetFormType | EditAssetFormType | CreateCollectionFormType
}

export const DescriptionFormSection: FC<Props> = ({
    label,
    handleChange,
    validate,
    errors,
    data
}) => {
    return (
        <Box 
            className={styles.formItem}
        >
            <Box 
                className={styles.formItemTop}
            >
                <Text
                    as='label'
                    fontWeight='600'
                >
                    Description
                </Text>
                <Box
                    marginTop='4'
                >
                    <Text
                        as='span'
                        fontSize='12'
                        color='boxText'
                        display='inline-block'
                    >
                        {label}
                    </Text>
                    <Box 
                        as='a' 
                        href='https://www.markdownguide.org/cheat-sheet/' 
                        display='inline-block'
                    >
                        <Text
                            fontSize='12'
                            color='accentColor'
                        >
                            {'\u00a0'}Markdown{'\u00a0'}
                        </Text>
                    </Box> 
                    <Text
                        fontSize='12'
                        color='boxText'
                        display='inline-block'
                    >
                        syntax is supported.
                    </Text>
                </Box>
            </Box>
            <Textarea 
                name='description'
                placeholder='Provide a detailed description of your asset.'
                value={data.description || ''}
                onChange={handleChange('description')}
                onBlur={() => validate()}
                rows={4}
                resize='vertical'
            />
            {errors.description &&
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
                        {errors.description}
                    </Text>
                </Box>
            }
        </Box>
    )
}