import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { useAccount, useSigner } from 'wagmi'
import { useSeaport } from '../../hooks/useSeaport'
import { Button } from './Button'
import { mintERC721 , ownerOfERC721 } from '../../utils/minting'
import { parseEther } from 'ethers/lib/utils'
import { ItemType } from '../../types/orderTypes'
import { EventTypes } from '../../types/eventTypes'
import { Spinner } from '../Spinner/Spinner'
import { Text } from '../Text/Text'
import { useEvents } from '../../hooks/useEvents'
import { BigNumber } from 'ethers'

const contractAddresses = require('../../utils/contractAddresses.json')

type Props = {
    nftid: BigNumber
    price: string
    onClose: () => void
}

export const SellAssetButton: React.FC<Props> = ({ 
    nftid,
    price,
    onClose,
}: Props) => {
    const [sellingStatus, setSellingStatus] = useState(0)
    const { seaport } = useSeaport()
    const { address } = useAccount()
    const { addEvent } = useEvents()
    const { data: signer } = useSigner()
    
    const sell = async() => {
        if(price === '') {
            toast('Enter a price')
        } else if(
            typeof seaport !== 'undefined' && 
            typeof signer !== 'undefined' &&
            typeof address !== 'undefined' &&
            price !== '' &&
            signer !== null
        ) {
            try {
                setSellingStatus(1)
                const owner = await ownerOfERC721(signer, nftid)
                let nftID
                if(typeof owner === 'undefined') {
                    nftID = await mintERC721(signer, address, nftid)
                } else {
                    nftID = nftid
                }
                console.log('After minting NFT')

                if(typeof nftID !== 'undefined' && typeof address !== 'undefined') {
                    console.log('Before createOrder')
                    console.log(price)
                    const { executeAllActions } = await seaport.createOrder({
                        offer: [
                        {
                            itemType: ItemType.ERC721,
                            token: contractAddresses.TestERC721,
                            identifier: nftID.toString()
                        }
                        ],
                        consideration: [
                        {
                            amount: parseEther(price).toString(),
                            token: contractAddresses.TestERC20,
                            recipient: address
                        }
                        ]
                    })
                    setSellingStatus(2)

                    console.log('Before executeAllActions')
                    const executedOrder = await executeAllActions()
                    console.log('After executedOrder')
                    addEvent(
                        EventTypes.listed,
                        {
                            contract_address: contractAddresses.TestERC721,
                            token_id: BigNumber.from(nftID)
                        },
                        new Date(),
                        address,
                        '',
                        false,
                        'ETH',
                        1,
                        price,
                        executedOrder
                    )
                    // router.push('/profile')
                    setSellingStatus(3)
                }
            } catch {
                setSellingStatus(0)
            }
        }
    }

  return (
    <Button onClick={() => { 
        if(sellingStatus === 0) { 
            sell() 
        } else if(sellingStatus === 3) {
            onClose()
        } 
    }}>
        {sellingStatus === 0
            ?
                <Text
                    color='accentColorText'
                    size='16'
                    weight='bold'
                >
                    Complete listing
                </Text>
            : sellingStatus === 3
                ? 
                    <Text
                        color='accentColorText'
                        size='16'
                        weight='bold'
                    >
                        Complete listing
                    </Text>
                : <Spinner /> 
        }
        {/* {sellingStatus > 0 && sellingStatus < 3
            ? <Spinner /> 
            : 
                <Text
                    color='accentColorText'
                    size='16'
                    weight='bold'
                >
                    Sell
                </Text>
        } */}
    </Button>
  )
}