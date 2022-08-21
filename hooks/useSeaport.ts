import contractAddresses from '../utils/contractAddresses.json'
import { Seaport } from '@opensea/seaport-js'
import { ethers } from 'ethers'
import useMounted from './useMounted'
import { useEffect, useState } from 'react'
import { mintERC721, ownerOfERC721 } from '../utils/minting'
import { parseEther } from 'ethers/lib/utils'
import { ItemType, OrderType } from '../types/orderTypes'
import { ListAssetFormType } from '../components/Forms/ListAssetForm'
import useApi from './useApi'
import { EventTypes } from '../types/eventTypes'

export default function useSeaport() {
    const { mounted } = useMounted()
    const { saveOrder, saveEvent } = useApi()

    const [seaport, setSeaport] = useState<any>(null)
    const [error, setError] = useState<any>(null)
    const [loading, setLoading] = useState<boolean>(false)

    const seaportAddress = contractAddresses.Seaport

    useEffect(() => {
        if (!seaportAddress || !mounted) return

        try {
            setLoading(true)
            const provider = new ethers.providers.Web3Provider((window as any).ethereum)
            const newSeaport = new Seaport(
                provider, {
                    overrides: {
                        contractAddress: seaportAddress
                    }
                }
            )
            setSeaport(newSeaport)
        } catch(err) {
            setError(err)
        } finally {
            setLoading(false)
        }
    }, [mounted])

    
    const [listingStatus, setListingStatus] = useState<number>(1)
    const createOrder = async ({
        asset,
        from_account,
        signer,
        price,
        payment_token,
        duration
    }: ListAssetFormType) => {
        try {
            console.log('inside createOrder with seaport: ', seaport)
            const { executeAllActions } = await seaport.createOrder({
                endTime: (Math.floor(Date.now() / 1000) + Number(duration)).toString(),
                offer: [
                    {
                        itemType: ItemType.ERC721,
                        token: asset.asset_contract.address,
                        identifier: asset.token_id
                    }
                ],
                consideration: [
                    {
                        amount: price.toString(), // parseEther? Don't forget floats (using Number())
                        token: payment_token, // payment_token,
                        recipient: asset.owner.address
                    }
                ]
            })

            console.log('executeAllActions', executeAllActions)
            let receipt
            try {
                receipt = await executeAllActions()
            } catch(err) {
                console.log(err)
            }
            console.log('receipt', receipt)
            saveOrder(receipt)
            saveEvent({
                type: EventTypes.Created,
                asset: asset,
                from_account: from_account,
                start_time: Math.floor(Date.now() / 1000).toString(),
                end_time: (Math.floor(Date.now() / 1000) + Number(duration)).toString(),
                start_amount: price.toString(),
                end_amount: price.toString(),
                payment_token: payment_token,
                is_private: false
            })
        } catch {
            setListingStatus(-1)
        } finally {
            setListingStatus(10)
        }
    }

    const [fulfillingStatus, setFulfillingStatus] = useState<number>(0)
    const fulfillOrder = async () => {
        try {

        } catch {
            
        }
    }

    const [cancellingStatus, setCancellingStatus] = useState<number>(0)
    const cancelOrder = async (
        // order: FlatOrderType
    ) => {
        try {
            // const orderParameters = {orderParameters: (delete order['signature'], order)}
        } catch {
            
        }
    }

    return {
        seaport,
        error,
        loading,
        listingStatus,
        createOrder,
        fulfillOrder,
        cancelOrder
    }
}