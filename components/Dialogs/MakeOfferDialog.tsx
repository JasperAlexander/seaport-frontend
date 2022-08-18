import { Dispatch, FC, Fragment, SetStateAction } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { MakeOfferDialogContent } from '../DiaglogContents/MakeOfferDialogContent'
import { Box } from '../Box/Box'

interface Props {
    open: boolean
    setOpen: Dispatch<SetStateAction<boolean>>
}

export const MakeOfferDialog: FC<Props> = ({
    open,
    setOpen
}) => {
    return (
        <Fragment>
        {/* // <Dialog.Portal> */}
            <Dialog.Overlay asChild={true}>
                <Box 
                    position='fixed'
                    inset='0'
                    style={{backgroundColor: 'rgba(0, 0, 0, 0.15)', zIndex: '800'}}
                />
            </Dialog.Overlay>
            <MakeOfferDialogContent open={open} setOpen={setOpen} />
        {/* // </Dialog.Portal> */}
        </Fragment>
    )
}