import { Dispatch, FC, SetStateAction } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { Box } from '../Box/Box'
import { MainButton } from '../Buttons/MainButton'
import * as styles from './DialogContent.css'
import { AssetType } from '../../types/assetTypes'
import useSeaport from '../../hooks/useSeaport'
import { OrderType } from '../../types/orderTypes'
import { Text } from '../Text/Text'
import { DialogContentHeader } from '../Headers/DialogContentHeader/DialogContentHeader'
import { DialogContentFooter } from '../Footers/DialogContentFooter/DialogContentFooter'

interface Props {
    open: boolean
    setOpen: Dispatch<SetStateAction<boolean>>
    asset?: AssetType
    order?: OrderType | AssetType
}

export const CancelListingDialogContent: FC<Props> = ({
    open,
    setOpen,
    asset,
    order
}) => {
    const { cancelOrder } = useSeaport()

    return (
        <Dialog.Content asChild={true}>
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
                        Cancel your listing
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
                                This will cancel your listing. You will also be asked to confirm this cancelation from your wallet.
                            </Text>
                        </Box>
                    </Box>

                    <DialogContentFooter>
                        <MainButton
                            variant='secondary'
                            onClick={() => setOpen(false)}
                            width='full'
                        >
                            Go back
                        </MainButton>
                        <MainButton
                            width='full'
                            onClick={() => cancelOrder()}
                        >
                            Continue
                        </MainButton>
                    </DialogContentFooter>
                </Box>
            </Box>
        </Dialog.Content>
    )
}