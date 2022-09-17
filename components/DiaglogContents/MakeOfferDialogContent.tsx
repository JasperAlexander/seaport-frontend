import { Dispatch, FC, SetStateAction } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { Box } from '../Box/Box'
import { MainButton } from '../Buttons/MainButton/MainButton'
import * as styles from './DialogContent.css'
import { MakeOfferForm } from '../Forms/MakeOfferForm'
import { TokensStateType } from '../../types/tokenTypes'
import { DialogContentHeader } from '../Headers/DialogContentHeader/DialogContentHeader'
import { DialogContentFooter } from '../Footers/DialogContentFooter/DialogContentFooter'
import useTranslation from 'next-translate/useTranslation'

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
    const { t } = useTranslation('common')

    return (
        <Dialog.Content 
            asChild={true}
        >
            <Box
                className={styles.largeDialogContentContainer}
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
                        {t('makeAnOffer')}
                    </DialogContentHeader>

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

                    <DialogContentFooter>
                        <MainButton
                            width='full'
                            // disabled={Object.keys(errors).length > 0}
                        >
                            {t('makeOffer')}
                        </MainButton>
                    </DialogContentFooter>
                </Box>
            </Box>
        </Dialog.Content>
    )
}