import { Dispatch, FC, ReactNode, SetStateAction } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { Box } from '../Box/Box'
import { MenuSideDialogContent } from '../DiaglogContents/MenuSideDialogContent'

interface Props {
    children: ReactNode
    open: boolean
    setOpen: Dispatch<SetStateAction<boolean>>
}

export const MenuSideDialogTrigger: FC<Props> = ({
    children,
    open,
    setOpen
}) => {
    return (
        <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Trigger asChild={true}>
                {children}
            </Dialog.Trigger>
            <Dialog.Overlay asChild={true}>
                <Box 
                    position='fixed'
                    top='72'
                    left='0'
                    bottom='0'
                    right='0'
                    // inset='0'
                    style={{backgroundColor: 'rgba(0, 0, 0, 0.15)', zIndex: '800'}}
                />
            </Dialog.Overlay>
            <MenuSideDialogContent 
                open={open} 
                setOpen={setOpen} 
            />
        </Dialog.Root>
    )
}