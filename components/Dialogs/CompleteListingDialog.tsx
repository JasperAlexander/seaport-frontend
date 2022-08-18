import { Dispatch, FC, Fragment, SetStateAction } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { CompleteListingDialogContent } from '../DiaglogContents/CompleteListingDialogContent'
import { Box } from '../Box/Box'
import { AssetType } from '../../types/assetTypes'

interface Props {
    open: boolean
    setOpen: Dispatch<SetStateAction<boolean>>
    asset: AssetType
    listingStatus: number
}

export const CompleteListingDialog: FC<Props> = ({
    open,
    setOpen,
    asset,
    listingStatus
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
            <CompleteListingDialogContent 
                open={open} 
                setOpen={setOpen} 
                asset={asset}
                listingStatus={listingStatus}
            />
        {/* // </Dialog.Portal> */}
        </Fragment>
    )
}