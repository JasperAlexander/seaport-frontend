import { Dispatch, FC, Fragment, SetStateAction } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { Box } from '../Box/Box'
import { WalletSideDialogContent } from '../DiaglogContents/WalletSideDialogContent'

interface Props {
    open: boolean
    setOpen: Dispatch<SetStateAction<boolean>>
}

export const WalletSideDialog: FC<Props> = ({
    open,
    setOpen
}) => {
    return (
        <Fragment>
            <Dialog.Overlay asChild={true}>
                <Box 
                    position='fixed'
                    inset='0'
                    style={{backgroundColor: 'rgba(0, 0, 0, 0.15)', zIndex: '800'}}
                />
            </Dialog.Overlay>
            <WalletSideDialogContent open={open} setOpen={setOpen} />
        </Fragment>
    )
}