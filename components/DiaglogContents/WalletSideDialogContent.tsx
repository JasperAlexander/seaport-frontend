import Link from 'next/link'
import { Dispatch, FC, SetStateAction, useCallback, useEffect, useState } from 'react'
import { useAccount, useBalance } from 'wagmi'
import useMounted from '../../hooks/useMounted'
import { sprinkles } from '../../styles/sprinkles.css'
import { Box } from '../Box/Box'
import { CopyIcon } from '../Icons/CopyIcon'
import { DoneIcon } from '../Icons/DoneIcon'
import { EthIcon } from '../Icons/EthIcon'
import { WethIcon } from '../Icons/WethIcon'
import * as Dialog from '@radix-ui/react-dialog'
import * as styles from './DialogContent.css'

interface Props {
    open: boolean
    setOpen: Dispatch<SetStateAction<boolean>>
}

export const WalletSideDialogContent: FC<Props> = ({
    open,
    setOpen
}) => {
    const { mounted } = useMounted()

    const { address } = useAccount()
    const ETHbalance = useBalance({
        addressOrName: address,
        chainId: 1,
        formatUnits: 'ether',
        // suspense: true,
        enabled: false
    })
    const WETHbalance = useBalance({
        addressOrName: address,
        token: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2', // WETH on Ethereum Mainnet
        chainId: 1,
        formatUnits: 'ether',
        // suspense: true,
        enabled: false
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

    return (
        <Dialog.Content asChild={true}>
            <Box
                as='aside'
                style={{
                    height: 'calc(100% - 72px)'
                }}
                width='420'
                className={styles.sideDialogContentContainer}
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
                                    onClick={() => setOpen(false)}
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
        </Dialog.Content>
    )
}