import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { useAccount, useSigner } from 'wagmi'
import { useStore } from '../../hooks/useStore'
import { Button } from './Button'
import { mintERC721 , ownerOfERC721 } from '../../utils/minting'
import { parseEther } from 'ethers/lib/utils'
import { ItemType } from '../../types/orderTypes'
import { Spinner } from '../Spinner/Spinner'
import { Text } from '../Text/Text'

const contractAddresses = require('../../utils/contractAddresses.json')

type Props = {
    nftid: string
    price: string
    onClose: () => void
}

export const SellButton: React.FC<Props> = ({ 
    nftid,
    price,
    onClose,
}: Props) => {
    const [sellingStatus, setSellingStatus] = useState(0)
    const { seaport, updateOrder } = useStore()
    const { address } = useAccount()
    const { data: signer } = useSigner()
    
    const sell = async() => {
        if(price === '') {
            toast('Enter a price')
        } else if(
            typeof seaport !== 'undefined' && 
            typeof nftid === 'string' && 
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

                if(typeof nftID !== 'undefined' && typeof address !== 'undefined') {
                    const { executeAllActions } = await seaport.createOrder({
                        offer: [
                        {
                            itemType: ItemType.ERC721,
                            token: contractAddresses.TestERC721,
                            identifier: nftID
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

                    const executedOrder = await executeAllActions()
                    updateOrder(nftID, executedOrder)
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
                    color='accentColorForeground'
                    size='16'
                    weight='bold'
                >
                    Sell
                </Text>
            : sellingStatus === 3
                ? 
                    <Text
                        color='accentColorForeground'
                        size='16'
                        weight='bold'
                    >
                        Sell
                    </Text>
                : <Spinner /> 
        }
        {/* {sellingStatus > 0 && sellingStatus < 3
            ? <Spinner /> 
            : 
                <Text
                    color='accentColorForeground'
                    size='16'
                    weight='bold'
                >
                    Sell
                </Text>
        } */}
    </Button>
  )
}