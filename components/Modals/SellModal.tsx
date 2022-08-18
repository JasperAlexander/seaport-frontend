import { ChangeEvent, FC } from 'react'
import { BigNumber } from 'ethers'
import { Modal } from './Modal'
import { useState } from 'react'
import { Box } from '../Box/Box'
import { SellAssetButton } from '../Buttons/SellAssetButton'
import { Input } from '../Input/Input'
import { AssetType } from '../../types/assetTypes'

type Props = {
    nftid: BigNumber | string
    asset: AssetType,
    onClose: () => void,
    open: boolean
}

export const SellModal: FC<Props> = ({ 
    nftid,
    asset,
    onClose,
    open
}) => {
    const [inputState, setInputState] = useState({
        price: ''
    })

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInputState({
            ...inputState,
            [e.target.name]: e.target.value
        })
    }

    return (
        <Modal onClose={onClose} open={open}>
            <Box marginTop='2'>
                <Box textAlign='center' fontWeight='700'>List asset for sale</Box>
            </Box>
            <Box as='label'>Price</Box>
            {/* <Input
                type='number'
                name='price' 
                value={inputState.price} 
                onChange={handleInputChange} 
                min='0'
            /> */}
            <SellAssetButton nftid={nftid} price={inputState.price} onClose={onClose} />
        </Modal>
    )
}
