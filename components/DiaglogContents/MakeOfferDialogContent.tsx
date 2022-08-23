import { Dispatch, FC, SetStateAction, useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { Box } from '../Box/Box'
import { CloseIcon } from '../Icons/CloseIcon'
import { MainButton } from '../Buttons/MainButton'
import * as styles from './DialogContent.css'
import { MakeOfferForm } from '../Forms/MakeOfferForm'
import { TokensStateType } from '../../types/tokenTypes'

interface Props {
    open: boolean
    setOpen: Dispatch<SetStateAction<boolean>>
    tokens: TokensStateType
}

export const MakeOfferDialogContent: FC<Props> = ({
    open,
    setOpen,
    tokens
}) => {
    return (
        <Dialog.Content asChild={true}>
            <Box
                style={{
                    transform: 'translate(-50%, -50%)',
                    width: '700px', 
                    height: '450px'
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
                        Make an offer
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
                        padding='24'
                        overflowY='scroll'
                        height='full'
                        width='full'
                    >
                        <MakeOfferForm 
                            tokens={tokens}
                        />
                    </Box>

                    <Box as='footer' padding='24' width='full'>
                        <MainButton
                            width='full'
                            // disabled={Object.keys(errors).length > 0}
                        >
                            Make offer
                        </MainButton>
                    </Box>
                </Box>
            </Box>
        </Dialog.Content>
    )
}