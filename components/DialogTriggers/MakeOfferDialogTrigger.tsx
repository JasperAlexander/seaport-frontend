import { Dispatch, FC, SetStateAction } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { MakeOfferDialog } from '../Dialogs/MakeOfferDialog'
import { MainButton } from '../Buttons/MainButton'
import { PriceTagIcon } from '../Icons/PriceTagIcon'

interface Props {
    open: boolean
    setOpen: Dispatch<SetStateAction<boolean>>
}

export const MakeOfferDialogTrigger: FC<Props> = ({
    open,
    setOpen
}) => {
    return (
        <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Trigger asChild={true}>
                <MainButton
                    variant='secondary'
                    width='50p'
                >
                    <PriceTagIcon width='22' fill='accentColor' />
                    Make offer
                </MainButton>
            </Dialog.Trigger>
            <MakeOfferDialog open={open} setOpen={setOpen} />
        </Dialog.Root>
    )
}