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

export const ListingPriceFormSection: FC<Props> = ({
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
                    Price
                    <Box as='span' color='error' marginLeft='3'>*</Box>
                </Box>
            </Box>
            <Box>
                <Box
                    display='flex'
                    gap='8'
                >
                    <Box
                        as='button'
                        style={{width: '250px'}}
                        borderRadius='10'
                        borderColor='box'
                        borderStyle='solid'
                        borderWidth='2'
                        padding='12'
                        height='48'
                        fontSize='16'
                    >
                        WETH
                    </Box>
                    <Input 
                        type='text'
                        name='price'
                        placeholder='Amount'
                        value={data.price || ''}
                        onChange={handleChange('price')}
                        onBlur={() => validate()}
                    />
                </Box>
                <Box
                    display='flex'
                    alignItems='center'
                    justifyContent='space-between'
                    marginTop='8'
                >
                    {errors.price &&
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
                                {errors.price}
                            </Box>
                        </Box>
                    }
                    <Box
                        as='span'
                        fontSize='12'
                        color='boxText'
                        marginLeft='auto'
                        fontWeight='500'
                    >
                        {/* Should be based on input value */}
                        $1.000 Total
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}