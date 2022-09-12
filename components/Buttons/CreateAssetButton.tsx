import { AssetInputType, AssetType } from '../../types/assetTypes'
import { useAccount } from 'wagmi'
import router from 'next/router'
import { randomBN } from '../../utils/encoding'
import { EventType, EventTypes } from '../../types/eventTypes'
import useMounted from '../../hooks/useMounted'
// import { useCurrentUser } from '../../hooks/useCurrentUser'
// import { UserType } from '../../types/userTypes'

const API_BASE = process.env.NEXT_PUBLIC_API_BASE

const addAsset = async(inputState: AssetInputType, address: string) => {
    const href = `${API_BASE}/api/v1/assets/create/`

    const options = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            token_id: randomBN().toString(),
            name: inputState.name,
            description: inputState.description,
            image_url: inputState.image_url,
            external_link: inputState.external_link,
            asset_contract: inputState.asset_contract,
            collection: inputState.collection,
            owner: '2',
            // creator: '2',
            // owner: address.toString(),
            creator: address.toString(),
            last_sale: null,
            transfer_fee: inputState.transfer_fee,
            transfer_fee_payment_token: inputState.transfer_fee_payment_token,
            orders: null,
            is_nsfw: inputState.is_nsfw
        })
    }

    const res = await fetch(href, options)

    console.log('POST done with response: ', res)

    return res.json()
}

const addEvent = async(inputState: AssetInputType) => {
    const href = `${API_BASE}/api/v1/events/create/`

    const options = {
        method: 'POST',
        // headers: {

        // },
        body: JSON.stringify({
            type: EventTypes.Created
        })
    }

    const res = await fetch(href, options)

    return res.json()
}

export function CreateAssetButton({
    inputState,
    // mutate
}: {
    inputState: AssetInputType
    // mutate: any
}) {
    const { mounted } = useMounted()
    const { address } = useAccount()
    // const { user } = useCurrentUser()

    return (
        // <Button
        //     label='Create Asset'
        //     onClick={() => { 
        //         mounted && address && ( 
        //             addAsset(inputState, address),
        //             addEvent(inputState),
        //             // mutate()
        //             router.push(`/${address}`) 
        //         )
        //     }}
        // />
        <p>test</p>
    )
}