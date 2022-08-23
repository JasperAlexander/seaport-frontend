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
import { Text } from '../Text/Text'
import { OfferAmountFormSection } from '../FormSections/OfferAmountFormSection'
import { OfferExpirationFormSection } from '../FormSections/OfferExpirationFormSection'

// To do: find out why this cannot be moved to offerTypes.ts
export interface MakeOfferFormType {
    offer_amount: number
    // offer_expiration: number
}

interface Props {
    tokens: TokensStateType
}

export const MakeOfferForm: FC<Props> = ({
    tokens: { tokens }
}) => {
    const [wethValue, setWethValue] = useState<string>('1.4') // Should be derived from user

    const { handleSubmit, validate, handleChange, data, setData, errors, } = useForm<MakeOfferFormType>({
        validations: {
            offer_amount: {
                pattern: {
                value: '^[0-9.]*$',
                message:
                    "Amount must only contain numbers.",
                },
                required: {
                    value: true,
                    message: 'This field is required.'
                },
                custom: {
                    isValid: (value) => isNaN(parseInt(value)) ? true : Number(value) >= Number(wethValue),
                    message: `You don't have enough WETH.` // Based on selected payment token
                }
            },
            // offer_expiration: {
            //     pattern: {
            //     value: '^[0-9]*$',
            //     message:
            //         "Supply must be a number.",
            //     },
            //     required: {
            //         value: true,
            //         message: 'This field is required.'
            //     },
            //     custom: {
            //         isValid: (value) => value?.length ? value.length < 6 : true,
            //         message: 'Supply must not exceed 5 numbers.'
            //     }
            // },
        },
        onSubmit: () => { alert('Asset submitted!'); console.log(data); }, // Open modal
        initialValues: {
            offer_amount: 0,
            // offer_expiration: 0
        },
    })

    return (
        <Box
            as='section'
            style={{width: '646px', padding: '24px', margin: '0px auto'}}
            maxWidth='full'
        >
            <OfferAmountFormSection 
                handleChange={handleChange}
                validate={validate}
                errors={errors}
                data={data}
                tokens={tokens}
                setData={setData}
                wethValue={wethValue}
            />

            <OfferExpirationFormSection
                handleChange={handleChange}
                validate={validate}
                errors={errors}
                data={data}
            />
        </Box>
    )
}