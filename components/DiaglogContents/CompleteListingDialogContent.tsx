import { Dispatch, FC, SetStateAction } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { Box } from '../Box/Box'
import { CloseIcon } from '../Icons/CloseIcon'
import { MainButton } from '../Buttons/MainButton'
import { LoadingIcon } from '../Icons/LoadingIcon'
import * as styles from './DialogContent.css'
import { AssetType } from '../../types/assetTypes'

interface Props {
    open: boolean
    setOpen: Dispatch<SetStateAction<boolean>>
    asset: AssetType
    listingStatus: number
}

export const CompleteListingDialogContent: FC<Props> = ({
    open,
    setOpen,
    asset,
    listingStatus
}) => {
    return (
        <Dialog.Content asChild={true}>
            <Box
                style={{
                    transform: 'translate(-50%, -50%)',
                    width: '700px', 
                    height: '450px',
                    backgroundColor: 'white',
                    zIndex: '900'
                }}
                position='fixed'
                top='50p'
                left='50p'
                // background='defaultBackground'
                borderRadius='16'
                maxWidth='full'
                maxHeight='full'
            >
                <Box
                    display='flex'
                    flexDirection='column'
                    alignItems='center'
                    justifyContent='center'
                    height='full'
                >
                    <Box className={styles.dialogContentHeader}>
                        Complete your listing
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
                            display='flex'
                            alignItems='center'
                            justifyContent='space-between'
                            padding='24'
                            width='full'
                            fontSize='14'
                        >
                                <Box
                                    as='img'
                                    src={asset?.collection?.image_url}
                                    display='flex'
                                    height='48'
                                    width='48'
                                    borderRadius='10'
                                    marginRight='16'
                                />
                                <Box
                                    display='flex'
                                    flexGrow='1'
                                    flexDirection='column'
                                    marginRight='16'
                                    style={{alignSelf: 'stretch'}}
                                    textAlign='left'
                                >
                                    <Box
                                        as='span'
                                        color='boxText'
                                        fontWeight='400'
                                    >
                                        {asset?.collection?.name}
                                    </Box>
                                    <Box
                                        as='span'
                                        fontWeight='600'
                                    >
                                        {asset?.name}
                                    </Box>
                                    <Box
                                        as='span'
                                        color='boxText'
                                        fontWeight='400'
                                    >
                                        quantity
                                    </Box>
                                </Box>
                                <Box
                                    display='flex'
                                    flexDirection='column'
                                    marginRight='16'
                                >
                                    <Box
                                        as='span'
                                        color='boxText'
                                        fontWeight='400'
                                        textAlign='right'
                                    >
                                        Price
                                    </Box>
                                    <Box
                                        as='span'
                                        fontWeight='600'
                                        textAlign='right'
                                    >
                                        price amount
                                    </Box>
                                    <Box
                                        as='span'
                                        color='boxText'
                                        fontWeight='400'
                                        textAlign='right'
                                    >
                                        usd value
                                    </Box>
                                </Box>
                        </Box>
                        <Box
                            display='flex'
                            alignItems='center'
                            justifyContent='space-between'
                            padding='24'
                            width='full'
                            fontSize='14'
                            borderTopWidth='1'
                            borderStyle='solid'
                            borderColor='box'
                        >
                            <Box
                                display='flex'
                            >
                                <LoadingIcon 
                                    text={listingStatus.toString()}
                                />
                                <Box
                                    display='flex'
                                    flexDirection='column'
                                    width='full'
                                    marginLeft='16'
                                >
                                    <Box
                                        marginTop='8'
                                        fontSize='16'
                                        fontWeight='600'
                                    >
                                        {listingStatus === 0 &&
                                            'Confirm listing'
                                        }
                                    </Box>
                                    <Box
                                        marginTop='20'
                                        fontSize='15'
                                    >
                                        {listingStatus === 0 &&
                                            `You'll be asked to review and confirm this listing from your wallet.`
                                        }
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    </Box>

                    <Box as='footer' padding='24' width='full'>
                        <MainButton
                            width='full'
                        >
                            {listingStatus < 3 
                                ? 'Waiting for approval'
                                : 'Continue' // if not completed yet
                            }
                        </MainButton>
                    </Box>
                </Box>
            </Box>
        </Dialog.Content>
    )
}