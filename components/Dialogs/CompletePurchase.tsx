import { Dispatch, FC, Fragment, SetStateAction } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { Box } from '../Box/Box'
import { CompletePurchaseDialogContent } from '../DiaglogContents/CompletePurchaseDialogContent'
import { AssetType } from '../../types/assetTypes'

interface Props {
    open: boolean
    setOpen: Dispatch<SetStateAction<boolean>>
    data: AssetType
}

export const CompletePurchaseDialog: FC<Props> = ({
    open,
    setOpen,
    data
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
            <CompletePurchaseDialogContent 
                open={open} 
                setOpen={setOpen} 
                data={data}
            />
        </Fragment>
    )
}