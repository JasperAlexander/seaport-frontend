import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import Head from 'next/head'
import React, { useState, useEffect } from 'react'
import { Box } from '../../../components/Box/Box'
import { sprinkles } from '../../../styles/sprinkles.css'
import { AssetContainer } from '../../../components/Container/AssetContainer'
import { AssetAccordion } from '../../../components/Accordions/AssetAccordion/AssetAccordion'
import { CardContainer } from '../../../components/Container/CardContainer'
import { AssetHeader } from '../../../components/Container/AssetHeader'
import { AssetMeta } from '../../../components/Container/AssetMeta'
import { AssetAccordionTable } from '../../../components/Accordions/AssetAccordion/AssetAccordionTable'
import { useAssets } from '../../../hooks/useAssets'
import { AssetType } from '../../../types/assetTypes'
import { useEvents } from '../../../hooks/useEvents'
import { EventTypes } from '../../../types/eventTypes'

const Asset: NextPage = () => {
    const router = useRouter()
    const { address, id } = router.query
    const { assets } = useAssets()
    const { events } = useEvents()

    const [asset, setAsset] = useState<AssetType>()
    useEffect(() => {
        const foundAsset = assets.find((a) => {
            return a.asset_contract.address === address && a.token_id.toString() === id
        })
        setAsset(foundAsset)
    }, [])

    const assetEventsCreated = events.filter((event) => {
        return (
            asset &&
            event.asset.contract_address === asset.asset_contract.address && 
            event.asset.token_id === asset.token_id &&
            event.event_type === EventTypes.created
        )
    })
    
    return (
        <React.Fragment>
        <Head>
            <title>Asset | Seaport implementation</title>
            <meta name="description" content="An example of how to implement the Seaport marketplace protocol." />
            <link rel="icon" href="/favicon.ico" />
        </Head>

        <Box
            as='main'
            width='full'
            marginTop='8'
            marginBottom='16'
            marginX='8'
            className={sprinkles({
                marginX: {
                    largeScreen: '0'
                }
            })}
        >
            <Box
                display='none'
                width='full'
                className={sprinkles({
                    display: {
                        largeScreen: 'flex'
                    },
                })}
            >
                <Box
                display='flex'
                flexDirection='column'
                width='full'
                >
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
                            <AssetContainer asset={asset} />
                            <AssetAccordion asset={asset} title='Description'>
                                <Box
                                    padding='30'
                                >
                                    {asset 
                                        ? asset.asset_contract.description 
                                        : ''
                                    }
                                </Box>
                            </AssetAccordion>
                        </Box>
                        <Box
                            flexGrow='4'
                            flexShrink='0'
                            flexBasis='0'
                            marginLeft='-20'
                        >
                            <AssetHeader asset={asset} />
                            <AssetMeta asset={asset} />
                            <CardContainer asset={asset} assetEventsCreated={assetEventsCreated} />
                            <AssetAccordion asset={asset} title='Listings'>
                                <AssetAccordionTable 
                                    header={['Price', 'USD Price', 'Expiration', '']} 
                                    data={[
                                        ['1', '', '3', ''], 
                                        ['1', '2', '3', '4']
                                    ]}
                                />
                            </AssetAccordion>
                            <AssetAccordion asset={asset} title='Offers'>
                                <AssetAccordionTable 
                                    header={['Price', 'USD Price', 'Floor Difference', 'Expiration', 'From']} 
                                    data={[
                                        ['1', '2', '3', '4', '5'], 
                                        ['1', '2', '3', '4', '5'],
                                        ['1', '2', '3', '4', '5'],
                                        ['1', '2', '3', '4', '5'],
                                        ['1', '2', '3', '4', '5'],
                                        ['1', '2', '3', '4', '5'],
                                        ['1', '2', '3', '4', '5'],
                                        ['1', '2', '3', '4', '5'],
                                    ]}
                                />
                            </AssetAccordion>
                        </Box>
                    </Box>
                    <Box
                        display='flex'
                        flexDirection='column'
                        width='full'
                    >
                        <AssetAccordion asset={asset} title='Activity' marginTop='0'>
                            <AssetAccordionTable 
                                header={['Event', 'Price', 'From', 'To', 'Date']} 
                                data={[
                                    ['Transfer', '', '', '', ''], 
                                    ['Transfer', '', '', '', '']
                                ]}
                            />
                        </AssetAccordion>
                    </Box>
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
                    <AssetHeader asset={asset} />
                    <AssetContainer asset={asset} />
                    <AssetMeta asset={asset} />
                    <CardContainer asset={asset} assetEventsCreated={assetEventsCreated} />
                </Box>
            </Box>
        </Box>
        </React.Fragment>
    )
}

export default Asset
// Offers rechts, item activity hele breedte, more from collection hele breedte 