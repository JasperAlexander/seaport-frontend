import React from 'react'
import toast from 'react-hot-toast'
import { useAccount } from 'wagmi'
import { useSeaport } from '../../hooks/useSeaport'
import { Seaport } from '@opensea/seaport-js'
import { Button } from './Button'
import { ethers } from 'ethers'
import { OrderWithCounter } from '../../types/orderTypes'
import { EventTypes } from '../../types/eventTypes'
import { useEvents } from '../../hooks/useEvents'
import router from 'next/router'
import { BigNumber } from 'ethers'

const contractAddresses = require('../../utils/contractAddresses.json')

type Props = {
    order: OrderWithCounter | undefined
    onClose: () => void
}

export const BuyAssetButton: React.FC<Props> = ({ 
    order,
    onClose,
}: Props) => {
    const { seaport, setSeaport } = useSeaport()
    const { address } = useAccount()
    const { addEvent } = useEvents()

    const buy = async() => {
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

        if(
            typeof seaport !== 'undefined' && 
            // typeof selectedOrder !== 'undefined' && 
            // typeof selectedOrder.order !== 'undefined' &&
            typeof address !== 'undefined' &&
            order
        ) {
            try {
                const { executeAllActions: executeAllFulfillActions } = await seaport.fulfillOrder({
                    order: order,
                    accountAddress: address,
                })
                const transaction = await executeAllFulfillActions()
                await transaction.wait()

                // updateOrder(NFTID, undefined)
                // updateOrderMeta(NFTID, address)
                addEvent(
                    EventTypes.transfer,
                    {
                        contract_address: order.parameters.consideration[0].token,
                        token_id: BigNumber.from(order.parameters.offer[0].identifierOrCriteria)
                    },
                    new Date(),
                    address,
                    order.parameters.offerer,
                    false
                )
                router.push('/profile')
            } catch(e: any) {
                toast.error(e.message)
            }
        }
    }

    return (
        <Button 
            label='Complete purchase' 
            onClick={() => buy()} 
        /> 
    )
}