import { Dispatch, FC, SetStateAction } from 'react'
import { useAccount } from 'wagmi'
import useMounted from '../../hooks/useMounted'
import { Box } from '../Box/Box'
import * as Dialog from '@radix-ui/react-dialog'
import * as styles from './DialogContent.css'
import useTranslation from 'next-translate/useTranslation'

interface Props {
    open: boolean
    setOpen: Dispatch<SetStateAction<boolean>>
}

export const LoginSideDialogContent: FC<Props> = ({
    open,
    setOpen
}) => {
    const { t } = useTranslation('common')
    const { mounted } = useMounted()
    const { isConnected } = useAccount()

    return (
        <Dialog.Content 
            asChild={true}
        >
            <Box
                as='aside'
                className={styles.sideDialogContentContainer}
            >
                <Box
                    display='flex'
                    flexDirection='column'
                    height='full'
                >
                    <Box
                        padding='20'
                    >
                        {t('connectionRequired')}
                    </Box>
                </Box>
            </Box>
        </Dialog.Content>
    )
}