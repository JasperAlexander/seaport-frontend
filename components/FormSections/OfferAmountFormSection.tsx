import { ChangeEvent, FC } from 'react'
import { Box } from '../Box/Box'
import * as styles from './FormSection.css'
import { MakeOfferFormType } from '../Forms/MakeOfferForm'
import { Input } from '../Input/Input'
import { Text } from '../Text/Text'
import { TokenSelect } from '../Selects/TokenSelect'
import { SWRInfiniteResponse } from 'swr/infinite'
import { TokensType } from '../../types/tokenTypes'
import useTranslation from 'next-translate/useTranslation'

interface Props {
    handleChange: <S extends unknown>(key: keyof MakeOfferFormType, sanitizeFn?: ((value: string) => S) | undefined) => (e: ChangeEvent<HTMLInputElement & HTMLSelectElement>) => void
    validate: () => void
    errors: Partial<Record<keyof MakeOfferFormType, string>>
    data: MakeOfferFormType
    tokens: SWRInfiniteResponse<TokensType, any>
    setData: (e: any) => void
    wethValue: string
}

export const OfferAmountFormSection: FC<Props> = ({
    handleChange,
    validate,
    errors,
    data,
    tokens,
    setData,
    wethValue
}) => {
    const { t } = useTranslation('common')

    const { data: tokensData, isValidating, size } = tokens
    const mappedTokens = tokensData ? tokensData.map(({ tokens }) => tokens).flat() : []

    return (
        <Box className={styles.formItem}>
            <Box
                display='flex'
                alignItems='center'
                justifyContent='space-between'
                marginBottom='8'
            >
                <Text
                    as='label'
                    fontWeight='600'
                >
                    {t('offerAmount')}
                </Text>
                <Text
                    as='span'
                    fontSize='12'
                    color='boxText'
                    fontWeight='500'
                >
                    {/* Should be based on payment token and account data, to do */}
                    {t('balance')}: {wethValue} WETH
                </Text>
            </Box>
            <Box
                display='flex'
                gap='8'
            >
                <TokenSelect 
                    mappedTokens={mappedTokens}
                    data={data}
                    setData={setData}
                />
                {/* <Box
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
                </Box> */}
                <Input 
                    type='text'
                    name='offer_amount'
                    placeholder='Amount'
                    value={data.offer_amount || ''}
                    onChange={handleChange('offer_amount')}
                    onBlur={() => validate()}
                />
            </Box>
            <Box
                display='flex'
                alignItems='center'
                justifyContent='space-between'
                marginTop='8'
            >
                {errors.offer_amount &&
                    <Text
                        as='span'
                        fontSize='12'
                        color='error'
                    >
                        {errors.offer_amount}
                    </Text>
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
                        {/* Should be based on input value, adding USD value onBlur, to do */}
                        {t('totalOfferAmount')}: 0 WETH
                    </Text>
                </Box>
            </Box>
        </Box>
        )
}