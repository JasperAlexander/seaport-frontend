import { OrderWithMeta } from '../types/orderTypes'
import { useStore } from '../hooks/useStore'
import { useAccount, useSigner } from 'wagmi'
import { useRouter } from 'next/router'
import { ethers } from 'ethers'
import { Seaport } from '@opensea/seaport-js'
import toast from 'react-hot-toast'
import { Modal } from './Modal/Modal'
import { useState } from 'react'
import { parseEther } from 'ethers/lib/utils'
import { ItemType } from '../types/orderTypes'
import { mintERC721 , ownerOfERC721 } from '../utils/minting'

const contractAddresses = require('../utils/contractAddresses.json')

type Props = {
    nftid: string
    order: OrderWithMeta,
    onClose: () => void,
    open: boolean
}

export const SellModal: React.FC<Props> = ({ 
    nftid,
    onClose,
    open
}: Props) => {

    const { seaport, setSeaport, updateOrder } = useStore()
    const { address } = useAccount()
    const router = useRouter()
    const { data: signer } = useSigner()

    const [inputState, setInputState] = useState({
        price: ''
    })

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputState({
            ...inputState,
            [e.target.name]: e.target.value
        })
    }

    if(typeof window !== 'undefined' && typeof seaport === 'undefined') {
        const provider = new ethers.providers.Web3Provider((window as any).ethereum);
        const newSeaport = new Seaport(
            provider, {
                overrides: {
                    contractAddress: contractAddresses.Seaport
                }
            }
        )
        setSeaport(newSeaport)
        console.log('Seaport initialised')
    }
    
    const sell = async() => {
        if(inputState.price === '') {
            toast('Enter a price')
        } else if(
            typeof seaport !== 'undefined' && 
            typeof nftid === 'string' && 
            typeof signer !== 'undefined' &&
            typeof address !== 'undefined' &&
            inputState.price !== '' &&
            signer !== null
        ) {
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
                        amount: parseEther(inputState.price).toString(),
                        token: contractAddresses.TestERC20,
                        recipient: address
                    }
                    ]
                })

                const executedOrder = await executeAllActions()
                updateOrder(nftID, executedOrder)
                router.push('/profile')
            }
        }
    }

    return (
        <Modal onClose={onClose} open={open}>
            <h1>List NFT for sale</h1>

            <label>Price</label>
            <input type='number' min='0' name='price' value={inputState.price} onChange={handleInputChange} />

            <button type='button' onClick={() => sell()}>Sell</button>
        </Modal>
    )
}
