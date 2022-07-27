import { useSeaport } from '../../hooks/useSeaport'
import { BigNumber, ethers } from 'ethers'
import { Seaport } from '@opensea/seaport-js'
import { Modal } from './Modal'
import { useState } from 'react'
import { Box } from '../Box/Box'
import { Text } from '../Text/Text'
import { SellAssetButton } from '../Buttons/SellAssetButton'
import { Input } from '../Input/Input'
import { AssetType } from '../../types/assetTypes'
import { sprinkles } from '../../styles/sprinkles.css'

const contractAddresses = require('../../utils/contractAddresses.json')

type Props = {
    nftid: BigNumber
    asset: AssetType,
    onClose: () => void,
    open: boolean
}

export const SellModal: React.FC<Props> = ({ 
    nftid,
    asset,
    onClose,
    open
}: Props) => {

    const { seaport, setSeaport } = useSeaport()

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
                <Text textAlign='center' weight='bold'>List asset for sale</Text>
            </Box>
            <Text as='label'>Price</Text>
            <Input
                type='number'
                name='price' 
                value={inputState.price} 
                onChange={handleInputChange} 
                min='0'
                // className={sprinkles({
                //     background: {
                //       hover: 'lightgray500'
                //     },
                //     borderColor: {
                //       hover: 'lightgray200',
                //       focus: 'lightgray200'
                //     }
                // })}
            />
            <SellAssetButton nftid={nftid} price={inputState.price} onClose={onClose} />
        </Modal>
    )
}
