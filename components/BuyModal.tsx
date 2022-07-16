import { OrderWithMeta } from '../types/orderTypes'
import { useStore } from '../hooks/useStore'
import { useAccount } from 'wagmi'
import { useRouter } from 'next/router'
import { ethers } from 'ethers'
import { Seaport } from '@opensea/seaport-js'
import toast from 'react-hot-toast'
import { Modal } from './Modal/Modal'

const contractAddresses = require('../utils/contractAddresses.json')

type Props = {
    order: OrderWithMeta,
    onClose: () => void,
    open: boolean
}

export const BuyModal: React.FC<Props> = ({ 
    order,
    onClose,
    open
}: Props) => {

    const { orders, seaport, setSeaport, updateOrderMeta, updateOrder } = useStore()
    const { address } = useAccount()
    const router = useRouter()

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
    
    const buy = async(NFTID: string) => {
        const selectedOrder = orders.find((order) => {
            return order.meta.NFTID === NFTID
        })

        if(
            typeof seaport !== 'undefined' && 
            typeof selectedOrder !== 'undefined' && 
            typeof selectedOrder.order !== 'undefined' &&
            typeof address !== 'undefined'
        ) {
            try {
                const { executeAllActions: executeAllFulfillActions } = await seaport.fulfillOrder({
                    order: selectedOrder.order,
                    accountAddress: address,
                })
                const transaction = await executeAllFulfillActions()
                await transaction.wait()
                updateOrder(NFTID, undefined)
                updateOrderMeta(NFTID, address)
                router.push('/profile')
            } catch(e: any) {
                toast.error(e.message)
            }
        }
    }

    return (
        <Modal onClose={onClose} open={open}>
            <button type='button' onClick={() => buy(order.meta.NFTID)}>Buy NFT</button>
        </Modal>
    )
}
