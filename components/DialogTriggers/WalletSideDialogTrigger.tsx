import { Dispatch, FC, SetStateAction } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { Box } from '../Box/Box'
import { WalletSideDialog } from '../Dialogs/WalletSideDialog'

interface Props {
    open: boolean
    setOpen: Dispatch<SetStateAction<boolean>>
}

export const WalletSideDialogTrigger: FC<Props> = ({
    open,
    setOpen
}) => {
    return (
        <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Trigger asChild={true}>
                <Box
                    paddingX='10'
                    cursor='pointer'
                >
                    Wallet
                </Box>
            </Dialog.Trigger>
            <WalletSideDialog open={open} setOpen={setOpen} />
        </Dialog.Root>
    )
}