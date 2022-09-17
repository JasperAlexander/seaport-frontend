import { Dispatch, FC, ReactNode, SetStateAction } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { AssetReadType } from '../../types/assetTypes'
import { Box } from '../Box/Box'
import { CompletePurchaseDialogContent } from '../DiaglogContents/CompletePurchaseDialogContent'
import * as styles from './DialogTrigger.css'
import { OrderType } from '../../types/orderTypes'

interface Props {
    children: ReactNode
    open: boolean
    setOpen: Dispatch<SetStateAction<boolean>>
    asset: AssetReadType
    order: OrderType
}

export const CompletePurchaseDialogTrigger: FC<Props> = ({
    children,
    open,
    setOpen,
    asset,
    order
}) => {
    return (
        <Dialog.Root 
            open={open} 
            onOpenChange={setOpen}
        >
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
            <CompletePurchaseDialogContent 
                open={open} 
                setOpen={setOpen} 
                asset={asset}
                order={order}
            />
        </Dialog.Root>
    )
}