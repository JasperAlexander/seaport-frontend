import { FC, useEffect, useState } from 'react'
import { useForm } from '../../hooks/useForm'
import { Box } from '../Box/Box'
import { SWRResponse } from 'swr'
import { AssetType } from '../../types/assetTypes'
import { CompleteListingDialogTrigger } from '../DialogTriggers/CompleteListingDialogTrigger'
import { ListingTypeFormSection } from '../FormSections/ListingTypeFormSection'
import { ListingPriceFormSection } from '../FormSections/ListingPriceFormSection'
import { ListingDurationFormSection } from '../FormSections/ListingDurationFormSection'
import { ListingReserveFormSection } from '../FormSections/ListingReserveFormSection'
import { MainButton } from '../Buttons/MainButton'
import useSeaport from '../../hooks/useSeaport'
import { ethers } from 'ethers'
import { useAccount, useConnect, useContractRead, useNetwork, useSigner, useSwitchNetwork } from 'wagmi'
import useMounted from '../../hooks/useMounted'
import contractAddresses from '../../utils/contractAddresses.json'
import TestERC721 from '../../artifacts/contracts/test/TestERC721.sol/TestERC721.json'
import { mintERC721 } from '../../utils/minting'
import { useRouter } from 'next/router'
import useUsers from '../../hooks/useUsers'
import { TokensStateType } from '../../types/tokenTypes'
import { ListingMethodFormSection } from '../FormSections/ListingMethodFormSection'
import { Text } from '../Text/Text'
import useUser from '../../hooks/useUser'

// To do: find out why this cannot be moved to assetTypes.ts
export interface ListAssetFormType {
    asset: AssetType
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
    asset: SWRResponse<AssetType, any> | undefined
    tokens: TokensStateType
}

export const ListAssetForm: FC<Props> = ({
    asset,
    tokens: { tokens }
}) => {
    const [completeListingDialogOpen, setCompleteListingDialogOpen] = useState<boolean>(false)
    const { listingStatus, createOrder } = useSeaport()
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

    const { handleSubmit, setData, setErrors, validate, handleChange, data, errors, } = useForm<ListAssetFormType>({
        validations: {
            startAmount: {
                pattern: {
                    value: '^[0-9.]*$',
                    message: 'Price must be a number.'
                },
                required: {
                    value: true,
                    message: 'This field is required.'
                },
                custom: {
                    isValid: (value) => value?.length ? value.length < 6 : true,
                    message: 'Price must not exceed 5 numbers.'
                }
            },
            endAmount: {
                pattern: {
                    value: '^[0-9.]*$',
                    message: 'Price must be a number.'
                },
                required: {
                    value: true,
                    message: 'This field is required.'
                },
                custom: {
                    isValid: (value) => value?.length ? value.length < 6 : true,
                    message: 'Price must not exceed 5 numbers.'
                }
            }
        },
        onSubmit: () => { return null },
        initialValues: {
            asset: asset?.data,
            signer: mounted && signer ? signer : undefined,
            listing_type: '',
            method: 'english',
            // address of selected payment token, current is address of TestERC20
            payment_token: '0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9',
            startAmount: '1',
            endAmount: '1',
            duration: '',
            from_account: address, // '1', // user?.data?.id?.toString(),
            to_account: undefined
        },
    })

    // useEffect(() => {
    //     if (!data?.from_account && user?.data?.id) {
    //         setData({
    //             ...data,
    //             // @ts-ignore
    //             from_account: user?.data?.id.toString()
    //         })
    //         console.log('id set')
    //     }
    // })

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
                    List asset for sale
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
                        Required fields
                    </Text>
                </Box>

                <ListingTypeFormSection 
                    handleChange={handleChange}
                    validate={validate}
                    errors={errors}
                    data={data}
                    setData={setData}
                />
                {data.listing_type === 'timed' &&
                    <ListingMethodFormSection 
                        handleChange={handleChange}
                        validate={validate}
                        errors={errors}
                        data={data}
                        setData={setData}
                    />
                }
                <ListingPriceFormSection
                    handleChange={handleChange}
                    validate={validate}
                    errors={errors}
                    data={data}
                    tokens={tokens}
                    setData={setData}
                    label={data.listing_type === 'timed' ? 'Starting price' : 'Price'}
                />
                <ListingDurationFormSection
                    handleChange={handleChange}
                    validate={validate}
                    errors={errors}
                    data={data}
                    setData={setData}
                />
                {data.listing_type === 'timed' && data.method === 'dutch' &&
                    <ListingPriceFormSection
                        handleChange={handleChange}
                        validate={validate}
                        errors={errors}
                        data={data}
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
                            Fees
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
                            Service Fee
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

                <CompleteListingDialogTrigger
                    open={completeListingDialogOpen}
                    setOpen={setCompleteListingDialogOpen}
                    data={data}
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
                                if (activeChain?.id !== 1337) {
                                    switchNetwork?.(1337)
                                }
                                if (isConnected && signer && address && activeChain?.id === 1337) {
                                    // await mintERC721(signer, address, asset?.data?.token_id)
                                    await createOrder(data)
                                }
                            } catch (error) {
                                console.log(error)
                            }
                        }}
                        // disabled={Object.keys(errors).length > 0 || listingStatus > 0}
                    >
                        Complete listing
                    </MainButton>
                </CompleteListingDialogTrigger>
            </Box>
        </Box>
    )
}