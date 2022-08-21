import { Dispatch, FC, ReactNode, SetStateAction } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { Box } from '../Box/Box'
import { MakeOfferDialogContent } from '../DiaglogContents/MakeOfferDialogContent'

interface Props {
    children: ReactNode
    open: boolean
    setOpen: Dispatch<SetStateAction<boolean>>
}

export const MakeOfferDialogTrigger: FC<Props> = ({
    children,
    open,
    setOpen
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
            <MakeOfferDialogContent 
                open={open} 
                setOpen={setOpen} 
            />
        </Dialog.Root>
    )
}