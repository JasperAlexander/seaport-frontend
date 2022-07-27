import Link from 'next/link'
import { ethers } from 'ethers'
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

    const assetEventsCreated = events.filter((event) => {
        return (
            event.asset.contract_address === asset.asset_contract.address && 
            event.asset.token_id === asset.token_id &&
            event.event_type === EventTypes.created
        )
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
                {asset.image_url
                    ? <Box
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
                    : ''
                }
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

        

        {assetEventsCreated.length === 0
            ? asset.owner === address
                ?
                <>
                    <Box
                        as='button'
                        borderWidth='0'
                        borderRadius='0'
                        padding='10'
                        display='flex'
                        justifyContent='center'
                        margin='0'
                        background='orderAction'
                        color='orderBackground'
                        transition='default'
                        className={sprinkles({
                            background: {
                              hover: 'orange700'
                            },
                            boxShadow: {
                              hover: 'default'
                            },
                            borderColor: {
                              hover: 'actionButtonBorderMobile',
                              focus: 'actionButtonBorderMobile'
                            }
                        })}
                        cursor='pointer'
                        onClick={() => openSellModal()}
                        style={{ 
                            borderTop: '1px solid #EEEEEE', 
                            borderBottom: 'none !important', 
                            borderLeft: 'none !important', 
                            borderRight: 'none !important',
                            zIndex: '1'
                        }}
                    >
                        Sell Asset
                    </Box>
                    <SellModal nftid={asset.token_id} asset={asset} onClose={closeSellModal} open={sellModalOpen} />
                </>
            : 
                <Box
                    as='button'
                    borderWidth='0'
                    borderRadius='0'
                    padding='10'
                    display='flex'
                    justifyContent='center'
                    margin='0'
                    background='orderAction'
                    color='orderBackground'
                    transition='default'
                    className={sprinkles({
                        background: {
                          hover: 'orange700'
                        },
                        boxShadow: {
                          hover: 'default'
                        },
                        borderColor: {
                          hover: 'actionButtonBorderMobile',
                          focus: 'actionButtonBorderMobile'
                        }
                    })}
                    style={{ 
                        borderTop: '1px solid #EEEEEE', 
                        borderBottom: 'none !important', 
                        borderLeft: 'none !important', 
                        borderRight: 'none !important',
                        zIndex: '1'
                    }}
                >
                    Not listed for sale
                </Box>
        : asset.owner !== address
                ? <>
                    <Box
                        as='button'
                        borderWidth='0'
                        borderRadius='0'
                        padding='10'
                        display='flex'
                        justifyContent='center'
                        margin='0'
                        background='orderAction'
                        color='orderBackground'
                        transition='default'
                        className={sprinkles({
                            background: {
                              hover: 'orange700'
                            },
                            boxShadow: {
                              hover: 'default'
                            },
                            borderColor: {
                              hover: 'actionButtonBorderMobile',
                              focus: 'actionButtonBorderMobile'
                            }
                        })}
                        cursor='pointer'
                        onClick={() => openBuyModal()}
                        style={{ 
                            borderTop: '1px solid #EEEEEE', 
                            borderBottom: 'none !important', 
                            borderLeft: 'none !important', 
                            borderRight: 'none !important',
                            // backgroundColor: '#FA5B0F',
                            zIndex: '1'
                        }}
                    >
                        Buy NFT
                    </Box>
                    {assetEventsCreated[0].order 
                        ? <BuyModal asset={asset} order={assetEventsCreated[0].order} onClose={closeBuyModal} open={buyModalOpen} />
                        : ''
                    }
                </>
                : 
                <Box
                    as='button'
                    borderWidth='0'
                    borderRadius='0'
                    padding='10'
                    display='flex'
                    justifyContent='center'
                    margin='0'
                    background='orderAction'
                    color='orderBackground'
                    transition='default'
                    className={sprinkles({
                        background: {
                          hover: 'orange700'
                        },
                        boxShadow: {
                          hover: 'default'
                        },
                        borderColor: {
                          hover: 'actionButtonBorderMobile',
                          focus: 'actionButtonBorderMobile'
                        }
                    })}
                    cursor='pointer'
                    onClick={() => {
                        if(asset.owner === address) 
                            addEvent(
                                EventTypes.cancelled,
                                {
                                    contract_address: asset.asset_contract.address,
                                    token_id: asset.token_id
                                },
                                '',
                                address,
                                '',
                                false,
                                'ETH',
                                2,
                                ''
                            )
                    }}
                    style={{ 
                        borderTop: '1px solid #EEEEEE', 
                        borderBottom: 'none !important', 
                        borderLeft: 'none !important', 
                        borderRight: 'none !important',
                        // backgroundColor: '#FA5B0F',
                        zIndex: '1'
                    }}
                >
                    Cancel listing
                </Box>
        }
    </Box>
  )
}
