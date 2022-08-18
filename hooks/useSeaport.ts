import contractAddresses from '../utils/contractAddresses.json'
import { Seaport } from '@opensea/seaport-js'
import { ethers } from 'ethers'
import useMounted from './useMounted'
import { useEffect, useState } from 'react'
import { mintERC721, ownerOfERC721 } from '../utils/minting'
import { parseEther } from 'ethers/lib/utils'
import { ItemType } from '../types/orderTypes'
import { ListAssetFormType } from '../components/Forms/ListAssetForm'
import useApi from './useApi'

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

    
    const [listingStatus, setListingStatus] = useState<number>(0)
    const createOrder = async ({
        asset,
        price,
        payment_token
    }: ListAssetFormType) => {
        try {
            setListingStatus(1)
            
            // const owner = await ownerOfERC721(signer, nftIDBN)
            // let nftID
            // if(typeof owner === 'undefined') {
            //     nftID = await mintERC721(signer, address, nftIDBN)
            // } else {
            //     nftID = nftIDBN
            // }

            // Add some checks
            const { executeAllActions } = await seaport.createOrder({
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
                        token: '0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9', // payment_token,
                        recipient: asset.owner.address
                    }
                ]
            })
            setListingStatus(2)
            const executedOrder = await executeAllActions()
            saveOrder(executedOrder)
            setListingStatus(3)
        } catch {
            setListingStatus(0)
        }
    }

    const [fulfillingStatus, setFulfillingStatus] = useState<number>(0)
    const fulfillOrder = async ({
        
    }) => {
        try {

        } catch {
            
        }
    }

    return {
        seaport,
        error,
        loading,
        listingStatus,
        createOrder,
        fulfillOrder
    }
}