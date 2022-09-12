import { Dispatch, FC, SetStateAction } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { Box } from '../Box/Box'
import { MainButton } from '../Buttons/MainButton'
import * as styles from './DialogContent.css'
import { Text } from '../Text/Text'
import { DialogContentHeader } from '../Headers/DialogContentHeader/DialogContentHeader'
import { DialogContentFooter } from '../Footers/DialogContentFooter/DialogContentFooter'

interface Props {
    open: boolean
    setOpen: Dispatch<SetStateAction<boolean>>
}

export const SwitchNetworkDialogContent: FC<Props> = ({
    open,
    setOpen
}) => {
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
                        Please switch to Ethereum network
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
                                In order to trade items, please switch to Ethereum network within your MetaMask wallet.
                            </Text>
                        </Box>
                    </Box>

                    <DialogContentFooter>
                        <MainButton
                            variant='secondary'
                            onClick={() => setOpen(false)}
                            width='full'
                        >
                            Cancel
                        </MainButton>
                        <MainButton
                            width='full'
                            onClick={() => { return null }}
                        >
                            Switch network
                        </MainButton>
                    </DialogContentFooter>
                </Box>
            </Box>
        </Dialog.Content>
    )
}