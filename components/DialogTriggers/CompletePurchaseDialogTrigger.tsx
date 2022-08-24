import { Dispatch, FC, ReactNode, SetStateAction } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { AssetType } from '../../types/assetTypes'
import { Box } from '../Box/Box'
import { CompletePurchaseDialogContent } from '../DiaglogContents/CompletePurchaseDialogContent'
import * as styles from './DialogTrigger.css'

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
                data={data}
            />
        </Dialog.Root>
    )
}