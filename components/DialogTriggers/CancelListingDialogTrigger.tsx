import { Dispatch, FC, ReactNode, SetStateAction } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { Box } from '../Box/Box'
import { CancelListingDialogContent } from '../DiaglogContents/CancelListingDialogContent'
import { AssetReadType } from '../../types/assetTypes'
import { OrderType } from '../../types/orderTypes'
import * as styles from './DialogTrigger.css'

interface Props {
    children: ReactNode
    open: boolean
    setOpen: Dispatch<SetStateAction<boolean>>
    asset: AssetReadType
    order: OrderType 
}

export const CancelListingDialogTrigger: FC<Props> = ({
    children,
    open,
    setOpen,
    asset,
    order
}) => {
    return (
        <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Trigger 
                asChild={true}
            >
                {children}
            </Dialog.Trigger>
            <Dialog.Overlay 
                asChild={true}
            >
                <Box 
                    className={styles.dialogTriggerOverlay}
                />
            </Dialog.Overlay>
            <CancelListingDialogContent 
                open={open} 
                setOpen={setOpen} 
                asset={asset}
                order={order}
            />
        </Dialog.Root>
    )
}