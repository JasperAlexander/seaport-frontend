import { FC, useState } from 'react'
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
import { useAccount, useContractRead, useSigner } from 'wagmi'
import useMounted from '../../hooks/useMounted'
import contractAddresses from '../../utils/contractAddresses.json'
import TestERC721 from '../../artifacts/contracts/test/TestERC721.sol/TestERC721.json'
import { mintERC721 } from '../../utils/minting'
import { useRouter } from 'next/router'
import useUsers from '../../hooks/useUsers'
import { TokensStateType } from '../../types/tokenTypes'
import { ListingMethodFormSection } from '../FormSections/ListingMethodFormSection'

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
    from_account: string
    to_account: string
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
    const { address } = useAccount()
    const users = useUsers(router, address)
    const { data: signer } = useSigner()
    const { data: owner } = useContractRead({
        addressOrName: contractAddresses.TestERC721,
        contractInterface: TestERC721.abi,
        functionName: 'ownerOf',
        args: asset?.data?.token_id
    })
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
            from_account: asset?.data?.owner?.address, // users?.users?.data?.[0]?.id.toString(),
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
            >
                <Box 
                    as='h1' 
                    fontSize='40' 
                    paddingTop='32' 
                    paddingBottom='16' 
                    fontWeight='600'
                >
                    List asset for sale
                </Box>
            </Box>
            <Box
                as='form'
                onSubmit={handleSubmit}
                style={{marginBottom: '32px', maxWidth: '772px', width: '100%'}}
            >
                <Box
                    as='p'
                    marginY='12'
                    fontSize='12'
                >
                    <Box as='span' color='error' marginRight='3'>*</Box>
                    Required fields
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
                        fontWeight='600'
                    >
                        Fees
                    </Box>
                    <Box
                        display='flex'
                        alignItems='center'
                        justifyContent='space-between'
                        color='boxText'
                        fontSize='14'
                        fontWeight='500'
                    >
                        <Box>
                            Service Fee
                        </Box>
                        <Box>
                            {/* To do */}
                            2.5%
                        </Box>
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
                            if (mounted && 
                                owner !== address && // Make this line a comment if you've reset your account
                                signer && address) await mintERC721(signer, address, asset?.data?.token_id)
                            await createOrder(data)

                            router.back()
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