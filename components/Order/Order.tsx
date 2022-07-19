import Link from 'next/link'
import { OrderWithMeta } from '../../types/orderTypes'
import { ethers } from 'ethers'
import { Seaport } from '@opensea/seaport-js'
import { useStore } from '../../hooks/useStore'
import { useAccount } from 'wagmi'
import { ETH } from '../Icons/ETH'
import { useState, useCallback } from 'react'
import { BuyModal } from '../Modals/BuyModal'
import { SellModal } from '../Modals/SellModal'
import { Box } from '../Box/Box'
import { touchableStyles } from '../../styles/touchableStyles'
import { Text } from '../Text/Text'

const contractAddresses = require('../../utils/contractAddresses.json')

type Props = {
    order: OrderWithMeta
}

export const Order: React.FC<Props> = ({ order }: Props) => {
    const { seaport, setSeaport, updateOrder } = useStore()
    const { address } = useAccount()

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
    // <div className='order'>
    <Box
        as='a'
        display='flex'
        flexDirection='column'
        background='orderBackground'
        height='auto'
        overflow='hidden'
        borderRadius='10'
        borderWidth='0'
        // style={{ boxShadow: '10px 10px 20px #cacaca, -10px -10px 20px #ffffff' }}
        className={touchableStyles({ hoverScale: 'grow', hoverBackground: 'white' })}
        transition='default'
        cursor='pointer'
    >
        <Link href={`/asset/${contractAddresses.TestERC721}/${order.meta.NFTID}`}>
            <a style={{display: 'flex', flexDirection: 'column', zIndex: '1'}}>
                {order.meta.NFTimage 
                    ? <img className='NFTimg' src={URL.createObjectURL(order.meta.NFTimage)} alt='NFT image' />
                    : ''
                }

                <Box paddingY='8' paddingX='10' display='flex' flexDirection='column' gap='8'>
                    <Box display='flex' flexDirection='column'>
                        <Text as='span' size='14' weight='bold'>{order.meta.NFTname}</Text>
                        <Text as='span' size='14'>{order.meta.NFTdescription}</Text>
                    </Box>
                    <Text as='span' size='14' weight='bold'>Price</Text>
                    <Box display='flex' alignItems='center' height='20'>
                        <ETH />
                        <Text as='span' size='16' weight='bold'>
                            {order.order ? ethers.utils.formatEther(order.order.parameters.consideration[0].startAmount) : '2'}
                        </Text>
                    </Box>
                </Box>
            </a>
        </Link>

        {typeof order.order === 'undefined'
            ? typeof order.meta.NFTcreator !== 'undefined'
                ? order.meta.NFTcreator === address
                    ?
                        <>
                        {/* <button type='button' className='orderBtn' onClick={() => openSellModal()}>
                            Sell NFT
                        </button> */}
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
                            className={touchableStyles({ 
                                hoverBackground: 'orange',
                                hoverColor: 'white',
                                hoverScale: 'noGrow'
                            })}
                            cursor='pointer'
                            onClick={() => openSellModal()}
                            style={{ 
                                borderTop: '1px solid #EEEEEE', 
                                borderBottom: 'none !important', 
                                borderLeft: 'none !important', 
                                borderRight: 'none !important',
                                // backgroundColor: '#FA5B0F',
                                zIndex: '1'
                            }}
                        >
                            Sell NFT
                        </Box>
                        <SellModal nftid={order.meta.NFTID} order={order} onClose={closeSellModal} open={sellModalOpen} />
                        </>
                    // : <button type='button' className='orderBtn'>Not listed for sale</button>
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
                            className={touchableStyles({ 
                                hoverBackground: 'orange',
                                hoverColor: 'white',
                                hoverScale: 'noGrow'
                            })}
                            style={{ 
                                borderTop: '1px solid #EEEEEE', 
                                borderBottom: 'none !important', 
                                borderLeft: 'none !important', 
                                borderRight: 'none !important',
                                // backgroundColor: '#FA5B0F',
                                zIndex: '1'
                            }}
                        >
                            Not listed for sale
                        </Box>
                : ''
            : order.meta.NFTcreator !== address 
                ? <>
                    {/* <button type='button' className='orderBtn' onClick={() => openBuyModal()}>
                        Buy NFT
                    </button> */}
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
                        className={touchableStyles({ 
                            hoverBackground: 'orange',
                            hoverColor: 'white',
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
                    <BuyModal order={order} onClose={closeBuyModal} open={buyModalOpen} />
                </>
                // : <button type='button' className='orderBtn' onClick={() => updateOrder(order.meta.NFTID, undefined)}>Cancel listing</button>
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
                    className={touchableStyles({ 
                        hoverBackground: 'orange',
                        hoverColor: 'white',
                    })}
                    cursor='pointer'
                    onClick={() => updateOrder(order.meta.NFTID, undefined)}
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
