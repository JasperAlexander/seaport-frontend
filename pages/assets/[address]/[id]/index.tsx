import type { GetStaticPaths, GetStaticProps, InferGetStaticPropsType, NextPage } from 'next'
import Head from 'next/head'
import { Fragment, useEffect, useState } from 'react'
import { Box } from '../../../../components/Box/Box'
import { sprinkles } from '../../../../styles/sprinkles.css'
import { AssetCardLarge } from '../../../../components/Cards/AssetCardLarge'
import { AssetPriceAccordion } from '../../../../components/Accordions/AssetPriceAccordion/AssetPriceAccordion'
import { AssetHeader } from '../../../../components/Headers/AssetHeader'
import { AssetMeta } from '../../../../components/Containers/AssetMeta'
import useAsset from '../../../../hooks/useAsset'
import { AssetType } from '../../../../types/assetTypes'
import setParams from '../../../../utils/params'
import useMounted from '../../../../hooks/useMounted'
import { EventsQueryType, EventsType } from '../../../../types/eventTypes'
import useEvents from '../../../../hooks/useEvents'
import { useRouter } from 'next/router'
import { OffersAccordion } from '../../../../components/Accordions/OffersAccordion/OffersAccordion'
import { ActivityAccordion } from '../../../../components/Accordions/ActivityAccordion/ActivityAccordion'
import { ListingsAccordion } from '../../../../components/Accordions/ListingsAccordion/ListingsAccordion'
import { AssetInfoAccordion } from '../../../../components/Accordions/AssetInfoAccordion/AssetInfoAccordion'
import { MainLayout } from '../../../../components/Layouts/MainLayout'
import { useAccount } from 'wagmi'
import { MainButton } from '../../../../components/Buttons/MainButton'

type Props = InferGetStaticPropsType<typeof getStaticProps>

const AssetPage: NextPage<Props> = ({
    fallbackAsset,
    fallbackEvents,
    contract_address,
    token_id
}) => {
    const { mounted } = useMounted()

    const router = useRouter()
    const asset = useAsset(fallbackAsset, contract_address, token_id)
    const events = useEvents(router, fallbackEvents, contract_address, token_id)

    const { address } = useAccount()
    const [isOwner, setIsOwner] = useState<boolean>(false)
    useEffect(() => {
        if (asset?.data?.owner?.address === address)
            setIsOwner(true)
    })
    
    return (
        <Fragment>
            <Head>
                <title>Asset | Seaport implementation</title>
                <meta name="description" content="An example of how to implement the Seaport marketplace protocol." />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <MainLayout>
                <Box
                    display='none'
                    width='full'
                    className={sprinkles({
                        display: {
                            wideScreen: 'flex',
                            largeScreen: 'flex'
                        }
                    })}
                >
                    <Box
                        display='flex'
                        flexDirection='column'
                        width='full'
                    >
                        {isOwner &&
                            <Box 
                                display='flex'
                                justifyContent='flex-end'
                                alignItems='center'
                                position='sticky'
                                height='80' 
                                width='full' 
                                background='accordionBackground'
                                borderBottomWidth='1'
                                borderStyle='solid'
                                borderColor='box'
                            >
                                <Box 
                                    display='flex'
                                    gap='8'
                                    paddingX='40' 
                                    marginTop='-8'
                                >
                                    <MainButton 
                                        variant='secondary'
                                        onClick={() => {return null}}
                                        width='160'
                                    >
                                        Edit
                                    </MainButton>
                                    <MainButton 
                                        onClick={() => {return null}}
                                        href={`/assets/${asset?.data?.asset_contract?.address}/${asset?.data?.token_id}/sell`}
                                        width='160'
                                    >
                                        Sell
                                    </MainButton>
                                </Box>
                            </Box>
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
                                <AssetCardLarge asset={asset?.data} />
                                <AssetInfoAccordion data={asset?.data} />
                            </Box>
                            <Box
                                flexGrow='4'
                                flexShrink='0'
                                flexBasis='0'
                                marginLeft='-20'
                            >
                                <AssetHeader asset={asset?.data} />
                                <AssetMeta asset={asset?.data} />
                                {!isOwner &&
                                    <AssetPriceAccordion 
                                        asset={asset?.data}
                                        events={events}
                                    />
                                }
                                <ListingsAccordion
                                    data={events}
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
                    display='flex'
                    flexDirection='column'
                    alignItems='center'
                    className={sprinkles({
                        display: {
                            wideScreen: 'none',
                            largeScreen: 'none'
                        }
                    })}
                >
                    <Box
                        display='flex'
                        flexDirection='column'
                        flexWrap='wrap'
                        justifyContent='space-between'
                    >
                        <AssetHeader asset={asset?.data} />
                        <AssetCardLarge asset={asset?.data} />
                        <AssetMeta asset={asset?.data} />
                        {!isOwner &&
                            <AssetPriceAccordion 
                                asset={asset?.data}
                                events={events}
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
    contract_address: string
    token_id: string
}> = async ({ params }) => {
    // ASSET
    const contract_address = params?.address?.toString()
    const token_id = params?.id?.toString()
  
    if (!contract_address || !token_id) {
        return {
            notFound: true,
        }
    }
  
    const assetOptions: RequestInit | undefined = {}

    const assetUrl = new URL(`/api/v1/asset/${contract_address}/${token_id}/`, 'http://localhost:8000')

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

    const eventsUrl = new URL(`/api/v1/events/`, 'http://localhost:8000')

    const eventsQuery: EventsQueryType = {
        ...(contract_address && { asset_contract__address: contract_address }),
        ...(token_id && { token_id: token_id })
    }
  
    const eventsHref = setParams(eventsUrl, eventsQuery)
  
    const eventsRes = await fetch(eventsHref, eventsOptions)
  
    const fallbackEvents = (await eventsRes.json()) as EventsType
  
    // RETURN
    return {
        props: { 
            fallbackAsset,
            fallbackEvents,
            contract_address,
            token_id
        }
    }
}