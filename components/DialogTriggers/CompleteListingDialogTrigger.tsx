import { Dispatch, FC, ReactNode, SetStateAction } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { ListAssetFormType } from '../Forms/ListAssetForm'
import useSeaport from '../../hooks/useSeaport'
import { Box } from '../Box/Box'
import { CompleteListingDialogContent } from '../DiaglogContents/CompleteListingDialogContent'

interface Props {
    children: ReactNode
    open: boolean
    setOpen: Dispatch<SetStateAction<boolean>>
    data: ListAssetFormType
}

export const CompleteListingDialogTrigger: FC<Props> = ({
    children,
    open,
    setOpen,
    data
}) => {
    const { listingStatus } = useSeaport()

    return (
        <Dialog.Root open={open} onOpenChange={setOpen}>
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
            <CompleteListingDialogContent 
                open={open} 
                setOpen={setOpen} 
                asset={data?.asset}
                listingStatus={listingStatus}
            />
        </Dialog.Root>
    )
}