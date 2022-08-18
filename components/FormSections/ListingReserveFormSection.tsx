import { ChangeEvent, FC } from 'react'
import { Box } from '../Box/Box'
import * as styles from './FormSection.css'
import { ListAssetFormType } from '../Forms/ListAssetForm'
import { CloseIcon } from '../Icons/CloseIcon'
import { Input } from '../Input/Input'

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
                    as='label'
                    display='flex'
                    alignItems='center'
                    justifyContent='space-between'
                    fontWeight='600'
                    fontSize='16'
                >
                    Reserve for specific buyer
                    {/* Toggle component */}
                </Box>
                <Box
                    as='span'
                    fontSize='12'
                    marginTop='4'
                    color='boxText'
                >
                    This item can be purchased as soon as it's listed.
                </Box>
            </Box>
            <Box>
                <Input 
                    type='text'
                    name='to_address'
                    placeholder='0x000000...'
                    value={data.to_address || ''}
                    onChange={handleChange('to_address')}
                    onBlur={() => validate()}
                />
                {errors.to_address &&
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
                            {errors.to_address}
                        </Box>
                    </Box>
                }
            </Box>
        </Box>
    )
}