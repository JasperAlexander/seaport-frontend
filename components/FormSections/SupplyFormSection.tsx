import { ChangeEvent, FC } from 'react'
import { Box } from '../Box/Box'
import * as styles from './FormSection.css'
import { CreateAssetFormType } from '../Forms/CreateAssetForm'
import { Input } from '../Input/Input'
import { CloseIcon } from '../Icons/CloseIcon'
import { Text } from '../Text/Text'

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
                <Text
                    as='label'
                    fontWeight='600'
                >
                    Supply
                </Text>
                <Box
                    marginTop='4'
                >
                    <Text
                        as='span'
                        fontSize='12'
                        color='boxText'
                    >
                        The number of items that can be minted. No gas cost to you!
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