import Link from 'next/link'
import { BigNumber, ethers } from 'ethers'
import { Seaport } from '@opensea/seaport-js'
import { useSeaport } from '../../hooks/useSeaport'
import { useAccount } from 'wagmi'
import { ETH } from '../Icons/ETH'
import { useState, useCallback } from 'react'
import { BuyModal } from '../Modals/BuyModal'
import { SellModal } from '../Modals/SellModal'
import { Box } from '../Box/Box'
import { AssetType } from '../../types/assetTypes'
import { EventType, EventTypes } from '../../types/eventTypes'
import { useEvents } from '../../hooks/useEvents'
import { sprinkles } from '../../styles/sprinkles.css'
import { AssetCardButton } from '../Buttons/AssetCardButton'
import LazyLoad from 'react-lazyload'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'

const contractAddresses = require('../../utils/contractAddresses.json')

type Props = {
    asset: AssetType
    event: EventType
}

export const AssetCardSmall: React.FC<Props> = ({
    asset,
    event 
}: Props) => {
    const { seaport, setSeaport } = useSeaport()
    const { events, addEvent } = useEvents()
    const { address } = useAccount()

    const assetEventsListed = events.filter((event) => {
        return (
            event.asset.contract_address === asset.asset_contract.address && 
            event.asset.token_id.toString() === asset.token_id.toString() &&
            event.event_type === EventTypes.listed
        )
    })

    const assetEventsCancelled = events.filter((event) => {
        return (
            event.asset.contract_address === asset.asset_contract.address && 
            event.asset.token_id.toString() === asset.token_id.toString() &&
            event.event_type === EventTypes.cancelled
        )
    })

    const lastEvent = [
        ...assetEventsListed,
        ...assetEventsCancelled
    ].sort((a, b) => {
        return new Date(b.created_date).getTime() - new Date(a.created_date).getTime()
    })

    if(typeof window !== 'undefined' && typeof seaport === 'undefined') {
        const provider = new ethers.providers.Web3Provider((window as any).ethereum);
        const newSeaport = new Seaport(
            provider, {
                overrides: {
                    contractAddress: contractAddresses.Seaport
                }
            }
        )
        setSeaport(newSeaport)
        console.log('Seaport initialised')
    }

    const useBooleanState = (initialValue: boolean) => {
        const [value, setValue] = useState(initialValue)
        const setTrue = useCallback(() => setValue(true), [])
        const setFalse = useCallback(() => setValue(false), [])
    
        return { setFalse, setTrue, value }
    }

    const {
        setFalse: closeBuyModal,
        setTrue: openBuyModal,
        value: buyModalOpen,
    } = useBooleanState(false)

    const {
        setFalse: closeSellModal,
        setTrue: openSellModal,
        value: sellModalOpen,
    } = useBooleanState(false)

    return (
        <Box
            display='flex'
            id='assetCard'
            flexDirection='column'
            background='orderBackground'
            height='auto'
            overflow='hidden'
            borderRadius='10'
            borderWidth='1'
            boxShadow='box'
            className={sprinkles({
                boxShadow: {
                    hover: 'boxHover'
                }
            })}
            transition='default'
            cursor='pointer'
        >
            <Link href={`/assets/${contractAddresses.TestERC721}/${asset.token_id}`}>
                <Box
                    as='a' 
                    display='flex'
                    flexDirection='column'
                    zIndex='1'
                    position='relative'
                >
                    <Box
                        aspectRatio='1'
                        overflow='hidden'
                    >
                        <LazyLoad
                            height={document.querySelector('#assetCard')?.getBoundingClientRect().height}
                            offset={50}
                        >
                            {/* Skeleton and lazyload not tested yet */}
                            <SkeletonTheme baseColor="#202020" highlightColor="#444">
                                {asset.image_url
                                    ? 
                                        <Box
                                            as='img' 
                                            src={URL.createObjectURL(asset.image_url)} 
                                            alt='NFT image' 
                                            height='full'
                                            width='full'
                                            className={sprinkles({
                                                transition: 'assetCardImage',
                                                scale: {
                                                    hover: 'growLg'
                                                }
                                            })} 
                                        />
                                    : <Skeleton count={3} />
                                }
                            </SkeletonTheme>
                        </LazyLoad>
                    </Box>

                    <Box 
                        paddingY='8' 
                        paddingX='10' 
                        display='flex' 
                        flexDirection='column' 
                        gap='8'
                        style={{zIndex: '2'}}
                    >
                        <Box display='flex' flexDirection='column'>
                            <Box as='span' fontSize='16' fontWeight='semibold'>{asset.name}</Box>
                            <Box as='span' fontSize='14'>{asset.description}</Box>
                        </Box>
                        <Box as='span' fontSize='14' fontWeight='semibold'>Price</Box>
                        <Box display='flex' alignItems='center' height='20'>
                            <ETH width='12' color='black' />
                            <Box as='span' fontSize='16' fontWeight='semibold'>
                                2
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Link>

            

            {lastEvent.length === 0 || lastEvent[0].event_type !== EventTypes.listed
                ? asset.owner === address
                    ?
                    <>
                        <AssetCardButton 
                            title='Sell Asset' 
                            onClick={() => openSellModal()}
                        />
                        <SellModal nftid={asset.token_id} asset={asset} onClose={closeSellModal} open={sellModalOpen} />
                    </>
                : 
                    <AssetCardButton
                        title='Not listed for sale'
                        onClick={() => { return }}
                    />
            : asset.owner !== address
                    ? <>
                        <AssetCardButton
                            title='Buy Asset'
                            onClick={() => openBuyModal()}
                        />
                        {lastEvent[0].order
                            ? <BuyModal asset={asset} order={lastEvent[0].order} onClose={closeBuyModal} open={buyModalOpen} />
                            : ''
                        }
                    </>
                    : 
                    <AssetCardButton
                        title='Cancel listing'
                        onClick={() => {
                            if(asset.owner === address) 
                                addEvent(
                                    EventTypes.cancelled,
                                    {
                                        contract_address: asset.asset_contract.address,
                                        token_id: asset.token_id
                                    },
                                    new Date(),
                                    address,
                                    '',
                                    false,
                                    'ETH',
                                    2,
                                    ''
                                )
                        }}
                    />
            }
        </Box>
    )
}
