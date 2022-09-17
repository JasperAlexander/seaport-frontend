import { Dispatch, FC, SetStateAction } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { Box } from '../Box/Box'
import { MainButton } from '../Buttons/MainButton/MainButton'
import * as styles from './DialogContent.css'
import { AssetReadType } from '../../types/assetTypes'
import useSeaport from '../../hooks/useSeaport'
import { OrderType } from '../../types/orderTypes'
import { Text } from '../Text/Text'
import { DialogContentHeader } from '../Headers/DialogContentHeader/DialogContentHeader'
import { DialogContentFooter } from '../Footers/DialogContentFooter/DialogContentFooter'
import { useAccount } from 'wagmi'
import useTranslation from 'next-translate/useTranslation'

interface Props {
    open: boolean
    setOpen: Dispatch<SetStateAction<boolean>>
    asset?: AssetReadType
    order?: OrderType
}

export const CancelListingDialogContent: FC<Props> = ({
    open,
    setOpen,
    asset,
    order
}) => {
    const { t } = useTranslation('common')
    const { cancelOrder } = useSeaport()
    const { address } = useAccount()

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
                        {t('cancelListing')}
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
                                {t('cancelListingDescription')}
                            </Text>
                        </Box>
                    </Box>

                    <DialogContentFooter>
                        <MainButton
                            variant='secondary'
                            onClick={() => setOpen(false)}
                            width='full'
                        >
                            {t('goBack')}
                        </MainButton>
                        {order && address && asset &&
                            <MainButton
                                width='full'
                                onClick={() => cancelOrder(order, address, asset)}
                            >
                                {t('continue')}
                            </MainButton>
                        }
                    </DialogContentFooter>
                </Box>
            </Box>
        </Dialog.Content>
    )
}