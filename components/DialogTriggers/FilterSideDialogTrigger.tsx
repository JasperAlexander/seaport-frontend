import { Dispatch, FC, ReactNode, SetStateAction } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { Box } from '../Box/Box'
import * as styles from './DialogTrigger.css'
import { FilterSideDialogContent } from '../DiaglogContents/FilterSideDialogContent'

interface Props {
    children: ReactNode
    open: boolean
    setOpen: Dispatch<SetStateAction<boolean>>
}

export const FilterSideDialogTrigger: FC<Props> = ({
    children,
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
                    className={styles.sideDialogTriggerOverlay}
                />
            </Dialog.Overlay>
            <FilterSideDialogContent 
                open={open} 
                setOpen={setOpen} 
            />
        </Dialog.Root>
    )
}