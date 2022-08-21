import { Dispatch, FC, ReactNode, SetStateAction } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { AssetType } from '../../types/assetTypes'
import { Box } from '../Box/Box'
import { CompletePurchaseDialogContent } from '../DiaglogContents/CompletePurchaseDialogContent'

interface Props {
    children: ReactNode
    open: boolean
    setOpen: Dispatch<SetStateAction<boolean>>
    data: AssetType
}

export const CompletePurchaseDialogTrigger: FC<Props> = ({
    children,
    open,
    setOpen,
    data
}) => {
    return (
        <Dialog.Root 
            open={open} 
            onOpenChange={setOpen}
        >
            <Dialog.Trigger asChild={true}>
                {children}
            </Dialog.Trigger>
            <Dialog.Overlay asChild={true}>
                <Box 
                    position='fixed'
                    inset='0'
                    style={{backgroundColor: 'rgba(0, 0, 0, 0.15)', zIndex: '800'}}
                />
            </Dialog.Overlay>
            <CompletePurchaseDialogContent 
                open={open} 
                setOpen={setOpen} 
                data={data}
            />
        </Dialog.Root>
    )
}