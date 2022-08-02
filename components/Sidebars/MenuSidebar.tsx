import { Box } from '../Box/Box'
import { useSidebars } from '../../hooks/useSidebars'
import { ChevronRight } from '../Icons/ChevronRight'
import Link from 'next/link'
import { sprinkles } from '../../styles/sprinkles.css'
import { useEffect, useReducer, useState } from 'react'
import { useAccount, useNetwork } from 'wagmi'
import { useConnectModal } from '@rainbow-me/rainbowkit'

export const MenuSidebar: React.FC = () => {
    const { isMenuSidebarOpen, toggleMenuSidebar, closeMenuSidebar, toggleWalletSidebar } = useSidebars()
    const { chain } = useNetwork()
    const { address } = useAccount()
    const { openConnectModal } = useConnectModal()

    const [mounted, setMounted] = useReducer(() => true, false);
    useEffect (
        setMounted, 
        [setMounted]
    )

    return (
        <Box
            as='aside'
            width='full'
            style={{
                transition: 'transform 0.3s ease 0s, opacity 0.3s ease 0s', 
                transform: isMenuSidebarOpen ? 'translate3d(0px, 0px, 0px) translate3d(0px, 0px, 0px)' : 'translate3d(100%, 0px, 0px) translate3d(0px, 0px, 0px)',
                height: 'calc(100% - 72px)',
                filter: 'drop-shadow(rgba(0, 0, 0, 0.25) 0px 4px 4px)',
                zIndex: '3',
                border: '1px solid rgb(229, 232, 235)'
            }}
            bottom='0'
            background='defaultBackground'
            whiteSpace='nowrap'
            flexGrow='1'
            right='0'
            position='fixed'
            opacity={isMenuSidebarOpen ? '1' : '0'}
        >
            <Box
                display='flex'
                flexDirection='column'
                height='full'
                overflow='scroll'
            >
                <Link href='/faucet'>
                    <Box
                        as='a'
                        cursor='pointer'
                        display='flex'
                        alignItems='center'
                        justifyContent='space-between'
                        height='72'
                        minHeight='72'
                        color='defaultText'
                        paddingX='10'
                        fontWeight='semibold'
                        onClick={toggleMenuSidebar}
                        className={sprinkles({
                            color: {
                            hover: 'defaultTextHover'
                            }
                        })}
                    >
                        Faucet
                        <ChevronRight width='24' color='black' />
                    </Box>
                </Link>
                <Link href='/create'>
                    <Box
                        as='a'
                        cursor='pointer'
                        display='flex'
                        alignItems='center'
                        justifyContent='space-between'
                        height='72'
                        minHeight='72'
                        color='defaultText'
                        paddingX='10'
                        fontWeight='semibold'
                        onClick={toggleMenuSidebar}
                        className={sprinkles({
                            color: {
                            hover: 'defaultTextHover'
                            }
                        })}
                    >
                        Create
                        <ChevronRight width='24' color='black' />
                    </Box>
                </Link>
                <Link href='/profile'>
                    <Box
                        as='a'
                        cursor='pointer'
                        display='flex'
                        alignItems='center'
                        justifyContent='space-between'
                        height='72'
                        minHeight='72'
                        color='defaultText'
                        paddingX='10'
                        fontWeight='semibold'
                        onClick={toggleMenuSidebar}
                        className={sprinkles({
                            color: {
                            hover: 'defaultTextHover'
                            }
                        })}
                    >
                        Profile
                        <ChevronRight width='24' color='black' />
                    </Box>
                </Link>
                <Box
                    as='button'
                    display='flex'
                    alignItems='center'
                    justifyContent='space-between'
                    fontWeight='semibold'
                    color='defaultText'
                    paddingX='10'
                    height='72'
                    minHeight='72'
                    className={sprinkles({
                        color: {
                        hover: 'defaultTextHover'
                        }
                    })}
                    onClick={!mounted || !address || !chain || chain.unsupported 
                        ? () => { closeMenuSidebar(); openConnectModal ? openConnectModal() : '' }
                        : toggleWalletSidebar
                    }
                >
                    {!mounted || !address || !chain || chain.unsupported 
                        ? 'Connect'
                        : 'Wallet'
                    }
                    <ChevronRight width='24' color='black' />
                </Box>
            </Box>
        </Box>
    )
}