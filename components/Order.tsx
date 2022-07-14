import Link from 'next/link'
import { useRouter } from 'next/router'
import { OrderWithMeta } from '../types/orderTypes'
import { ethers } from 'ethers'
import { Seaport } from '@opensea/seaport-js'
import { useStore } from '../hooks/useStore'
import { useAccount } from 'wagmi'
import toast from 'react-hot-toast'
import { ETH } from './icons/ETH'

const contractAddresses = require('../utils/contractAddresses.json')

type Props = {
    order: OrderWithMeta
}

export const Order: React.FC<Props> = ({ order }: Props) => {
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
    <div className='order'>
        {order.meta.NFTimage 
            ? <img src={URL.createObjectURL(order.meta.NFTimage)} alt='NFT image' />
            : ''
        }

        <div className='NFTmeta'>
            <span className='NFTname'>{order.meta.NFTname}</span>
            {/* {order.meta.NFTdescription ? <span>{order.meta.NFTdescription}</span> : ''} */}
            {order.order 
                ? <span className='NFTprice'>
                    <ETH />
                    {order.order.parameters.consideration[0].startAmount}
                    ETH
                </span>
                // : <span>Not for sale</span>
                : <span className='NFTprice'>
                    <ETH />
                    2
                    ETH
                </span>
            }
        </div>

        {typeof order.order === 'undefined'
            ? typeof order.meta.NFTcreator !== 'undefined'
                ? order.meta.NFTcreator === address
                    ?
                        <Link href={'/sell/' + order.meta.NFTID}>
                            <a>Sell NFT</a>
                        </Link>
                    : <button type='button'>Not listed for sale</button>
                : ''
            : order.meta.NFTcreator !== address 
                ? <button type='button' onClick={() => buy(order.meta.NFTID)}>Buy NFT</button>
                : <button type='button' onClick={() => updateOrder(order.meta.NFTID, undefined)}>Cancel listing</button>
        }
    </div>
  )
}
