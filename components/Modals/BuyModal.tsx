import { Modal } from './Modal'
import { Box } from '../Box/Box'
import { AssetType } from '../../types/assetTypes'
import { BuyAssetButton } from '../Buttons/BuyAssetButton'
import { EthIcon } from '../Icons/EthIcon'
import { FC } from 'react'

type Props = {
    asset: AssetType,
    // order: OrderWithCounter,
    onClose: () => void,
    open: boolean
}

export const BuyModal: FC<Props> = ({ 
    asset,
    // order,
    onClose,
    open
}: Props) => {
    return (
        <Modal 
            onClose={onClose}
            open={open} 
            wide={true}
        >
            <Box 
                marginTop='-12'
            >
                <Box 
                    textAlign='center' 
                    fontWeight='700'
                >
                    Complete checkout
                </Box>
            </Box>
            <Box 
                display='flex' 
                flexDirection='column' 
                paddingTop='40'
                paddingBottom='10'
            >
                <Box
                    display='flex'
                    alignItems='center'
                    justifyContent='space-between'
                    paddingBottom='6'
                    fontWeight='600'
                >
                    <Box 
                        as='span' 
                        
                    >
                        Item
                    </Box>
                    <Box 
                        as='span' 
                    >
                        Total
                    </Box>
                </Box>
                <Box 
                    display='flex'
                    alignItems='center'
                    paddingY='16'
                    borderTopWidth='1'
                    borderBottomWidth='1'
                    borderStyle='solid'
                    borderColor='box'
                >
                    {asset.image_url 
                        ?
                            <Box
                                as='img' 
                                src={asset.image_url} 
                                alt='NFT image'
                                width='100'
                                height='100'
                                aspectRatio='1'
                                borderRadius='6'
                                borderWidth='1'
                                borderColor='box'
                            />
                        : ''
                    }
                    <Box
                        display='flex'
                        flexDirection='column'
                        marginX='10'
                        gap='2'
                    >
                        <Box
                            as='a'
                            cursor='pointer'
                            color='accentColor'
                            fontSize='14'
                        >
                            {asset.asset_contract.name}
                        </Box>
                        <Box
                            as='span'
                            fontWeight='600'
                        >
                            {asset.name}
                        </Box>
                        <Box
                            as='span'
                            color='boxText'
                            fontSize='14'
                        >
                            Creator fees: ...
                        </Box>
                    </Box>
                    <Box
                        display='flex'
                        flexDirection='column'
                        marginLeft='auto'
                    >
                        <Box
                            display='flex'
                            alignItems='center'
                            justifyContent='flex-end'
                            fontWeight='600'
                            gap='4'
                        >
                            <EthIcon width='12' />
                            0,035
                        </Box>
                        <Box
                            textAlign='right'
                            fontSize='14'
                        >
                            €2,00 sd
                        </Box>
                    </Box>
                </Box>
            </Box>
            {/* <BuyAssetButton 
                order={order} 
                onClose={onClose} 
            /> */}
            {/* <Button label='Buy NFT' onClick={() => buy()} /> */}
        </Modal>
    )
}
