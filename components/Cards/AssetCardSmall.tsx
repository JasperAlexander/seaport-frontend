import Link from 'next/link'
import useSeaport from '../../hooks/useSeaport'
import { EthIcon } from '../Icons/EthIcon'
import { FC, useState, useCallback } from 'react'
import { BuyModal } from '../Modals/BuyModal'
import { SellModal } from '../Modals/SellModal'
import { Box } from '../Box/Box'
import { AssetType } from '../../types/assetTypes'
import { sprinkles } from '../../styles/sprinkles.css'
import { AssetCardButton } from '../Buttons/AssetCardButton'
import LoadingCard from './LoadingCard'

type Props = {
    asset: AssetType
    mutate: () => void
    isOwner?: boolean
}

export const AssetCardSmall: FC<Props> = ({
    asset,
    mutate,
    isOwner
}) => {
    const { seaport } = useSeaport()

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
            <Link href={`/assets/${asset.asset_contract.address}/${asset.token_id}`} passHref={true}>
                <Box
                    as='a' 
                    display='flex'
                    flexDirection='column'
                    zIndex='100'
                    position='relative'
                >
                    <Box
                        aspectRatio='1'
                        overflow='hidden'
                    >
                        {asset.image_url
                            ? 
                                <Box
                                    as='img' 
                                    src={asset.image_url}
                                    dimension='full'
                                    className={sprinkles({
                                        transition: 'assetCardImage',
                                        scale: {
                                            hover: 'growLg'
                                        }
                                    })} 
                                />
                            : <LoadingCard />
                        }
                    </Box>

                    <Box 
                        paddingY='8' 
                        paddingX='10' 
                        display='flex' 
                        flexDirection='column' 
                        gap='8'
                        style={{zIndex: '200'}}
                    >
                        <Box display='flex' flexDirection='column'>
                            <Box as='span' fontSize='12' fontWeight='600'>{asset.name}</Box>
                            <Box as='span' fontSize='12'>{asset.description}</Box>
                        </Box>
                        <Box>
                            <Box as='span' fontSize='12' fontWeight='600'>Price</Box>
                            <Box display='flex' alignItems='center' height='20' gap='5'>
                                <EthIcon width='16' />
                                <Box as='span' fontSize='16' fontWeight='600'>
                                    0,01
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Link>

            {isOwner
                ? asset.last_sale // should be .listing_date but not yet implemented
                    ?
                        <AssetCardButton 
                            title='Cancel listing'  // Or accept bid
                            onClick={() => { return }}
                        />
                    :
                        <>
                            <AssetCardButton 
                                title='Sell asset' 
                                onClick={() => openSellModal()}
                            />
                            <SellModal nftid={asset.token_id} asset={asset} onClose={closeSellModal} open={sellModalOpen} />
                        </>
                : asset.last_sale // should be .listing_date but not yet implemented
                    ?
                        <>
                            <AssetCardButton
                                title='Buy asset'
                                onClick={() => openBuyModal()}
                            />
                            {/* <BuyModal asset={asset} order={} onClose={closeBuyModal} open={buyModalOpen} /> */}
                        </>
                    :
                        <AssetCardButton
                            title='Not listed'
                            onClick={() => { return }}
                        />
            }
        </Box>
    )
}
