import { ChangeEvent, FC, Fragment } from 'react'
import { Box } from '../Box/Box'
import * as styles from './FormSection.css'
import { CreateAssetFormType } from '../Forms/CreateAssetForm'
import { CollectionsType } from '../../types/collectionTypes'
import { SWRInfiniteResponse } from 'swr/infinite'
import { CollectionSelect } from '../Selects/CollectionSelect'
import { CloseIcon } from '../Icons/CloseIcon'
import { Text } from '../Text/Text'
import { EditAssetFormType } from '../Forms/EditAssetForm'
import { CreateCollectionFormType } from '../Forms/CreateCollectionForm'
import { TokensType } from '../../types/tokenTypes'
import { TokenSelect } from '../Selects/TokenSelect'
import { EthIcon } from '../Icons/EthIcon'
import useTranslation from 'next-translate/useTranslation'

interface Props {
    handleChange: 
        (<S extends unknown>(key: keyof CreateCollectionFormType, sanitizeFn?: ((value: string) => S) | undefined) => (e: ChangeEvent<HTMLInputElement & HTMLSelectElement>) => void)
    validate: () => void
    errors: 
        (Partial<Record<keyof CreateCollectionFormType, string>>)
    data: CreateCollectionFormType
    tokens: SWRInfiniteResponse<TokensType, any>
    setData: (e: any) => void
}

export const TokenFormSection: FC<Props> = ({
    handleChange,
    validate,
    errors,
    data,
    tokens,
    setData
}) => {
    const { t } = useTranslation('common')

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
                    {t('paymentTokens')}
                </Box>
                <Box
                    as='span'
                    fontSize='12'
                    marginTop='4'
                    color='boxText'
                >
                    {t('paymentTokensFieldDescription')}
                </Box>
            </Box>

            <Box
                display='flex'
                alignItems='flex-start'
            >
                {data.payment_tokens.length > 0 &&
                    <Box
                        as='button'
                        type='button'
                        onClick={() => setData({
                            ...data,
                            // @ts-ignore
                            category: ''
                        })}

                        display='inline-flex'
                        gap='16'
                        alignItems='center'
                        justifyContent='center'
                        textAlign='center'

                        boxShadow={{ hover: 'subHeader' }}
                        background={{
                            base: 'defaultBackground',
                            active: 'buttonBackgroundActive'
                        }}
                        opacity={{ disabled: 'disabled' }}
                        cursor={{ base: 'pointer', disabled: 'default' }}

                        borderRadius='10'
                        borderWidth='2'
                        borderStyle='solid'
                        borderColor='box'

                        paddingX='20'
                        paddingY='8'
                        marginBottom='12'
                        marginRight='12'
                    >
                        {/* To do */}
                        <EthIcon />
                        <Box
                            display='flex'
                            flexDirection='column'
                        >
                            <Text
                                as='span'
                                fontSize='14'
                                fontWeight='600'
                            >
                                ETH
                            </Text>
                            <Text
                                as='span'
                                fontSize='14'
                                color='boxText'
                            >
                                Ethereum
                            </Text>
                        </Box>
                        <CloseIcon 
                            fill='boxText'
                        />
                    </Box>
                }
            </Box>

            <TokenSelect 
                mappedTokens={mappedTokens}
                data={data}
                setData={setData}
            />
            {errors.payment_tokens &&
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
                        {errors.payment_tokens}
                    </Text>
                </Box>
            }
        </Box>
    )
}