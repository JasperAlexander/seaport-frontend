import contractAddresses from '../utils/contractAddresses.json'
import { Seaport } from '@opensea/seaport-js'
import { ethers } from 'ethers'
import useMounted from './useMounted'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { ItemType, OrderType } from '../types/orderTypes'
import { ListAssetFormType } from '../components/Forms/ListAssetForm'
import useApi from './useApi'
import { EventTypes } from '../types/eventTypes'
import { AssetReadType } from '../types/assetTypes'

export default function useSeaport() {
    const { mounted } = useMounted()
    const { saveOrder, saveEvent, updateOrder } = useApi()

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

    
    const createOrder = async (
        {
            asset,
            from_account,
            to_account,
            startAmount,
            endAmount,
            payment_token,
            duration
        }: ListAssetFormType, 
        listingStatus: number,
        setListingStatus: Dispatch<SetStateAction<number>>,
        setLoadingStatus: Dispatch<SetStateAction<boolean>>
    ) => {
        if (from_account?.length !== 42 
            || payment_token?.length !== 42
            || asset?.asset_contract?.address?.length !== 42
        ) return

        const start_time = Math.floor(Date.now() / 1000).toString()
        const end_time = (Math.floor(Date.now() / 1000) + Number(duration)).toString()

        try {
            setLoadingStatus(true)
            setListingStatus(1)
            
            const { executeAllActions } = await seaport.createOrder({
                endTime: end_time.toString(),
                offer: [
                    {
                        itemType: ItemType.ERC721,
                        token: asset.asset_contract.address,
                        identifier: asset.token_id
                    }
                ],
                consideration: [
                    {
                        amount: startAmount,
                        token: payment_token,
                        recipient: from_account
                    }
                ],
                // fees: [{ recipient: zone.address, basisPoints: 250 }], // 2.5%
            })

            try {
                const receipt = await executeAllActions()

                saveOrder(
                    start_time,
                    end_time,
                    receipt
                )
                saveEvent({
                    type: EventTypes.Created,
                    asset: asset,
                    from_account: from_account,
                    to_account: to_account,
                    start_time: start_time,
                    end_time: end_time,
                    start_amount: startAmount,
                    end_amount: endAmount === '' ? startAmount : endAmount,
                    payment_token: payment_token,
                    is_private: false
                })

                setListingStatus(10)
            } catch (error) {
                // setListingStatus(listingStatus)
                console.log(error)
            }
        } catch (error) {
            // setListingStatus(listingStatus)
            console.log(error)
        } finally {
            setLoadingStatus(false)
        }
    }

    const fulfillOrder = async (
        order: OrderType,
        from_account: string,
        asset: AssetReadType
    ) => {
        try {
            const { executeAllActions } = await seaport.fulfillOrder({
                order
            })

            const receipt = await executeAllActions()

            updateOrder(
                false,
                true,
                order
            )
            saveEvent({
                type: EventTypes.Succesfull,
                asset: asset,
                from_account,
                to_account: order.parameters.offerer,
                start_time: order.listing_time,
                end_time: order.expiration_time,
                start_amount: order.parameters.consideration[0].startAmount,
                end_amount: order.parameters.consideration[0].endAmount,
                payment_token: order.parameters.consideration[0].token,
                is_private: false
            })
        } catch (error) {
            console.log(error)
        }
    }

    const cancelOrder = async (
        order: OrderType,
        from_account: string,
        asset: AssetReadType
    ) => {
        try {
            const receipt = await seaport.cancelOrders(
                [order.parameters],
                order.parameters.offerer
            ).transact()

            console.log(receipt)
            // console.log('executeAllActions', executeAllActions)
            // const receipt = await executeAllActions()

            updateOrder(
                true,
                false,
                order
            )
            saveEvent({
                type: EventTypes.Cancelled,
                asset: asset,
                from_account,
                to_account: order.parameters.offerer,
                start_time: order.listing_time,
                end_time: order.expiration_time,
                start_amount: order.parameters.consideration[0].startAmount,
                end_amount: order.parameters.consideration[0].endAmount,
                payment_token: order.parameters.consideration[0].token,
                is_private: false
            })
        } catch (error) {
            console.log(error)
        }
    }

    return {
        seaport,
        error,
        loading,
        createOrder,
        fulfillOrder,
        cancelOrder
    }
}