import { Dispatch, FC, SetStateAction, useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { MainButton } from '../Buttons/MainButton'
import { CompleteListingDialog } from '../Dialogs/CompleteListingDialog'
import { ListAssetFormType } from '../Forms/ListAssetForm'
import useSeaport from '../../hooks/useSeaport'

interface Props {
    open: boolean
    setOpen: Dispatch<SetStateAction<boolean>>
    disabled: boolean
    data: ListAssetFormType
}

export const CompleteListingDialogTrigger: FC<Props> = ({
    open,
    setOpen,
    disabled,
    data
}) => {
    const { listingStatus, createOrder } = useSeaport()

    return (
        <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Trigger asChild={true}>
                <MainButton
                    onClick={async() => { 
                        await createOrder(data)
                    }}
                    disabled={disabled || listingStatus > 0}
                >
                    Complete listing
                </MainButton>
            </Dialog.Trigger>
            <CompleteListingDialog 
                open={open} 
                setOpen={setOpen} 
                asset={data?.asset}
                listingStatus={listingStatus}
            />
        </Dialog.Root>
    )
}