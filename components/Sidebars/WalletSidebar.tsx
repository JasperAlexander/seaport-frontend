import { Box } from '../Box/Box'
import { useSidebars } from '../../hooks/useSidebars'
import { sprinkles } from '../../styles/sprinkles.css'
import { useAccount, useBalance } from 'wagmi'
import { useCallback, useEffect, useState } from 'react'
import { CopyIcon } from '../Icons/CopyIcon'
import { DoneIcon } from '../Icons/DoneIcon'
import { EthIcon } from '../Icons/EthIcon'
import useMounted from '../../hooks/useMounted'
import { WethIcon } from '../Icons/WethIcon'
import { SideDialog } from '../Dialog/SideDialog'
import Link from 'next/link'

export const WalletSidebar: React.FC = () => {
    const { mounted } = useMounted()

    const { isWalletSidebarOpen, toggleWalletSidebar } = useSidebars()

    const { address } = useAccount()
    const ETHbalance = useBalance({
        addressOrName: address,
        chainId: 1,
        formatUnits: 'ether',
        // suspense: true,
        enabled: false // Unkown yet if this hook can execute if address is not yet loaded
    })
    const WETHbalance = useBalance({
        addressOrName: address,
        token: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2', // WETH on Ethereum Mainnet
        chainId: 1,
        formatUnits: 'ether',
        // suspense: true,
        enabled: false // Unkown yet if this hook can execute if address is not yet loaded
    })

    const [copiedAddress, setCopiedAddress] = useState(false)

    const copyAddressAction = useCallback(() => {
        if (address) {
        navigator.clipboard.writeText(address)
        setCopiedAddress(true)
        }
    }, [address])

    useEffect(() => {
        if (copiedAddress) {
            const timer = setTimeout(() => {
                setCopiedAddress(false)
            }, 1500)
            return () => clearTimeout(timer)
        }
    }, [copiedAddress])

    // useEffect(() => {
    //     if (isWalletSidebarOpen) {
    //         document.body.style.overflow = 'hidden'
    //     } else {
    //         document.body.style.overflow = 'initial'
    //     }
    // }, [isWalletSidebarOpen])

    const titleId = 'si_wallet_sidebar_title'

    return (
        <SideDialog onClose={toggleWalletSidebar} open={isWalletSidebarOpen} titleId={titleId}>
        <Box
            as='aside'
            width='full'
            className={sprinkles({
                width: {
                    wideScreen: '420',
                    largeScreen: '420'
                }
            })}
            style={{
                transition: 'all 0.3s ease 0s, opacity 0.3s ease 0s', 
                transform: isWalletSidebarOpen ? 'translate3d(0px, 0px, 0px) translate3d(0px, 0px, 0px)' : 'translate3d(100%, 0px, 0px) translate3d(0px, 0px, 0px)',
                height: 'calc(100%)', // Before SideDialog -72px
                filter: 'drop-shadow(rgba(0, 0, 0, 0.25) 0px 4px 4px)',
                zIndex: '300',
                border: '1px solid rgb(229, 232, 235)',
            }}
            bottom='0'
            background='defaultBackground'
            whiteSpace='nowrap'
            flexGrow='1'
            right='0'
            position='fixed'
            overflow='scroll'
            opacity={isWalletSidebarOpen ? '1' : '0'}
        >
            <Box
                display='flex'
                flexDirection='column'
                height='full'
            >
                <Box
                    as='button'
                    aria-label='Copy address'
                    onClick={copyAddressAction}
                    display='flex'
                    alignItems='center'
                    justifyContent='space-between'
                    padding='20'
                    cursor='pointer'
                    height='72'
                    color='boxText'
                    style={{borderBottom: '1px solid rgb(229, 232, 235)'}}
                >
                    <Box
                        overflow='hidden'
                        textOverflow='ellipsis'
                    >
                        {mounted ? address : ''}
                    </Box>
                    {copiedAddress 
                        ? <DoneIcon fill='boxText' />
                        : <CopyIcon fill='boxText' />
                    }
                </Box>
                <Box
                    padding='20'
                >
                    <Box
                        display='flex'
                        flexDirection='column'
                        alignItems='center'
                        justifyContent='center'
                        width='full'
                        gap='20'
                    >
                        <Box
                            display='flex'
                            width='full'
                            flexDirection='column'
                            alignItems='center'
                            justifyContent='center'
                            borderWidth='1'
                            borderColor='box'
                            borderStyle='solid'
                            borderRadius='10'
                            fontWeight='600'
                            overflow='hidden'
                        >
                            <Box
                                display='flex'
                                flexDirection='column'
                                alignItems='center'
                                justifyContent='center'
                                gap='4'
                                paddingY='20'
                            >
                            <Box
                                fontSize='14'
                                color='boxText'
                            >
                                Total balance
                            </Box>
                            <Box
                                fontSize='20'
                            >
                                €0 EUR
                            </Box>
                            </Box>
                            <Link href='/faucet' passHref={true}>
                            <Box
                                as='a'
                                cursor='pointer'
                                onClick={toggleWalletSidebar}
                                display='flex'
                                alignItems='center'
                                justifyContent='center'
                                color='accentColorText'
                                width='full'
                                padding='16'
                                className={sprinkles({
                                    background: {
                                        base: 'accentColor',
                                        hover: 'accentColorHover'
                                    }
                                })}
                            >
                                Add funds
                            </Box>
                            </Link>
                        </Box>
                        <Box
                            display='flex'
                            width='full'
                            alignItems='center'
                            borderWidth='1'
                            borderColor='box'
                            borderStyle='solid'
                            borderRadius='10'
                            paddingY='20'
                            fontSize='15'
                        >
                            <Box
                                display='flex'
                                alignItems='center'
                                paddingX='16'
                                width='full'
                            >
                                <Box
                                    marginRight='16'
                                >
                                    <EthIcon />
                                </Box>
                                <Box
                                    display='flex'
                                    flexGrow='1'
                                    flexShrink='1'
                                    flexBasis='auto'
                                    marginRight='16'
                                >
                                    <Box
                                        display='flex'
                                        flexDirection='column'
                                    >
                                        <Box
                                            fontWeight='600'
                                        >
                                            ETH
                                        </Box>
                                        <Box>
                                            Ethereum
                                        </Box>
                                    </Box>
                                </Box>
                                <Box
                                    display='flex'
                                    flexDirection='column'
                                >
                                    <Box
                                        fontWeight='600'
                                        textAlign='right'
                                    >
                                        {mounted ? ETHbalance.data ? ETHbalance.data.formatted.toString() : '?' : '?'}
                                    </Box>
                                    <Box
                                        textAlign='right'
                                    >
                                        {mounted ? ETHbalance.data ? '€0,00 EUR' : '' : ''}
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                        <Box
                            display='flex'
                            width='full'
                            alignItems='center'
                            borderWidth='1'
                            borderColor='box'
                            borderStyle='solid'
                            borderRadius='10'
                            paddingY='20'
                            fontSize='15'
                        >
                            <Box
                                display='flex'
                                alignItems='center'
                                paddingX='16'
                                width='full'
                            >
                                <Box
                                    marginRight='16'
                                >
                                    <WethIcon />
                                </Box>
                                <Box
                                    display='flex'
                                    flexGrow='1'
                                    flexShrink='1'
                                    flexBasis='auto'
                                    marginRight='16'
                                >
                                    <Box
                                        display='flex'
                                        flexDirection='column'
                                    >
                                        <Box
                                            fontWeight='600'
                                        >
                                            WETH
                                        </Box>
                                        <Box>
                                            Ethereum
                                        </Box>
                                    </Box>
                                </Box>
                                <Box
                                    display='flex'
                                    flexDirection='column'
                                >
                                    <Box
                                        fontWeight='600'
                                        textAlign='right'
                                    >
                                        {mounted ? WETHbalance.data ? WETHbalance.data.formatted.toString() : '?' : '?'}
                                    </Box>
                                    <Box
                                        textAlign='right'
                                    >
                                        {mounted ? WETHbalance.data ? '€0,00 EUR' : '' : ''}
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
        </SideDialog>
    )
}