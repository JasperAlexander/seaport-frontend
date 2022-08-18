import { ChangeEvent, FC } from 'react'
import { Box } from '../Box/Box'
import * as styles from './FormSection.css'
import { CreateAssetFormType } from '../Forms/CreateAssetForm'
import { Input } from '../Input/Input'
import { CloseIcon } from '../Icons/CloseIcon'

interface Props {
    handleChange: <S extends unknown>(key: keyof CreateAssetFormType, sanitizeFn?: ((value: string) => S) | undefined) => (e: ChangeEvent<HTMLInputElement & HTMLSelectElement>) => void
    validate: () => void
    errors: Partial<Record<keyof CreateAssetFormType, string>>
    data: CreateAssetFormType
}

export const NameFormSection: FC<Props> = ({
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
                placeholder='Asset name'
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