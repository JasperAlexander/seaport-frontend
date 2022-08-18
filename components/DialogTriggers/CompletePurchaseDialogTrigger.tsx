import { Dispatch, FC, SetStateAction, useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { MainButton } from '../Buttons/MainButton'
import { AssetType } from '../../types/assetTypes'
import { CompletePurchaseDialog } from '../Dialogs/CompletePurchase'

interface Props {
    variant?: 'button' | 'card'
    open: boolean
    setOpen: Dispatch<SetStateAction<boolean>>
    disabled: boolean
    data: AssetType
}

export const CompletePurchaseDialogTrigger: FC<Props> = ({
    variant = 'button',
    open,
    setOpen,
    disabled,
    data
}) => {
    return (
        // Use for button in list as wel as in asset view using conditions
        <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Trigger asChild={true}>
                {variant === 'button' &&
                    <MainButton
                        onClick={() => {return null}}
                        disabled={disabled}
                    >
                        Buy now
                    </MainButton>
                }
            </Dialog.Trigger>
            <CompletePurchaseDialog 
                open={open} 
                setOpen={setOpen} 
                data={data}
            />
        </Dialog.Root>
    )
}