import type { GetStaticPaths, GetStaticProps, InferGetStaticPropsType, NextPage } from 'next'
import { Fragment, useEffect, useState } from 'react'
import { Box } from '../../../../components/Box/Box'
import { AssetPageCard } from '../../../../components/Cards/AssetPageCard'
import { AssetPriceAccordion } from '../../../../components/Accordions/AssetPriceAccordion/AssetPriceAccordion'
import { AssetMeta } from '../../../../components/Containers/AssetMeta'
import useAsset from '../../../../hooks/useAsset'
import { AssetType } from '../../../../types/assetTypes'
import setParams from '../../../../utils/params'
import { EventsQueryType, EventsType, EventType, EventTypes } from '../../../../types/eventTypes'
import useEvents from '../../../../hooks/useEvents'
import { useRouter } from 'next/router'
import { OffersAccordion } from '../../../../components/Accordions/OffersAccordion/OffersAccordion'
import { ActivityAccordion } from '../../../../components/Accordions/ActivityAccordion/ActivityAccordion'
import { ListingsAccordion } from '../../../../components/Accordions/ListingsAccordion/ListingsAccordion'
import { AssetInfoAccordion } from '../../../../components/Accordions/AssetInfoAccordion/AssetInfoAccordion'
import { MainLayout } from '../../../../components/Layouts/MainLayout'
import { useAccount } from 'wagmi'
import { MainButton } from '../../../../components/Buttons/MainButton'
import { OrdersQueryType, OrdersType } from '../../../../types/orderTypes'
import useOrders from '../../../../hooks/useOrders'
import useTokens from '../../../../hooks/useTokens'
import { TokensQueryType, TokensType } from '../../../../types/tokenTypes'
import { NextLink } from '../../../../components/NextLink/NextLink'
import { FlagIcon } from '../../../../components/Icons/FlagIcon'
import { Text } from '../../../../components/Text/Text'
import { AssetPageHeader } from '../../../../components/Headers/AssetPageHeader/AssetPageHeader'
import { TitleAndMetaTags } from '../../../../components/TitleAndMetaTags/TitleAndMetaTags'

const API_BASE = process.env.NEXT_PUBLIC_API_BASE

type Props = InferGetStaticPropsType<typeof getStaticProps>

const AssetPage: NextPage<Props> = ({
    fallbackAsset,
    fallbackEvents,
    fallbackOrders,
    fallbackTokens,
    contract_address,
    token_id
}) => {
    const router = useRouter()
    const asset = useAsset(fallbackAsset, contract_address, token_id)
    const events = useEvents(router, fallbackEvents, contract_address, token_id)
    const orders = useOrders(router, fallbackOrders, contract_address, token_id)
    const tokens = useTokens(router, fallbackTokens)

    const { address } = useAccount()
    const [isOwner, setIsOwner] = useState<boolean>(false)
    useEffect(() => {
        if (asset?.data?.owner?.address === address)
            setIsOwner(true)
    })

    const { data: eventsData, isValidating, size } = events.events
    const mappedEvents = eventsData ? eventsData.map(({ events }) => events).flat() : []
    const listingEvents: EventType[] | undefined = mappedEvents?.filter((event: EventType) => (
        event.type === EventTypes.Created || event.type === EventTypes.Cancelled
    ))
    const lastListingEvent: EventType | undefined = listingEvents.length > 0 ? listingEvents?.reduce((a, b) => (
        a.created_timestamp > b.created_timestamp ? a : b
    )) : undefined

    useEffect(() => {
        console.log('mappedEvents', mappedEvents)
        console.log('listingEvents', listingEvents)
        console.log('lastListingEvent', lastListingEvent)
    }, [mappedEvents, listingEvents, lastListingEvent])
    
    return (
        <Fragment>
            <TitleAndMetaTags 
                title={'Asset | OpenFish'}
            />

            <MainLayout>
                <Box
                    display={{
                        base: 'none',
                        wideScreen: 'flex',
                        largeScreen: 'flex'
                    }}
                    width='full'
                >
                    <Box
                        display='flex'
                        flexDirection='column'
                        width='full'
                    >
                        {isOwner &&
                            <AssetPageHeader>
                                <MainButton 
                                    variant='secondary'
                                    width='160'
                                >
                                    Edit
                                </MainButton>
                                <MainButton 
                                    href={`/assets/${asset?.data?.asset_contract?.address}/${asset?.data?.token_id}/sell`}
                                    width='160'
                                >
                                    Sell
                                </MainButton>
                            </AssetPageHeader>
                        }
                        <Box
                            display='flex'
                            width='full'
                        >
                            <Box
                                flexGrow='3'
                                flexShrink='0'
                                flexBasis='0'
                                maxWidth='43p'
                                width='0'
                            >
                                <AssetPageCard 
                                    asset={asset?.data} 
                                />
                                <AssetInfoAccordion 
                                    data={asset?.data} 
                                />
                            </Box>
                            <Box
                                flexGrow='4'
                                flexShrink='0'
                                flexBasis='0'
                                marginLeft='-20'
                            >
                                <Box
                                    display='flex'
                                    flexDirection='column'
                                    flexWrap='wrap'
                                    justifyContent='space-between'
                                    margin={{
                                        wideScreen: '20',
                                        largeScreen: '20'
                                    }}
                                >
                                    <Box
                                        display='flex'
                                        justifyContent='space-between'
                                        alignItems='center'
                                        marginBottom='5'
                                        maxWidth='full'
                                    >
                                        <NextLink 
                                            href={`/collection/${asset?.data?.collection?.slug}/`} 
                                            display='flex'
                                            alignItems='center'
                                            maxWidth='full'
                                        >
                                            <Text
                                                whiteSpace='nowrap'
                                                color='accentColor'
                                            >
                                                {asset?.data?.collection?.name}
                                            </Text>
                                        </NextLink>
                                        <Box
                                            maxWidth='fit'
                                            display='flex'
                                            width='fit'
                                        >
                                            <Box
                                                borderRadius='10'
                                                display='inline-flex'
                                                justifyContent='center'
                                                padding='12'
                                                borderWidth='2'
                                                borderColor='box'
                                                borderStyle='solid'
                                                cursor='pointer'
                                            >
                                                <FlagIcon 
                                                    width='20' 
                                                />
                                            </Box>
                                        </Box>
                                    </Box>
                                    <Text
                                        as='h1'
                                        fontSize='32'
                                        fontWeight='600'
                                    >
                                        {asset?.data?.name}
                                    </Text>
                                </Box>
                                <AssetMeta 
                                    asset={asset?.data} 
                                />
                                {!isOwner &&
                                    <AssetPriceAccordion 
                                        asset={asset?.data}
                                        lastListingEvent={lastListingEvent}
                                        tokens={tokens}
                                    />
                                }
                                <ListingsAccordion
                                    data={orders}
                                    isOwner={isOwner}
                                />
                                <OffersAccordion
                                    data={events}
                                    open={true}
                                />
                            </Box>
                        </Box>
                        <Box
                            display='flex'
                            flexDirection='column'
                            width='full'
                        >
                            <ActivityAccordion
                                data={events}
                                open={true}
                            />
                        </Box>
                        {/* Box with more assets of same collection */}
                    </Box>
                </Box>
                <Box
                    maxWidth='full'
                    paddingTop='8'
                    paddingBottom='16'
                    paddingX='8'
                    width='full'
                    display={{
                        base: 'flex',
                        wideScreen: 'none',
                        largeScreen: 'none'
                    }}
                    flexDirection='column'
                    alignItems='center'
                >
                    <Box
                        display='flex'
                        flexDirection='column'
                        flexWrap='wrap'
                        justifyContent='space-between'
                    >
                        <Box
                            display='flex'
                            flexDirection='column'
                            flexWrap='wrap'
                            justifyContent='space-between'
                            margin={{
                                wideScreen: '20',
                                largeScreen: '20'
                            }}
                        >
                            <Box
                                display='flex'
                                justifyContent='space-between'
                                alignItems='center'
                                marginBottom='5'
                                maxWidth='full'
                            >
                                <NextLink 
                                    href={`/collection/${asset?.data?.collection?.slug}/`} 
                                    display='flex'
                                    alignItems='center'
                                    maxWidth='full'
                                >
                                    <Text
                                        whiteSpace='nowrap'
                                        color='accentColor'
                                    >
                                        {asset?.data?.collection?.name}
                                    </Text>
                                </NextLink>
                                <Box
                                    maxWidth='fit'
                                    display='flex'
                                    width='fit'
                                >
                                    <Box
                                        borderRadius='10'
                                        display='inline-flex'
                                        justifyContent='center'
                                        padding='12'
                                        borderWidth='2'
                                        borderColor='box'
                                        borderStyle='solid'
                                        cursor='pointer'
                                    >
                                        <FlagIcon 
                                            width='20' 
                                        />
                                    </Box>
                                </Box>
                            </Box>
                            <Text
                                as='h1'
                                fontSize='32'
                                fontWeight='600'
                            >
                                {asset?.data?.name}
                            </Text>
                        </Box>
                        <AssetPageCard 
                            asset={asset?.data} 
                        />
                        <AssetMeta 
                            asset={asset?.data} 
                        />
                        {!isOwner && 
                            <AssetPriceAccordion 
                                asset={asset?.data}
                                lastListingEvent={lastListingEvent}
                                tokens={tokens}
                            />
                        }
                    </Box>
                </Box>
            </MainLayout>
        </Fragment>
    )
}

export default AssetPage

export const getStaticPaths: GetStaticPaths = () => {
    return {
        paths: [],
        fallback: 'blocking',
    }
}
  
export const getStaticProps: GetStaticProps<{
    fallbackAsset: AssetType
    fallbackEvents: EventsType
    fallbackOrders: OrdersType
    fallbackTokens: TokensType
    contract_address: string
    token_id: string
}> = async ({ params }) => {
    try {
        // ASSET
        const contract_address = params?.address?.toString()
        const token_id = params?.id?.toString()
    
        if (!contract_address || !token_id) {
            return {
                notFound: true,
            }
        }
    
        const assetOptions: RequestInit | undefined = {}

        const assetUrl = new URL(`/api/v1/asset/${contract_address}/${token_id}/`, API_BASE)

        const assetQuery = {}
    
        const assetHref = setParams(assetUrl, assetQuery)
    
        const assetRes = await fetch(assetHref, assetOptions)
    
        const fallbackAsset = (await assetRes.json()) as AssetType
    
        if (!fallbackAsset) {
        return {
            notFound: true,
        }
        }

        // EVENTS
        const eventsOptions: RequestInit | undefined = {}

        const eventsUrl = new URL(`/api/v1/events/`, API_BASE)

        const eventsQuery: EventsQueryType = {
            ...(contract_address && { asset_contract__address: contract_address }),
            ...(token_id && { token_id: token_id })
        }
    
        const eventsHref = setParams(eventsUrl, eventsQuery)
    
        const eventsRes = await fetch(eventsHref, eventsOptions)
    
        const fallbackEvents = (await eventsRes.json()) as EventsType

        // ORDERS
        const ordersOptions: RequestInit | undefined = {}

        const ordersUrl = new URL(`/api/v1/orders/`, API_BASE)

        const ordersQuery: OrdersQueryType = {
            ...(contract_address && { parameters__offer__token: contract_address }),
            ...(token_id && { parameters__offer__identifierOrCriteria: token_id })
        }
    
        const ordersHref = setParams(ordersUrl, ordersQuery)
    
        const ordersRes = await fetch(ordersHref, ordersOptions)
    
        const fallbackOrders = (await ordersRes.json()) as OrdersType

        // TOKENS
        const tokensOptions: RequestInit | undefined = {}

        const tokensUrl = new URL(`/api/v1/tokens/`, API_BASE)

        const tokensQuery: TokensQueryType = {
            // ...(contract_address && { parameters__offer__token: contract_address }),
            // ...(token_id && { parameters__offer__identifierOrCriteria: token_id })
        }
    
        const tokensHref = setParams(tokensUrl, tokensQuery)
    
        const tokensRes = await fetch(tokensHref, tokensOptions)
    
        const fallbackTokens = (await tokensRes.json()) as TokensType
    
        // RETURN
        return {
            props: { 
                fallbackAsset,
                fallbackEvents,
                fallbackOrders,
                fallbackTokens,
                contract_address,
                token_id
            }
        }
    } catch {
        return {
            notFound: true
        }
    }
}