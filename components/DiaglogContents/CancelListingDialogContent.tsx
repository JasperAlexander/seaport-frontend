import { Dispatch, FC, SetStateAction } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { Box } from '../Box/Box'
import { CloseIcon } from '../Icons/CloseIcon'
import { MainButton } from '../Buttons/MainButton'
import { LoadingIcon } from '../Icons/LoadingIcon'
import * as styles from './DialogContent.css'
import { AssetType } from '../../types/assetTypes'
import useSeaport from '../../hooks/useSeaport'
import { OrderType } from '../../types/orderTypes'

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
                        Cancel your listing
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
                            color='defaultText'
                            fontSize='16'
                            fontWeight='400'
                        >
                            This will cancel your listing. You will also be asked to confirm this cancelation from your wallet.
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
                                Go back
                            </MainButton>
                            <MainButton
                                width='full'
                                onClick={() => cancelOrder()}
                            >
                                Continue
                            </MainButton>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Dialog.Content>
    )
}