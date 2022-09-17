import { EthIcon } from '../Icons/EthIcon'
import { FC, useEffect, useState } from 'react'
import { Box } from '../Box/Box'
import { AssetReadType } from '../../types/assetTypes'
import { CardButton } from '../Buttons/CardButton/CardButton'
import { AssetGridLoadingCard } from '../LoadingCards/AssetGridLoadingCard'
import { LoginSideDialogTrigger } from '../DialogTriggers/LoginSideDialogTrigger'
import { useAccount } from 'wagmi'
import useMounted from '../../hooks/useMounted'
import { CompletePurchaseDialogTrigger } from '../DialogTriggers/CompletePurchaseDialogTrigger'
import { CancelListingDialogTrigger } from '../DialogTriggers/CancelListingDialogTrigger'
import { Text } from '../Text/Text'
import { NextLink } from '../NextLink/NextLink'
import useOrders from '../../hooks/useOrders'
import { useRouter } from 'next/router'
import { OrderType } from '../../types/orderTypes'
import TimeAgo from 'react-timeago'
import { MakeOfferDialogTrigger } from '../DialogTriggers/MakeOfferDialogTrigger'
import { TokensStateType } from '../../types/tokenTypes'
import useTranslation from 'next-translate/useTranslation'

interface Props {
    asset: AssetReadType
    mutate: () => void
    isOwner?: boolean
    tokens: TokensStateType
}

export const AssetGridCard: FC<Props> = ({
    asset,
    mutate,
    isOwner,
    tokens
}) => {
    const { t } = useTranslation('common')
    const { mounted } = useMounted()
    const { isConnected, address } = useAccount()

    const router = useRouter()
    const orders = useOrders(router, undefined, asset.asset_contract.address, asset.token_id)

    const [loginSideDialogOpen, setLoginSideDialogOpen] = useState<boolean>(false)
    const [completePurchaseDialogOpen, setCompletePurchaseDialogOpen] = useState<boolean>(false)
    const [makeOfferDialogOpen, setMakeOfferDialogOpen] = useState<boolean>(false)
    const [cancelListingDialogOpen, setCancelListingDialogOpen] = useState<boolean>(false)

    if (!isOwner && mounted)
        isOwner = address === asset.owner.address

    const [lastListing, setLastListing] = useState<OrderType>()

    useEffect(() => {
        if (orders?.orders?.data && orders.orders.data.length > 0) {
            console.log('before filter: ', orders.orders.data?.[0].orders)
            const newLastListing = orders.orders.data?.[0].orders
            .filter(order => {
                return (
                    order.cancelled === false && 
                    order.finalized === false &&
                    Number(order.expiration_time) > (Date.now() / 1000)
                )
            }).sort((a, b) => {
                return Number(b.parameters.endTime) - Number(a.parameters.endTime)
            })
            setLastListing(newLastListing[0])
            console.log('newLastListing', newLastListing)
        }
    }, [orders?.orders?.data])

    return (
        <Box
            id='assetCard'
            position='relative'
            display='flex'
            flexDirection='column'
            background='orderBackground'
            height='auto'
            overflow='hidden'
            borderRadius='10'
            borderWidth='1'
            boxShadow={{
                base: 'box',
                hover: 'boxHover'
            }}
            transition='default'
            cursor='pointer'
        >
            <Box>
                <NextLink 
                    href={`/assets/${asset.asset_contract.address}/${asset.token_id}`}
                    display='flex'
                    flexDirection='column'
                    zIndex='100'
                    position='relative'
                >
                    <Box
                        aspectRatio='square'
                        overflow='hidden'
                    >
                        {asset.image_url
                            ? 
                                <Box
                                    as='img' 
                                    id='assetCardImg'
                                    src={asset.image_url}
                                    dimension='full'
                                    transition='assetCardImage'
                                    // Added hover effect here for readability, effect is also defined in globals.css
                                    scale={{
                                        hover: 'growLg'
                                    }}
                                />
                            : 
                                <AssetGridLoadingCard />
                        }
                    </Box>

                    <Box 
                        paddingY='12' 
                        paddingX='16' 
                        display='flex' 
                        flexDirection='column' 
                        gap='8'
                        zIndex='200'
                    >
                        <Box 
                            display='flex' 
                            flexDirection='column'
                        >
                            <Text 
                                as='span' 
                                fontSize='12' 
                                fontWeight='600'
                            >
                                {asset.name}
                            </Text>
                            <Box 
                                height='18'
                            >
                                <Text 
                                    as='span' 
                                    fontSize='12'
                                    whiteSpace='nowrap'
                                >
                                    {asset.description}
                                </Text>
                            </Box>
                        </Box>
                        <Box>
                            <Text 
                                as='span' 
                                fontSize='12' 
                                fontWeight='600'
                            >
                                {t('price')}
                            </Text>
                            <Box 
                                display='flex' 
                                alignItems='center' 
                                height='20' 
                                gap='5'
                            >
                                {/* To do */}
                                <EthIcon width='16' />
                                <Text 
                                    as='span' 
                                    fontWeight='600'
                                >
                                    0,01
                                </Text>
                            </Box>
                        </Box>
                    </Box>
                </NextLink>
                <Box 
                    paddingY='12' 
                    paddingX='16' 
                    display='flex' 
                    flexDirection='column' 
                    gap='8'
                    style={{zIndex: '200'}}
                >
                    <Box
                        display='flex'
                        alignItems='center'
                        height='20'
                        width='full'
                        marginTop='4'
                    >
                        <Box
                            id='assetCardText'
                            // Added hover effect here for readability, effect is also defined in globals.css
                            opacity={{
                                base: '1',
                                hover: '0'
                            }}
                            transition='opacity'
                            marginRight='8'
                        >
                            {lastListing &&
                                <Text
                                    fontWeight='500'
                                    fontSize='12'
                                    color='boxText'
                                >
                                    {t('endsIn')}{'\u00a0'}
                                    <TimeAgo 
                                        date={Number(lastListing.expiration_time) * 1000} 
                                        formatter={(value, unit) => `${value} ${unit}${value > 1 ? 's' : ''}`} 
                                    />
                                </Text>
                            }
                        </Box>
                        {mounted && !isConnected &&
                            <LoginSideDialogTrigger 
                                open={loginSideDialogOpen}
                                setOpen={setLoginSideDialogOpen}
                            >
                                <CardButton 
                                    onClick={() => {return null}}
                                >
                                    {t('buyNow')}
                                </CardButton>
                            </LoginSideDialogTrigger>
                        }
                        {mounted && isConnected && !isOwner && lastListing &&
                            <CompletePurchaseDialogTrigger
                                open={completePurchaseDialogOpen}
                                setOpen={setCompletePurchaseDialogOpen}
                                asset={asset}
                                order={lastListing}
                            >
                                <CardButton 
                                    onClick={() => {return null}}
                                >
                                    {t('buyNow')}
                                </CardButton>
                            </CompletePurchaseDialogTrigger>
                        }
                        {mounted && isConnected && !isOwner && !lastListing &&
                            <MakeOfferDialogTrigger
                                open={makeOfferDialogOpen}
                                setOpen={setMakeOfferDialogOpen}
                                tokens={tokens}
                            >
                                <CardButton 
                                    onClick={() => {return null}}
                                >
                                    {t('makeOffer')}
                                </CardButton>
                            </MakeOfferDialogTrigger>
                        }
                        {mounted && isConnected && isOwner && lastListing &&
                            <CancelListingDialogTrigger
                                open={cancelListingDialogOpen}
                                setOpen={setCancelListingDialogOpen}
                                asset={asset}
                                order={lastListing}
                            >
                                <CardButton 
                                    onClick={() => {return null}}
                                >
                                    {t('cancelListing')}
                                </CardButton>
                            </CancelListingDialogTrigger>
                        }
                        {mounted && isConnected && isOwner && !lastListing &&
                            <NextLink
                                href={`/assets/${asset.asset_contract.address}/${asset.token_id}/sell`}
                            >
                                <CardButton 
                                    onClick={() => {return null}}
                                >
                                    {t('listAsset')}
                                </CardButton>
                            </NextLink>
                        }
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}
