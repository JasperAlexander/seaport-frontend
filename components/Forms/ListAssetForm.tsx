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

// To do: find out why this cannot be moved to assetTypes.ts
export interface ListAssetFormType {
    asset: AssetType
    token_id: string
    owner: string
    contract_address: string
    type: string
    payment_token: string
    price: number
    duration: string
    to_address: string
}

interface Props {
    asset: SWRResponse<AssetType, any> | undefined
}

export const ListAssetForm: FC<Props> = ({
    asset
}) => {
    const [completeListingDialogOpen, setCompleteListingDialogOpen] = useState<boolean>(false)

    const { handleSubmit, setData, setErrors, validate, handleChange, data, errors, } = useForm<ListAssetFormType>({
        validations: {
            price: {
                pattern: {
                    value: '^[0-9]*$',
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
        },
        onSubmit: () => { return null },
        initialValues: {
            asset: asset?.data,
            type: '',
            // address of selected payment token, current is address of TestERC20
            payment_token: '0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9',
            price: 1,
            duration: '',
            to_address: ''
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
                />
                <ListingPriceFormSection
                    handleChange={handleChange}
                    validate={validate}
                    errors={errors}
                    data={data}
                />
                <ListingDurationFormSection
                    handleChange={handleChange}
                    validate={validate}
                    errors={errors}
                    data={data}
                />
                <ListingReserveFormSection
                    handleChange={handleChange}
                    validate={validate}
                    errors={errors}
                    data={data}
                />

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

                <CompleteListingDialogTrigger
                    open={completeListingDialogOpen}
                    setOpen={setCompleteListingDialogOpen}
                    disabled={Object.keys(errors).length > 0}
                    data={data}
                />
            </Box>
        </Box>
    )
}