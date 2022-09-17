import { Dispatch, FC, ReactNode, SetStateAction } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { ListAssetFormType } from '../Forms/ListAssetForm'
import { Box } from '../Box/Box'
import { CompleteListingDialogContent } from '../DiaglogContents/CompleteListingDialogContent'
import * as styles from './DialogTrigger.css'

interface Props {
    children: ReactNode
    open: boolean
    setOpen: Dispatch<SetStateAction<boolean>>
    formData: ListAssetFormType
    listingStatus: number
    setListingStatus: Dispatch<SetStateAction<number>>
    loadingStatus: boolean
    setLoadingStatus: Dispatch<SetStateAction<boolean>>
}

export const CompleteListingDialogTrigger: FC<Props> = ({
    children,
    open,
    setOpen,
    formData,
    listingStatus,
    setListingStatus,
    loadingStatus,
    setLoadingStatus
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
            <CompleteListingDialogContent 
                open={open} 
                setOpen={setOpen} 
                formData={formData}
                asset={formData?.asset}
                listingStatus={listingStatus}
                setListingStatus={setListingStatus}
                loadingStatus={loadingStatus}
                setLoadingStatus={setLoadingStatus}
            />
        </Dialog.Root>
    )
}