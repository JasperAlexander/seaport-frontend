import { Dispatch, FC, Fragment, SetStateAction } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { Box } from '../Box/Box'
import { MainButton } from '../Buttons/MainButton/MainButton'
import { LoadingIcon } from '../Icons/LoadingIcon'
import * as styles from './DialogContent.css'
import { AssetReadType } from '../../types/assetTypes'
import { Text } from '../Text/Text'
import { DialogContentHeader } from '../Headers/DialogContentHeader/DialogContentHeader'
import { DialogContentFooter } from '../Footers/DialogContentFooter/DialogContentFooter'
import { ListAssetFormType } from '../Forms/ListAssetForm'
import { useRouter } from 'next/router'
import { NextLink } from '../NextLink/NextLink'
import Image from 'next/image'
import { useAccount, useConnect, useNetwork, useSigner, useSwitchNetwork } from 'wagmi'
import useSeaport from '../../hooks/useSeaport'
import useTranslation from 'next-translate/useTranslation'

const SUPPORTED_CHAIN_IDS = process.env.NEXT_PUBLIC_SUPPORTED_CHAIN_IDS

interface Props {
    open: boolean
    setOpen: Dispatch<SetStateAction<boolean>>
    formData: ListAssetFormType
    asset: AssetReadType
    listingStatus: number
    setListingStatus: Dispatch<SetStateAction<number>>
    loadingStatus: boolean
    setLoadingStatus: Dispatch<SetStateAction<boolean>>
}

export const CompleteListingDialogContent: FC<Props> = ({
    open,
    setOpen,
    formData,
    asset,
    listingStatus,
    setListingStatus,
    loadingStatus,
    setLoadingStatus
}) => {
    const router = useRouter()

    const { t } = useTranslation('common')
    const { createOrder } = useSeaport()
    const { isConnected, address } = useAccount()
    const { connect } = useConnect()
    const { chain: activeChain } = useNetwork()
    const { switchNetwork } = useSwitchNetwork()
    const { data: signer } = useSigner()

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
                        {listingStatus === 10 
                            ? `${t('itemBeenListed')}`
                            : `${t('completeListing')}`
                        }
                    </DialogContentHeader>

                
                    <Box
                        as='section'
                        overflowY='scroll'
                        height='full'
                        width='full'
                        padding='24'
                    >
                        {listingStatus === 10
                            ?
                                <Fragment>
                                    {/* <Box
                                        height='full'
                                        overflowY='scroll'
                                        // padding='24'
                                    > */}
                                        <Box
                                            borderRadius='10'
                                            // style={{maxWidth: '250px'}}
                                            marginX='auto'
                                            // position='relative'
                                            marginBottom='32'
                                            display='flex'
                                            justifyContent='center'
                                        >
                                            {/* <Image 
                                                src={asset?.image_url}
                                                width='250px'
                                                height='250px'
                                            /> */}
                                            <Box 
                                                as='img'
                                                src={asset?.image_url}
                                                style={{width: '250px', height: '250px'}}
                                            />
                                            {/* <Box
                                                marginBottom='32'
                                            >
                                                <Box
                                                    display='flex'
                                                    alignItems='center'
                                                    justifyContent='center'
                                                    position='relative'
                                                    height='full'
                                                    width='full'
                                                    flexDirection='column'
                                                >
                                                    <Box
                                                        display='flex'
                                                        alignItems='center'
                                                        justifyContent='center'
                                                        overflow='hidden'
                                                        position='relative'
                                                        style={{width: '250px', height: '250px'}}
                                                    >
                                                        <Box
                                                            as='img'
                                                            src={asset?.image_url}
                                                            display='flex'
                                                            inset='0'
                                                            borderRadius='10'
                                                            marginRight='16'
                                                        />
                                                    </Box>
                                                </Box>
                                            </Box> */}
                                        </Box>
                                    {/* </Box> */}
                                    <Box
                                        textAlign='center'
                                    >
                                        <NextLink
                                            href={`/assets/${asset?.asset_contract?.address}/${asset?.token_id}`}
                                            display='inline-flex'
                                        >
                                            <Text
                                                color='accentColor'
                                            >
                                                {asset?.name}
                                            </Text>
                                        </NextLink>
                                        <Text
                                            as='p'
                                        >
                                            {'\u00a0'}{t('fromThe')}{'\u00a0'}
                                        </Text>
                                        <NextLink
                                            href={`/collection/${asset?.collection?.slug}`}
                                            display='inline-flex'
                                        >
                                            <Text
                                                color='accentColor'
                                            >
                                                {asset?.collection?.name}
                                            </Text>
                                        </NextLink>
                                        <Text
                                            as='p'
                                        >
                                            {'\u00a0'}{t('beenListedForSale')}
                                        </Text>
                                    </Box>
                                </Fragment>
                            :
                                <Fragment>
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
                                                {t('quantity')}: 1
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
                                                {t('price')}
                                            </Box>
                                            <Box
                                                as='span'
                                                fontWeight='600'
                                                textAlign='right'
                                            >
                                                {formData?.startAmount}
                                            </Box>
                                            <Box
                                                as='span'
                                                color='boxText'
                                                fontWeight='400'
                                                textAlign='right'
                                            >
                                                {/* To do */}
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
                                                progressing={loadingStatus}
                                            />
                                            <Box
                                                display='flex'
                                                flexDirection='column'
                                                width='full'
                                                marginLeft='16'
                                            >
                                                <Box
                                                    marginTop='8'
                                                >
                                                    <Text
                                                        fontWeight='600'
                                                    >
                                                        {listingStatus === 1 &&
                                                            `${t('confirmListing')}`
                                                        }
                                                    </Text>
                                                </Box>
                                                <Box
                                                    marginTop='20'
                                                >
                                                    <Text
                                                        fontSize='15'
                                                    >
                                                        {listingStatus === 1 &&
                                                            `${t('confirmListingDescription')}`
                                                        }
                                                    </Text>
                                                </Box>
                                            </Box>
                                        </Box>
                                    </Box>
                                </Fragment>
                        }
                    </Box>

                    <DialogContentFooter>
                        {listingStatus === 10
                            ?
                                <NextLink
                                    href={`/assets/${asset?.asset_contract?.address}/${asset?.token_id}`}
                                    width='full'
                                >
                                    <MainButton
                                        width='full'
                                        disabled={loadingStatus}
                                    >
                                        {t('viewListing')}
                                    </MainButton>
                                </NextLink>
                            :
                                <MainButton
                                    width='full'
                                    disabled={loadingStatus}
                                    onClick={async() => {
                                        try {
                                            if (!isConnected) {
                                                connect()
                                            }
                                            if (activeChain?.id && !SUPPORTED_CHAIN_IDS?.includes(activeChain.id.toString())) {
                                            // if (activeChain?.id !== 1337) {
                                                switchNetwork // switchNetwork?.(1337)
                                            }
                                            if (isConnected && signer && address && activeChain?.id === 1337) {
                                                // await mintERC721(signer, address, asset?.data?.token_id)
                                                await createOrder(formData, listingStatus, setListingStatus, setLoadingStatus)
                                            }
                                        } catch (error) {
                                            console.log(error)
                                        }
                                    }}
                                >
                                    {listingStatus !== 10 && !loadingStatus && `${t('continue')}`}
                                    {listingStatus === 1 && loadingStatus && `${t('waitingForConfirmation')}`}
                                </MainButton>
                        }
                    </DialogContentFooter>
                </Box>
            </Box>
        </Dialog.Content>
    )
}