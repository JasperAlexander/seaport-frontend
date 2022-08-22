import { ChangeEvent, FC } from 'react'
import { Box } from '../Box/Box'
import * as styles from './FormSection.css'
import { CreateAssetFormType } from '../Forms/CreateAssetForm'
import { Input } from '../Input/Input'
import { CloseIcon } from '../Icons/CloseIcon'
import { CreateCollectionFormType } from '../Forms/CreateCollectionForm'

interface Props {
    placeholder: string
    handleChange: (<S extends unknown>(key: keyof CreateAssetFormType, sanitizeFn?: ((value: string) => S) | undefined) => (e: ChangeEvent<HTMLInputElement & HTMLSelectElement>) => void) | (<S extends unknown>(key: keyof CreateCollectionFormType, sanitizeFn?: ((value: string) => S) | undefined) => (e: ChangeEvent<HTMLInputElement & HTMLSelectElement>) => void)
    validate: () => void
    errors: (Partial<Record<keyof CreateAssetFormType, string>>) | (Partial<Record<keyof CreateCollectionFormType, string>>)
    data: CreateAssetFormType | CreateCollectionFormType
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
                as='label'
                fontWeight='600'
                fontSize='16'
            >
                Name
                <Box as='span' color='error' marginLeft='3'>*</Box>
            </Box>
        </Box>
        <Box>
            <Input 
                type='text'
                name='name'
                required={true}
                placeholder={placeholder}
                value={data.name || ''}
                onChange={handleChange('name')}
                onBlur={() => validate()}
            />
            {errors.name &&
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
                        {errors.name}
                    </Box>
                </Box>
            }
        </Box>
    </Box>
        )
}