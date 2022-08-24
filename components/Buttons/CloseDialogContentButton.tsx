import { FC, SetStateAction } from 'react'
import { Box } from '../Box/Box'
import { CloseIcon } from '../Icons/CloseIcon'
import * as styles from './CloseDialogContentButton.css'

interface Props {
    setOpen: (value: SetStateAction<boolean>) => void
}

export const CloseDialogContentButton: FC<Props> = ({
    setOpen
}) => {
    return (
        <Box
            as='button'
            onClick={() => setOpen(false)}
            className={styles.closeDialogContentButton}
        >
            <CloseIcon 
                fill='defaultTextPlaceholder' 
                fillOnHover='boxText' 
            />
        </Box>
    )
}