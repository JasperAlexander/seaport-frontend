import { Dispatch, FC, SetStateAction } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { Box } from '../Box/Box'
import { CloseIcon } from '../Icons/CloseIcon'
import { MainButton } from '../Buttons/MainButton'
import { LoadingIcon } from '../Icons/LoadingIcon'
import * as styles from './DialogContent.css'
import useSeaport from '../../hooks/useSeaport'
import { AssetType } from '../../types/assetTypes'
import Link from 'next/link'

interface Props {
    open: boolean
    setOpen: Dispatch<SetStateAction<boolean>>
    data: AssetType
}

export const CompletePurchaseDialogContent: FC<Props> = ({
    open,
    setOpen,
    data
}) => {
    const { fulfillOrder } = useSeaport()

    return (
        <Dialog.Content asChild={true}>
            <Box
                style={{
                    transform: 'translate(-50%, -50%)',
                    width: '700px', 
                    height: '450px',
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
                        Complete checkout
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
                            flexDirection='column'
                            padding='38'
                            width='full'
                            fontSize='14'
                            color='defaultText'
                        >
                            <Box
                                width='full'
                                display='flex'
                                alignItems='center'
                                justifyContent='space-between'
                                fontSize='16'
                                fontWeight='600'
                                paddingBottom='4'
                            >
                                <Box as='span'>Item</Box>
                                <Box as='span'>Total</Box>
                            </Box>
                                <Box
                                    display='flex'
                                    width='full'
                                    alignItems='center'
                                    gap='8'
                                    paddingY='16'
                                    borderBottomWidth='1'
                                    borderTopWidth='1'
                                    borderStyle='solid'
                                    borderColor='box'
                                >
                                    <Box 
                                        as='img'
                                        src={data.image_url}
                                        width='80'
                                        aspectRatio='1'
                                    />
                                    <Box
                                        display='flex'
                                        flexGrow='1'
                                        flexDirection='column'
                                    >
                                        <Link 
                                            href={`/collection/${data.collection?.slug}`}
                                            passHref={true}
                                        >
                                            <Box
                                                as='a'
                                                color='accentColor'
                                                fontSize='14'
                                            >
                                                {data.collection?.name}
                                            </Box>
                                        </Link>
                                        <Box
                                            as='span'
                                            fontWeight='600'
                                            fontSize='16'
                                        >
                                            {data.name}
                                        </Box>
                                        <Box
                                            as='span'
                                            color='boxText'
                                            fontSize='14'
                                        >
                                            Creator Fees: ..%
                                        </Box>
                                    </Box>
                                    <Box
                                        display='flex'
                                        flexDirection='column'
                                        alignItems='flex-end'
                                    >
                                        <Box
                                            display='flex'
                                            alignItems='center'
                                            gap='3'
                                        >
                                            {/* Payment token */}
                                            <Box
                                                as='span'
                                                fontWeight='600'
                                                fontSize='16'
                                            >
                                                {/* Payment price */}
                                                2.5
                                            </Box>
                                        </Box>
                                        <Box>
                                            {/* USD price */}
                                            $1.000
                                        </Box>
                                    </Box>
                                </Box>
                        </Box>
                    </Box>

                    <Box as='footer' padding='24' width='full'>
                        <MainButton
                            width='full'
                        >
                            Complete purchase
                        </MainButton>
                    </Box>
                </Box>
            </Box>
        </Dialog.Content>
    )
}