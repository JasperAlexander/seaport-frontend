import { ChangeEvent, FC } from 'react'
import { Box } from '../Box/Box'
import * as styles from './FormSection.css'
import { CreateAssetFormType } from '../Forms/CreateAssetForm'
import { Input } from '../Input/Input'
import { CloseIcon } from '../Icons/CloseIcon'
import { CreateCollectionFormType } from '../Forms/CreateCollectionForm'
import { Text } from '../Text/Text'
import { EditAssetFormType } from '../Forms/EditAssetForm'

interface Props {
    placeholder: string
    handleChange: 
        (<S extends unknown>(key: keyof CreateAssetFormType, sanitizeFn?: ((value: string) => S) | undefined) => (e: ChangeEvent<HTMLInputElement & HTMLSelectElement>) => void) | 
        (<S extends unknown>(key: keyof CreateCollectionFormType, sanitizeFn?: ((value: string) => S) | undefined) => (e: ChangeEvent<HTMLInputElement & HTMLSelectElement>) => void) |
        (<S extends unknown>(key: keyof EditAssetFormType, sanitizeFn?: ((value: string) => S) | undefined) => (e: ChangeEvent<HTMLInputElement & HTMLSelectElement>) => void)
    validate: () => void
    errors: 
        (Partial<Record<keyof CreateAssetFormType, string>>) | 
        (Partial<Record<keyof CreateCollectionFormType, string>>) |
        (Partial<Record<keyof EditAssetFormType, string>>)
    data: CreateAssetFormType | EditAssetFormType | CreateCollectionFormType
}

export const NameFormSection: FC<Props> = ({
    placeholder,
    handleChange,
    validate,
    errors,
    data
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
                    Name
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
            <Input 
                type='text'
                name='name'
                placeholder={placeholder}
                value={data.name || ''}
                onChange={handleChange('name')}
                onBlur={() => validate()}
            />
            {errors.name &&
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
                        {errors.name}
                    </Text>
                </Box>
            }
        </Box>
    </Box>
        )
}