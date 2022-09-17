import { Dispatch, FC, SetStateAction } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { Box } from '../Box/Box'
import { MainButton } from '../Buttons/MainButton/MainButton'
import * as styles from './DialogContent.css'
import { Text } from '../Text/Text'
import { DialogContentHeader } from '../Headers/DialogContentHeader/DialogContentHeader'
import { DialogContentFooter } from '../Footers/DialogContentFooter/DialogContentFooter'
import useTranslation from 'next-translate/useTranslation'

interface Props {
    open: boolean
    setOpen: Dispatch<SetStateAction<boolean>>
}

export const SwitchNetworkDialogContent: FC<Props> = ({
    open,
    setOpen
}) => {
    const { t } = useTranslation('common')

    return (
        <Dialog.Content 
            asChild={true}
        >
            <Box
                className={styles.smallDialogContentContainer}
            >
                <Box
                    display='flex'
                    flexDirection='column'
                    alignItems='center'
                    justifyContent='center'
                    height='full'
                >
                    <DialogContentHeader
                        setOpen={setOpen}
                    >
                        {t('switchToEthereum')}
                    </DialogContentHeader>

                    <Box
                        as='section'
                        overflowY='scroll'
                        height='full'
                        width='full'
                    >
                        <Box
                            padding='24'
                        >
                            <Text>
                                {t('switchToEthereumDescription')}
                            </Text>
                        </Box>
                    </Box>

                    <DialogContentFooter>
                        <MainButton
                            variant='secondary'
                            onClick={() => setOpen(false)}
                            width='full'
                        >
                            {t('cancel')}
                        </MainButton>
                        <MainButton
                            width='full'
                            onClick={() => { return null }}
                        >
                            {t('switchNetwork')}
                        </MainButton>
                    </DialogContentFooter>
                </Box>
            </Box>
        </Dialog.Content>
    )
}