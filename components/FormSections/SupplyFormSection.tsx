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

export const SupplyFormSection: FC<Props> = ({
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
                    Supply
                </Box>
                <Box
                    as='span'
                    fontSize='12'
                    marginTop='4'
                    color='boxText'
                >
                    The number of items that can be minted. No gas cost to you!
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
                        color='error'
                        padding='4'
                    >
                        <CloseIcon fill='error' />
                        <Box
                            marginLeft='2'
                            fontSize='12'
                        >
                            {errors.supply}
                        </Box>
                    </Box>
                }
            </Box>
        </Box>
    )
}