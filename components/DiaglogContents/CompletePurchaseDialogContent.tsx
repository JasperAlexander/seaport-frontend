import { Dispatch, FC, SetStateAction } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { Box } from '../Box/Box'
import { MainButton } from '../Buttons/MainButton'
import * as styles from './DialogContent.css'
import useSeaport from '../../hooks/useSeaport'
import { AssetType } from '../../types/assetTypes'
import { Text } from '../Text/Text'
import { NextLink } from '../NextLink/NextLink'
import { DialogContentHeader } from '../Headers/DialogContentHeader/DialogContentHeader'
import { DialogContentFooter } from '../Footers/DialogContentFooter/DialogContentFooter'

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
                        Complete checkout
                    </DialogContentHeader>

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
                                paddingBottom='4'
                            >
                                <Text 
                                    as='span'
                                    fontWeight='600'
                                >
                                    Item
                                </Text>
                                <Text 
                                    as='span'
                                    fontWeight='600'
                                >
                                    Total
                                </Text>
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
                                        aspectRatio='square'
                                    />
                                    <Box
                                        display='flex'
                                        flexGrow='1'
                                        flexDirection='column'
                                    >
                                        <NextLink 
                                            href={`/collection/${data.collection?.slug}`}
                                        >
                                                <Text
                                                    color='accentColor'
                                                    fontSize='14'
                                                >
                                                    {data.collection?.name}
                                                </Text>
                                        </NextLink>
                                        <Text
                                            as='span'
                                            fontWeight='600'
                                        >
                                            {data.name}
                                        </Text>
                                        <Text
                                            as='span'
                                            color='boxText'
                                            fontSize='14'
                                        >
                                            Creator Fees: ..%
                                        </Text>
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
                                            <Text
                                                as='span'
                                                fontWeight='600'
                                            >
                                                {/* Payment price */}
                                                2.5
                                            </Text>
                                        </Box>
                                        <Text>
                                            {/* USD price */}
                                            $1.000
                                        </Text>
                                    </Box>
                                </Box>
                        </Box>
                    </Box>

                    <DialogContentFooter>
                        <MainButton
                            width='full'
                        >
                            Complete purchase
                        </MainButton>
                    </DialogContentFooter>
                </Box>
            </Box>
        </Dialog.Content>
    )
}