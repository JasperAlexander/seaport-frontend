import { Dispatch, FC, ReactNode, SetStateAction } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { Box } from '../Box/Box'
import { MakeOfferDialogContent } from '../DiaglogContents/MakeOfferDialogContent'
import { TokensStateType } from '../../types/tokenTypes'
import * as styles from './DialogTrigger.css'

interface Props {
    children: ReactNode
    open: boolean
    setOpen: Dispatch<SetStateAction<boolean>>
    tokens: TokensStateType
}

export const MakeOfferDialogTrigger: FC<Props> = ({
    children,
    open,
    setOpen,
    tokens
}) => {
    return (
        <Dialog.Root 
            open={open} 
            onOpenChange={setOpen}
        >
            <Dialog.Trigger 
                asChild={true}
            >
                {children}
            </Dialog.Trigger>
            <Dialog.Overlay 
                asChild={true}
            >
                <Box 
                    className={styles.dialogTriggerOverlay}
                />
            </Dialog.Overlay>
            <MakeOfferDialogContent 
                open={open} 
                setOpen={setOpen} 
                tokens={tokens}
            />
        </Dialog.Root>
    )
}