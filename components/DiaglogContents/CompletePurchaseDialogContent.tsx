import { Dispatch, FC, SetStateAction, useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { Box } from '../Box/Box'
import { MainButton } from '../Buttons/MainButton/MainButton'
import * as styles from './DialogContent.css'
import useSeaport from '../../hooks/useSeaport'
import { AssetReadType } from '../../types/assetTypes'
import { Text } from '../Text/Text'
import { NextLink } from '../NextLink/NextLink'
import { DialogContentHeader } from '../Headers/DialogContentHeader/DialogContentHeader'
import { DialogContentFooter } from '../Footers/DialogContentFooter/DialogContentFooter'
import { OrderType } from '../../types/orderTypes'
import { useAccount } from 'wagmi'
import useTranslation from 'next-translate/useTranslation'

interface Props {
    open: boolean
    setOpen: Dispatch<SetStateAction<boolean>>
    asset: AssetReadType
    order: OrderType
}

export const CompletePurchaseDialogContent: FC<Props> = ({
    open,
    setOpen,
    asset,
    order
}) => {
    const { t } = useTranslation('common')
    const { fulfillOrder } = useSeaport()
    const { address } = useAccount()

    const [loadingStatus, setLoadingStatus] = useState<boolean>(false)

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
                        {t('completePurchase')}
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
                                    {t('item')}
                                </Text>
                                <Text 
                                    as='span'
                                    fontWeight='600'
                                >
                                    {t('total')}
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
                                        src={asset.image_url}
                                        width='80'
                                        aspectRatio='square'
                                    />
                                    <Box
                                        display='flex'
                                        flexGrow='1'
                                        flexDirection='column'
                                    >
                                        <NextLink 
                                            href={`/collection/${asset.collection?.slug}`}
                                        >
                                                <Text
                                                    color='accentColor'
                                                    fontSize='14'
                                                >
                                                    {asset.collection?.name}
                                                </Text>
                                        </NextLink>
                                        <Text
                                            as='span'
                                            fontWeight='600'
                                        >
                                            {asset.name}
                                        </Text>
                                        <Text
                                            as='span'
                                            color='boxText'
                                            fontSize='14'
                                        >
                                            {t('creatorFees')}: ..%
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
                            onClick={async() => {
                                if (address) {
                                    try {
                                        setLoadingStatus(true)
                                        await fulfillOrder(order, address, asset)
                                    } catch (error) {
                                        console.log(error)
                                    } finally {
                                        setLoadingStatus(false)
                                    }
                                }
                            }}
                            disabled={loadingStatus}
                        >
                            {t('completePurchase')}
                        </MainButton>
                    </DialogContentFooter>
                </Box>
            </Box>
        </Dialog.Content>
    )
}