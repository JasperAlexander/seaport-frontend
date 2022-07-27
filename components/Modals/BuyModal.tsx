import { OrderWithCounter } from '../../types/orderTypes'
import { Modal } from './Modal'
import { Text } from '../Text/Text'
import { Box } from '../Box/Box'
import { AssetType } from '../../types/assetTypes'
import { BuyAssetButton } from '../Buttons/BuyAssetButton'

type Props = {
    asset: AssetType,
    order: OrderWithCounter,
    onClose: () => void,
    open: boolean
}

export const BuyModal: React.FC<Props> = ({ 
    asset,
    order,
    onClose,
    open
}: Props) => {
    return (
        <Modal onClose={onClose} open={open}>
            <Box marginTop='2'>
                <Text textAlign='center' weight='bold'>Complete checkout</Text>
            </Box>
            <Box display='flex' flexDirection='column' padding='10'>
                <Text as='span' weight='bold'>Item</Text>
                <Text as='span'>{asset.name}</Text>
            </Box>
            <BuyAssetButton order={order} onClose={onClose} />
            {/* <Button label='Buy NFT' onClick={() => buy()} /> */}
        </Modal>
    )
}
