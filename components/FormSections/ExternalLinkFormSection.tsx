import { ChangeEvent, Dispatch, FC, SetStateAction } from 'react'
import { Box } from '../Box/Box'
import * as styles from './FormSection.css'
import { CreateAssetFormType } from '../Forms/CreateAssetForm'
import { Input } from '../Input/Input'
import { CloseIcon } from '../Icons/CloseIcon'

interface Props {
    handleChange: <S extends unknown>(key: keyof CreateAssetFormType, sanitizeFn?: ((value: string) => S) | undefined) => (e: ChangeEvent<HTMLInputElement & HTMLSelectElement>) => void
    validate: () => void
    setErrors: Dispatch<SetStateAction<Partial<Record<keyof CreateAssetFormType, string>>>>
    errors: Partial<Record<keyof CreateAssetFormType, string>>
    data: CreateAssetFormType
}

export const ExternalLinkFormSection: FC<Props> = ({
    handleChange,
    validate,
    setErrors,
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
                    External link
                </Box>
                <Box
                    as='span'
                    fontSize='12'
                    marginTop='4'
                    color='boxText'
                >
                    OpenFish will include a link to this URL on this item's detail page, so that users can click to learn more about it. You are welcome to link to your own webpage with more details.
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
                            setErrors((currentErrors) => {
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
                        color='error'
                        padding='4'
                    >
                        <CloseIcon fill='error' />
                        <Box
                            marginLeft='2'
                            fontSize='12'
                        >
                            {errors.external_link}
                        </Box>
                    </Box>
                }
            </Box>
        </Box>
    )
}