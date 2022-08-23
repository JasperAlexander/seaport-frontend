import { FC } from 'react'
import { Box } from '../Box/Box'
import { useSidebars } from '../../hooks/useSidebars'
import { ChevronRightIcon } from '../Icons/ChevronRightIcon'
import Link from 'next/link'
import { sprinkles } from '../../styles/sprinkles.css'
import { useAccount, useNetwork } from 'wagmi'
import { useConnectModal } from '@rainbow-me/rainbowkit'
import useMounted from '../../hooks/useMounted'

export const MenuSidebar: FC = () => {
    const { isMenuSidebarOpen, toggleMenuSidebar, closeMenuSidebar } = useSidebars()
    const { chain } = useNetwork()
    const { address } = useAccount()
    const { openConnectModal } = useConnectModal()
    const { mounted } = useMounted()

    return (
        <Box
            as='aside'
            width='full'
            style={{
                transition: 'transform 0.3s ease 0s, opacity 0.3s ease 0s', 
                transform: isMenuSidebarOpen ? 'translate3d(0px, 0px, 0px) translate3d(0px, 0px, 0px)' : 'translate3d(100%, 0px, 0px) translate3d(0px, 0px, 0px)',
                height: 'calc(100% - 72px)',
                filter: 'drop-shadow(rgba(0, 0, 0, 0.25) 0px 4px 4px)',
                zIndex: '300',
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
                <Link href='/faucet' passHref={true}>
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
                        fontWeight='600'
                        onClick={toggleMenuSidebar}
                        className={sprinkles({
                            color: {
                            hover: 'defaultTextHover'
                            }
                        })}
                    >
                        Faucet
                        <ChevronRightIcon />
                    </Box>
                </Link>
                <Link href='/create' passHref={true}>
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
                        fontWeight='600'
                        onClick={toggleMenuSidebar}
                        className={sprinkles({
                            color: {
                            hover: 'defaultTextHover'
                            }
                        })}
                    >
                        Create
                        <ChevronRightIcon />
                    </Box>
                </Link>
                <Link href='/profile' passHref={true}>
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
                        fontWeight='600'
                        onClick={toggleMenuSidebar}
                        className={sprinkles({
                            color: {
                            hover: 'defaultTextHover'
                            }
                        })}
                    >
                        Profile
                        <ChevronRightIcon />
                    </Box>
                </Link>
                <Box
                    as='button'
                    display='flex'
                    alignItems='center'
                    justifyContent='space-between'
                    fontWeight='600'
                    color='defaultText'
                    paddingX='10'
                    height='72'
                    minHeight='72'
                    className={sprinkles({
                        color: {
                        hover: 'defaultTextHover'
                        }
                    })}
                    // onClick={!mounted || !address || !chain || chain.unsupported 
                    //     ? () => { closeMenuSidebar(); openConnectModal ? openConnectModal() : '' }
                    //     : toggleWalletSidebar
                    // }
                >
                    {!mounted || !address || !chain || chain.unsupported 
                        ? 'Connect'
                        : 'Wallet'
                    }
                    <ChevronRightIcon />
                </Box>
            </Box>
        </Box>
    )
}