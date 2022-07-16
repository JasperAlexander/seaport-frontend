import Link from 'next/link'
import { OrderWithMeta } from '../types/orderTypes'
import { ethers } from 'ethers'
import { Seaport } from '@opensea/seaport-js'
import { useStore } from '../hooks/useStore'
import { useAccount } from 'wagmi'
import { ETH } from './icons/ETH'
import { useState, useCallback } from 'react'
import { BuyModal } from './BuyModal'
import { SellModal } from './SellModal'

const contractAddresses = require('../utils/contractAddresses.json')

type Props = {
    order: OrderWithMeta
}

export const Order: React.FC<Props> = ({ order }: Props) => {
    const { seaport, setSeaport, updateOrder } = useStore()
    const { address } = useAccount()

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

    const useBooleanState = (initialValue: boolean) => {
        const [value, setValue] = useState(initialValue)
        const setTrue = useCallback(() => setValue(true), [])
        const setFalse = useCallback(() => setValue(false), [])
    
        return { setFalse, setTrue, value }
      }

    const {
        setFalse: closeBuyModal,
        setTrue: openBuyModal,
        value: buyModalOpen,
    } = useBooleanState(false)

    const {
        setFalse: closeSellModal,
        setTrue: openSellModal,
        value: sellModalOpen,
    } = useBooleanState(false)

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
                    {ethers.utils.formatEther(order.order.parameters.consideration[0].startAmount)} 
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
                        // <Link href={'/sell/' + order.meta.NFTID}>
                        //     <a>Sell NFT</a>
                        // </Link>
                        <>
                        <button type='button' onClick={() => openSellModal()}>
                            Sell NFT
                        </button>
                        <SellModal nftid={order.meta.NFTID} order={order} onClose={closeSellModal} open={sellModalOpen} />
                        </>
                    : <button type='button'>Not listed for sale</button>
                : ''
            : order.meta.NFTcreator !== address 
                ? <>
                    <button type='button' onClick={() => openBuyModal()}>
                        Buy NFT
                    </button>
                    <BuyModal order={order} onClose={closeBuyModal} open={buyModalOpen} />
                </>
                : <button type='button' onClick={() => updateOrder(order.meta.NFTID, undefined)}>Cancel listing</button>
        }
    </div>
  )
}
