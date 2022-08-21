import { Dispatch, FC, ReactNode, SetStateAction } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { Box } from '../Box/Box'
import { CancelListingDialogContent } from '../DiaglogContents/CancelListingDialogContent'
import { AssetType } from '../../types/assetTypes'
import { OrderType } from '../../types/orderTypes'

interface Props {
    children: ReactNode
    open: boolean
    setOpen: Dispatch<SetStateAction<boolean>>
    data: OrderType
}

export const CancelListingDialogTrigger: FC<Props> = ({
    children,
    open,
    setOpen,
    data
}) => {
    return (
        <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Trigger asChild={true}>
                {children}
            </Dialog.Trigger>
            <Dialog.Overlay asChild={true}>
                <Box 
                    position='fixed'
                    inset='0'
                    zIndex='800'
                    style={{backgroundColor: 'rgba(0, 0, 0, 0.15)'}}
                />
            </Dialog.Overlay>
            <CancelListingDialogContent 
                open={open} 
                setOpen={setOpen} 
                order={data}
            />
        </Dialog.Root>
    )
}