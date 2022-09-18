import { Dispatch, FC, ReactNode, SetStateAction } from 'react'
import { Box } from '../Box/Box'
import * as Dialog from '@radix-ui/react-dialog'
import * as styles from './DialogTrigger.css'

interface Props {
    children: ReactNode
    content: JSX.Element
    open: boolean
    setOpen: Dispatch<SetStateAction<boolean>>
}

/**
 * Triggers Radix-ui dialog
 * @param children will be the trigger that activates dialog content
 * @param content will be wrapped inside Radix-ui dialog
 * @param open whether dialog is open
 * @param setOpen opens or closes dialog
 */
export const DialogTrigger: FC<Props> = ({
    children,
    content,
    open,
    setOpen
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
            {content}
        </Dialog.Root>
    )
}