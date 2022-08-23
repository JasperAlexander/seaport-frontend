import { ChangeEvent, FC } from 'react'
import { Box } from '../Box/Box'
import * as styles from './FormSection.css'
import { ListAssetFormType } from '../Forms/ListAssetForm'
import { CloseIcon } from '../Icons/CloseIcon'
import { Input } from '../Input/Input'
import { TokenSelect } from '../Selects/TokenSelect'
import { TokensType } from '../../types/tokenTypes'
import { SWRInfiniteResponse } from 'swr/infinite'
import { Text } from '../Text/Text'

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
                    display='flex'
                    gap='3'
                >
                    <Text
                        as='label'
                        fontWeight='600'
                    >
                        {label}
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
                                padding='4'
                                gap='2'
                            >
                                <CloseIcon 
                                    fill='error' 
                                />
                                <Text
                                    fontSize='12'
                                    color='error'
                                >
                                    {errors.startAmount}
                                </Text>
                            </Box>
                        : errors.endAmount &&
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
                                    {errors.endAmount}
                                </Text>
                            </Box>
                        }
                    <Box
                        marginLeft='auto'
                    >
                        <Text
                            as='span'
                            fontSize='12'
                            fontWeight='500'
                            color='boxText'
                        >
                            {/* Should be based on input value */}
                            $1.000 Total
                        </Text>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}