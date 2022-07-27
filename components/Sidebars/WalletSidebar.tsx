import { Box } from '../Box/Box'
import { useSidebars } from '../../hooks/useSidebars'
import Link from 'next/link'
import { sprinkles } from '../../styles/sprinkles.css'
import { useAccount } from 'wagmi'
import { useCallback, useEffect, useReducer, useState } from 'react'
import { ContentCopy } from '../Icons/ContentCopy'
import { Done } from '../Icons/Done'
import { ETH } from '../Icons/ETH'

export const WalletSidebar: React.FC = () => {
  const { isWalletSidebarOpen } = useSidebars()
  const { address } = useAccount()

  const [mounted, setMounted] = useReducer(() => true, false);
    useEffect (
        setMounted, 
        [setMounted]
    )

    const [copiedAddress, setCopiedAddress] = useState(false);

    const copyAddressAction = useCallback(() => {
        if (address) {
        navigator.clipboard.writeText(address);
        setCopiedAddress(true);
        }
    }, [address]);

    useEffect(() => {
        if (copiedAddress) {
            const timer = setTimeout(() => {
                setCopiedAddress(false);
            }, 1500);
            return () => clearTimeout(timer);
        }
    }, [copiedAddress]);

    return (
        <Box
            as='aside'
            width='full'
            className={sprinkles({
                width: {
                    largeScreen: '420'
                }
            })}
            style={{
                transition: 'all 0.3s ease 0s, opacity 0.3s ease 0s', 
                transform: isWalletSidebarOpen ? 'translate3d(0px, 0px, 0px) translate3d(0px, 0px, 0px)' : 'translate3d(100%, 0px, 0px) translate3d(0px, 0px, 0px)',
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
                        ? <Done width='24' color='rgb(112, 122, 131)' />
                        : <ContentCopy width='24' color='rgb(112, 122, 131)' />
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
                            fontWeight='semibold'
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
                                    <ETH width='16' color='black' />
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
                                            fontWeight='semibold'
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
                                        fontWeight='semibold'
                                        textAlign='right'
                                    >
                                        0,001
                                    </Box>
                                    <Box
                                        textAlign='right'
                                    >
                                        €0,00 EUR
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}