import { Dispatch, FC, ReactNode, SetStateAction } from 'react'
import { Box } from '../../Box/Box'
import { CloseDialogContentButton } from '../../Buttons/CloseDialogContentButton/CloseDialogContentButton'
import { Text } from '../../Text/Text'
import * as styles from './DialogContentHeader.css'

interface Props {
    children: ReactNode
    setOpen: Dispatch<SetStateAction<boolean>>
}

export const DialogContentHeader: FC<Props> = ({
    children,
    setOpen
}) => {
  return (
    <Box 
        className={styles.dialogContentHeader}
    >
        <Text
            className={styles.dialogContentHeaderText}
        >
            {children}
        </Text>
        <CloseDialogContentButton
            setOpen={setOpen}
        />
    </Box>
  )
}