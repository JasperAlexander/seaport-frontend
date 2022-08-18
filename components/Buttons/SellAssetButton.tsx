import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { useAccount, useSigner } from 'wagmi'
import useSeaport from '../../hooks/useSeaport'
import { mintERC721 , ownerOfERC721 } from '../../utils/minting'
import { parseEther } from 'ethers/lib/utils'
import { ItemType } from '../../types/orderTypes'
import { EventTypes } from '../../types/eventTypes'
import { Spinner } from '../Spinner/Spinner'
import { BigNumber } from 'ethers'
import { Box } from '../Box/Box'

const contractAddresses = require('../../utils/contractAddresses.json')

type Props = {
    nftid: BigNumber | string
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
    const { data: signer } = useSigner()

    const nftIDBN = BigNumber.from(nftid)
    
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
                const owner = await ownerOfERC721(signer, nftIDBN)
                let nftID
                if(typeof owner === 'undefined') {
                    nftID = await mintERC721(signer, address, nftIDBN)
                } else {
                    nftID = nftIDBN
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

                    const executedOrder = await executeAllActions()
                    // router.push('/profile')
                    setSellingStatus(3)
                }
            } catch {
                setSellingStatus(0)
            }
        }
    }

  return (
    <p>
        Test
    </p>
    // <Button onClick={() => { 
    //     if(sellingStatus === 0) { 
    //         sell() 
    //     } else if(sellingStatus === 3) {
    //         onClose()
    //     } 
    // }}>
    //     {sellingStatus === 0
    //         ?
    //             <Box
    //                 color='accentColorText'
    //                 fontSize='16'
    //                 weight='700'
    //             >
    //                 Complete listing
    //             </Box>
    //         : sellingStatus === 3
    //             ? 
    //                 <Box
    //                     color='accentColorText'
    //                     fontSize='16'
    //                     weight='700'
    //                 >
    //                     Complete listing
    //                 </Box>
    //             : <Spinner /> 
    //     }
    //     {/* {sellingStatus > 0 && sellingStatus < 3
    //         ? <Spinner /> 
    //         : 
    //             <Text
    //                 color='accentColorText'
    //                 size='16'
    //                 weight='700'
    //             >
    //                 Sell
    //             </Text>
    //     } */}
    // </Button>
  )
}