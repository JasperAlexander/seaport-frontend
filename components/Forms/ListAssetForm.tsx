import { FC, useEffect, useState } from 'react'
import { useForm } from '../../hooks/useForm'
import { Box } from '../Box/Box'
import { SWRResponse } from 'swr'
import { AssetReadType } from '../../types/assetTypes'
import { ListingTypeFormSection } from '../FormSections/ListingTypeFormSection'
import { ListingPriceFormSection } from '../FormSections/ListingPriceFormSection'
import { ListingDurationFormSection } from '../FormSections/ListingDurationFormSection'
import { ListingReserveFormSection } from '../FormSections/ListingReserveFormSection'
import { MainButton } from '../Buttons/MainButton/MainButton'
import useSeaport from '../../hooks/useSeaport'
import { ethers } from 'ethers'
import { useAccount, useConnect, useContractRead, useNetwork, useSigner, useSwitchNetwork } from 'wagmi'
import useMounted from '../../hooks/useMounted'
import { mintERC721 } from '../../utils/minting'
import { useRouter } from 'next/router'
import useUsers from '../../hooks/useUsers'
import { TokensStateType } from '../../types/tokenTypes'
import { ListingMethodFormSection } from '../FormSections/ListingMethodFormSection'
import { Text } from '../Text/Text'
import useUser from '../../hooks/useUser'
import useTranslation from 'next-translate/useTranslation'
import { DialogTrigger } from '../DialogTrigger/DialogTrigger'
import { CompleteListingDialogContent } from '../DiaglogContents/CompleteListingDialogContent'

const SUPPORTED_CHAIN_IDS = process.env.NEXT_PUBLIC_SUPPORTED_CHAIN_IDS

// To do: find out why this cannot be moved to assetTypes.ts
export interface ListAssetFormType {
    asset: AssetReadType
    signer: ethers.Signer
    token_id: string
    owner: string
    contract_address: string
    listing_type: string
    method: string
    payment_token: string
    startAmount: string
    endAmount: string
    duration: string
    from_account: string | undefined
    to_account: string | undefined
}

interface Props {
    asset: SWRResponse<AssetReadType, any> | undefined
    tokens: TokensStateType
}

export const ListAssetForm: FC<Props> = ({
    asset,
    tokens: { tokens }
}) => {
    const { t } = useTranslation('common')
    const [completeListingDialogOpen, setCompleteListingDialogOpen] = useState<boolean>(false)
    const { createOrder } = useSeaport()
    const router = useRouter()
    const { isConnected, address } = useAccount()
    const { connect } = useConnect()
    const { chain: activeChain } = useNetwork()
    const { switchNetwork } = useSwitchNetwork()
    // const users = useUsers(router, address)
    const user = useUser(address)
    const { data: signer } = useSigner()
    // const { data: owner } = useContractRead({
    //     addressOrName: contractAddresses.TestERC721,
    //     contractInterface: TestERC721.abi,
    //     functionName: 'ownerOf',
    //     args: asset?.data?.token_id
    // })
    const { mounted } = useMounted()
    const [listingStatus, setListingStatus] = useState<number>(0)
    const [loadingStatus, setLoadingStatus] = useState<boolean>(false)

    const { handleSubmit, setData, setErrors, validate, handleChange, data: formData, errors, } = useForm<ListAssetFormType>({
        validations: {
            startAmount: {
                pattern: {
                    value: '^[0-9.]*$',
                    message: `${t('fieldMustBeA', { fieldName: 'Price', fieldType: 'number' })}`
                },
                required: {
                    value: true,
                    message: `${t('fieldRequired')}`
                },
                custom: {
                    isValid: (value) => value?.length ? value.length < 6 : true,
                    message: `${t('fieldNotExceed', { fieldName: 'Price', amount: '5' })}`
                }
            },
            // endAmount: {
            //     pattern: {
            //         value: '^[0-9.]*$',
            //         message: 'Price must be a number.'
            //     },
            //     required: {
            //         value: true,
            //         message: `${t('fieldRequired')}`
            //     },
            //     custom: {
            //         isValid: (value) => value?.length ? value.length < 6 : true,
            //         message: 'Price must not exceed 5 numbers.'
            //     }
            // }
            listing_type: {
                required: {
                    value: true,
                    message: `${t('fieldRequired')}`
                }
            }
        },
        onSubmit: () => {
            return null
        },
        initialValues: {
            asset: asset?.data,
            signer: mounted && signer ? signer : undefined,
            listing_type: '',
            method: 'english',
            // address of selected payment token, current is address of TestERC20
            payment_token: '0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9',
            startAmount: '',
            endAmount: '',
            duration: '86400',
            from_account: address, // '1', // user?.data?.id?.toString(),
            to_account: undefined
        },
    })

    return (
        <Box
            as='section'
            style={{width: '646px', padding: '24px', margin: '0px auto'}}
            maxWidth='full'
        >
            <Box
                as='header'
                paddingTop='32' 
                paddingBottom='16' 
            >
                <Text 
                    as='h1' 
                    fontSize='40' 
                    fontWeight='600'
                >
                    {t('listAssetForSale')}
                </Text>
            </Box>
            <Box
                as='form'
                onSubmit={handleSubmit}
                style={{marginBottom: '32px', maxWidth: '772px', width: '100%'}}
            >
                <Box
                    display='flex'
                    alignItems='center'
                    gap='3'
                    marginY='12'
                >
                    <Text 
                        as='span' 
                        color='error'
                        fontSize='12'
                    >
                        *
                    </Text>
                    <Text
                        as='span'
                        fontSize='12'
                    >
                        {t('requiredFields')}
                    </Text>
                </Box>

                <ListingTypeFormSection 
                    handleChange={handleChange}
                    validate={validate}
                    errors={errors}
                    data={formData}
                    setData={setData}
                />
                {formData.listing_type === 'timed' &&
                    <ListingMethodFormSection 
                        handleChange={handleChange}
                        validate={validate}
                        errors={errors}
                        data={formData}
                        setData={setData}
                    />
                }
                <ListingPriceFormSection
                    handleChange={handleChange}
                    validate={validate}
                    errors={errors}
                    data={formData}
                    tokens={tokens}
                    setData={setData}
                    label={formData.listing_type === 'timed' ? 'Starting price' : 'Price'}
                />
                <ListingDurationFormSection
                    handleChange={handleChange}
                    validate={validate}
                    errors={errors}
                    data={formData}
                    setData={setData}
                />
                {formData.listing_type === 'timed' && formData.method === 'dutch' &&
                    <ListingPriceFormSection
                        handleChange={handleChange}
                        validate={validate}
                        errors={errors}
                        data={formData}
                        tokens={tokens}
                        setData={setData}
                        label='Ending price'
                    />
                }
                {/* <ListingReserveFormSection
                    handleChange={handleChange}
                    validate={validate}
                    errors={errors}
                    data={data}
                /> */}

                <Box 
                    height='0'
                    marginY='30'
                    borderBottomWidth='1'
                    borderStyle='solid'
                    borderColor='box'
                />

                <Box
                    display='flex'
                    flexDirection='column'
                    gap='8'
                >
                    <Box
                        display='flex'
                        alignItems='center'
                        justifyContent='space-between'
                    >
                        <Text
                            fontWeight='600'
                        >
                            {t('fees')}
                        </Text>
                    </Box>
                    <Box
                        display='flex'
                        alignItems='center'
                        justifyContent='space-between'
                    >
                        <Text
                            color='boxText'
                            fontSize='14'
                            fontWeight='500'
                        >
                            {t('serviceFee')}
                        </Text>
                        <Text
                            color='boxText'
                            fontSize='14'
                            fontWeight='500'
                        >
                            {/* To do */}
                            2.5%
                        </Text>
                    </Box>
                </Box>

                <Box 
                    height='0'
                    marginY='30'
                    borderBottomWidth='1'
                    borderStyle='solid'
                    borderColor='box'
                />
                <DialogTrigger
                    content={
                        <CompleteListingDialogContent 
                            open={completeListingDialogOpen} 
                            setOpen={setCompleteListingDialogOpen} 
                            formData={formData}
                            asset={formData?.asset}
                            listingStatus={listingStatus}
                            setListingStatus={setListingStatus}
                            loadingStatus={loadingStatus}
                            setLoadingStatus={setLoadingStatus}
                        />
                    }
                    open={completeListingDialogOpen}
                    setOpen={setCompleteListingDialogOpen}
                >
                    <MainButton
                        onClick={async() => { 
                            // if (mounted && 
                            //     owner !== address && // Make this line a comment if you've reset your account
                            //     signer && address) await mintERC721(signer, address, asset?.data?.token_id)
                            try {
                                if (!isConnected) {
                                    connect()
                                }
                                if (
                                    SUPPORTED_CHAIN_IDS && 
                                    activeChain?.id && 
                                    !JSON.parse(SUPPORTED_CHAIN_IDS).includes(activeChain.id)
                                ) {
                                    switchNetwork?.(JSON.parse(SUPPORTED_CHAIN_IDS)[0])
                                }
                                if (
                                    isConnected && 
                                    signer && 
                                    address && 
                                    activeChain?.id && 
                                    SUPPORTED_CHAIN_IDS &&
                                    JSON.parse(SUPPORTED_CHAIN_IDS).includes(activeChain.id)
                                ) {
                                    // await mintERC721(signer, address, asset?.data?.token_id)
                                    await createOrder(formData, listingStatus, setListingStatus, setLoadingStatus)
                                }
                            } catch (error) {
                                console.log(error)
                            }
                        }}
                        disabled={
                            formData.method === '' ||
                            formData.startAmount === '' ||
                            Object.keys(errors).length > 0 || 
                            loadingStatus
                            // || listingStatus > 0}
                        }
                    >
                        {t('completeListing')}
                    </MainButton>
                </DialogTrigger>
            </Box>
        </Box>
    )
}