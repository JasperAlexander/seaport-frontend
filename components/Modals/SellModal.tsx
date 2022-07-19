import { OrderWithMeta } from '../../types/orderTypes'
import { useStore } from '../../hooks/useStore'
import { ethers } from 'ethers'
import { Seaport } from '@opensea/seaport-js'
import { Modal } from './Modal'
import { useState } from 'react'
import { touchableStyles } from '../../styles/touchableStyles'
import { Box } from '../Box/Box'
import { Text } from '../Text/Text'
import { SellButton } from '../Buttons/SellButton'
import { Input } from '../Input/Input'

const contractAddresses = require('../../utils/contractAddresses.json')

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

    const { seaport, setSeaport } = useStore()

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

    return (
        <Modal onClose={onClose} open={open}>
            <Box marginTop='2'>
                <Text textAlign='center' weight='bold'>List NFT for sale</Text>
            </Box>
            <Text as='label'>Price</Text>
            <Input
                type='number'
                name='price' 
                value={inputState.price} 
                onChange={handleInputChange} 
                min='0'
                className={touchableStyles({ 
                    hoverBackground: 'lightgray500', 
                    hoverBorderColor: 'gray', 
                    focusBorderColor: 'gray' 
                })}
            />
            <SellButton nftid={nftid} price={inputState.price} onClose={onClose} />
        </Modal>
    )
}
