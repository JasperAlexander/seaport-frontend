import { ChangeEvent, FC } from 'react'
import { Box } from '../Box/Box'
import * as styles from './FormSection.css'
import { ListAssetFormType } from '../Forms/ListAssetForm'
import { CloseIcon } from '../Icons/CloseIcon'
import { Input } from '../Input/Input'
import { TokenSelect } from '../Selects/TokenSelect'
import { TokensType } from '../../types/tokenTypes'
import { SWRInfiniteResponse } from 'swr/infinite'

interface Props {
    handleChange: <S extends unknown>(key: keyof ListAssetFormType, sanitizeFn?: ((value: string) => S) | undefined) => (e: ChangeEvent<HTMLInputElement & HTMLSelectElement>) => void
    validate: () => void
    errors: Partial<Record<keyof ListAssetFormType, string>>
    data: ListAssetFormType
    tokens: SWRInfiniteResponse<TokensType, any>
    setData: (e: any) => void
    label?: 'Starting price' | 'Ending price' | 'Price'
}

export const ListingPriceFormSection: FC<Props> = ({
    handleChange,
    validate,
    errors,
    data,
    tokens,
    setData,
    label = 'Price'
}) => {
    const { data: tokensData, isValidating, size } = tokens
    const mappedTokens = tokensData ? tokensData.map(({ tokens }) => tokens).flat() : []

    return (
        <Box className={styles.formItem}>
            <Box className={styles.formItemTop}>
                <Box
                    as='label'
                    fontWeight='600'
                    fontSize='16'
                >
                    {label}
                    <Box as='span' color='error' marginLeft='3'>*</Box>
                </Box>
            </Box>
            <Box>
                <Box
                    display='flex'
                    gap='8'
                >
                    <TokenSelect 
                        mappedTokens={mappedTokens}
                        data={data}
                        setData={setData}
                    />
                    <Input 
                        type='text'
                        name={label === 'Price' || label === 'Starting price' ? 'startAmount' : 'endAmount'}
                        placeholder='Amount'
                        value={data.startAmount || ''}
                        onChange={label === 'Price' || label === 'Starting price' ? handleChange('startAmount') : handleChange('endAmount')}
                        onBlur={() => validate()}
                    />
                </Box>
                <Box
                    display='flex'
                    alignItems='center'
                    justifyContent='space-between'
                    marginTop='8'
                >
                    {label === 'Price' || label === 'Starting price' 
                        ? errors.startAmount &&
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
                                    {errors.startAmount}
                                </Box>
                            </Box>
                        : errors.endAmount &&
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
                                    {errors.endAmount}
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