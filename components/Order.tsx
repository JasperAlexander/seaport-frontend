import Link from 'next/link'
import { OrderWithMeta } from '../types/orderTypes'
import { ethers } from 'ethers'
import { Seaport } from '@opensea/seaport-js'
import { useStore } from '../hooks/useStore'

const contractAddresses = require('../utils/contractAddresses.json')

type Props = {
    order: OrderWithMeta,
    signerAddress: string
}

export const Order: React.FC<Props> = ({ order, signerAddress }: Props) => {
    const { orders, seaport, setSeaport } = useStore()

    if(typeof window !== 'undefined' && typeof seaport === 'undefined') {
        (window as any).ethereum.request({ method: 'eth_requestAccounts' });
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
        await (window as any).ethereum.request({ method: 'eth_requestAccounts' });
        const web3provider = new ethers.providers.Web3Provider((window as any).ethereum);
        const signer = web3provider.getSigner()
        const signerAddress = await signer.getAddress()

        const selectedOrder = orders.find((order) => {
            return order.meta.NFTID === NFTID
        })

        if(
            typeof seaport !== 'undefined' && 
            typeof selectedOrder !== 'undefined' && 
            typeof selectedOrder.order !== 'undefined'
        ) {
            const { executeAllActions: executeAllFulfillActions } = await seaport.fulfillOrder({
                order: selectedOrder.order,
                accountAddress: signerAddress,
            })

            const transaction = await executeAllFulfillActions()
            console.log(transaction)
        }
    }

    return (
    <div className='order'>
        {order.meta.NFTimage 
            ? <img src={URL.createObjectURL(order.meta.NFTimage)} alt='NFT image' />
            : ''
        }

        <span>{order.meta.NFTname}</span>

        {typeof order.order === 'undefined'
            ? typeof order.meta.NFTcreator !== 'undefined'
                ? order.meta.NFTcreator === signerAddress
                    ?
                        <Link href={'/sell/' + order.meta.NFTID}>
                            <a>Sell NFT</a>
                        </Link>
                    : <button type='button'>Not listed for sale</button>
                : ''
            : order.order.parameters.offerer !== signerAddress 
                ? <button type='button' onClick={() => buy(order.meta.NFTID)}>Buy NFT</button>
                : <button type='button'>Cancel listing</button>
        }
    </div>
  )
}
