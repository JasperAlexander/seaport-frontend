import { ChangeEvent, FC } from 'react'
import { Box } from '../Box/Box'
import * as styles from './FormSection.css'
import { ListAssetFormType } from '../Forms/ListAssetForm'
import { CloseIcon } from '../Icons/CloseIcon'
import { Input } from '../Input/Input'
import { Text } from '../Text/Text'

interface Props {
    handleChange: <S extends unknown>(key: keyof ListAssetFormType, sanitizeFn?: ((value: string) => S) | undefined) => (e: ChangeEvent<HTMLInputElement & HTMLSelectElement>) => void
    validate: () => void
    errors: Partial<Record<keyof ListAssetFormType, string>>
    data: ListAssetFormType
}

export const ListingReserveFormSection: FC<Props> = ({
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
                    alignItems='center'
                    justifyContent='space-between'
                >
                    <Text
                        as='label'
                        fontWeight='600'
                    >
                        Reserve for specific buyer
                        {/* Toggle component */}
                    </Text>
                </Box>
                <Box
                    marginTop='4'
                >
                    <Text
                        as='span'
                        fontSize='12'
                        color='boxText'
                    >
                        This item can be purchased as soon as it's listed.
                    </Text>
                </Box>
            </Box>
            <Box>
                <Input 
                    type='text'
                    name='to_address'
                    placeholder='0x000000...'
                    value={data.to_account || ''}
                    onChange={handleChange('to_account')}
                    onBlur={() => validate()}
                />
                {errors.to_account &&
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
                            {errors.to_account}
                        </Text>
                    </Box>
                }
            </Box>
        </Box>
    )
}