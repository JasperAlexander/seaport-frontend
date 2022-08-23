import { Dispatch, FC, SetStateAction } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { Box } from '../Box/Box'
import { CloseIcon } from '../Icons/CloseIcon'
import { MainButton } from '../Buttons/MainButton'
import * as styles from './DialogContent.css'
import { Text } from '../Text/Text'

interface Props {
    open: boolean
    setOpen: Dispatch<SetStateAction<boolean>>
}

export const SwitchNetworkDialogContent: FC<Props> = ({
    open,
    setOpen
}) => {
    return (
        <Dialog.Content asChild={true}>
            <Box
                style={{
                    transform: 'translate(-50%, -50%)',
                    width: '550px', 
                    height: '300px'
                }}
                className={styles.dialogContentContainer}
            >
                <Box
                    display='flex'
                    flexDirection='column'
                    alignItems='center'
                    justifyContent='center'
                    height='full'
                >
                    <Box className={styles.dialogContentHeader}>
                        Please switch to Ethereum network
                        <Box
                            as='button'
                            onClick={() => setOpen(false)}
                            position='absolute'
                            right='24'
                            top='24'
                            display='flex'
                            alignItems='center'
                            justifyContent='center'
                        >
                            <CloseIcon fill='defaultTextPlaceholder' fillOnHover='boxText' />
                        </Box>
                    </Box>

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

                    <Box as='footer' padding='24' width='full'>
                        <Box
                            display='flex'
                            width='full'
                            gap='12'
                        >
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
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Dialog.Content>
    )
}