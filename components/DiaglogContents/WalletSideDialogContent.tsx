import { Dispatch, FC, SetStateAction, useCallback, useEffect, useState } from 'react'
import { useAccount, useBalance } from 'wagmi'
import useMounted from '../../hooks/useMounted'
import { Box } from '../Box/Box'
import { EthIcon } from '../Icons/EthIcon'
import { WethIcon } from '../Icons/WethIcon'
import * as Dialog from '@radix-ui/react-dialog'
import * as styles from './DialogContent.css'
import { Text } from '../Text/Text'
import { NextLink } from '../NextLink/NextLink'
import { useSession } from 'next-auth/react'
import { ConnectWalletScreen } from '../ConnectWalletScreen/ConnectWalletScreen'
import { truncateAddress } from '../../utils/truncateText'
import { ChevronIcon } from '../Icons/ChevronIcon'
import { ChevronHorIcon } from '../Icons/ChevronHorIcon'
import useTranslation from 'next-translate/useTranslation'
import { DropdownTrigger } from '../DropdownTrigger/DropdownTrigger'
import { WalletDropdownContent } from '../DropdownContents/WalletDropdownContent'

interface Props {
    open: boolean
    setOpen: Dispatch<SetStateAction<boolean>>
}

export const WalletSideDialogContent: FC<Props> = ({
    open,
    setOpen
}) => {
    const { t } = useTranslation('common')
    const { mounted } = useMounted()
    const { data: session } = useSession()

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
        <Dialog.Content 
            asChild={true}
        >
            <Box
                as='aside'
                className={styles.sideDialogContentContainer}
                style={{height: 'calc(100% - 72px)'}}
            >
                <Box
                    display='flex'
                    flexDirection='column'
                    height='full'
                >
                    {session ?
                        <Box>
                            <Box
                                height='72'
                                borderBottomWidth='1'
                                borderStyle='solid'
                                borderColor='box'
                                width='full'
                                display='flex'
                                alignItems='center'
                                justifyContent='space-between'
                                padding='20'
                            >
                                <Box
                                    display='flex'
                                    alignItems='center'
                                    gap='8'
                                >
                                    <Box
                                        as='button'
                                        display={{
                                            wideScreen: 'none',
                                            largeScreen: 'none',
                                            base: 'inline-flex'
                                        }}
                                        aria-label='Back'
                                        onClick={() => setOpen(false)}
                                    >
                                        <ChevronHorIcon
                                            direction='left' 
                                            fill='boxText'
                                        />
                                    </Box>
                                    <DropdownTrigger
                                        content={<WalletDropdownContent />}
                                        offsetDistance={10}
                                    >
                                        <Box
                                            as='button'
                                            display='inline-flex'
                                            alignItems='center'
                                            gap='4'
                                        >
                                            <Box
                                                display='flex'
                                                alignItems='center'
                                                gap='8'
                                            >
                                                <Box
                                                    width='30'
                                                    height='30'
                                                    borderRadius='50p'
                                                    borderWidth='2'
                                                    borderColor='box'
                                                    borderStyle='solid'
                                                    alignItems='center'
                                                    justifyContent='center'
                                                    position='relative'
                                                    overflow='hidden'
                                                    maxHeight='full'
                                                    maxWidth='full'
                                                >
                                                    <Box
                                                        as='img' 
                                                        alt='User Profile Image'
                                                        src='https://storage.googleapis.com/opensea-static/opensea-profile/19.png' 
                                                        objectFit='cover'
                                                        height='full'
                                                        width='full'
                                                    />
                                                </Box>
                                                <Text>
                                                    {t('myWallet')}
                                                </Text>
                                            </Box>
                                            <ChevronIcon 
                                                fill='boxText'
                                            />
                                        </Box>
                                    </DropdownTrigger>
                                </Box>
                                <Box
                                    as='button'
                                    aria-label='Copy address'
                                    onClick={copyAddressAction}
                                    cursor='pointer'
                                >
                                    <Text
                                        color='boxText'
                                        fontSize='14'
                                        fontWeight='600'
                                    >
                                        {mounted 
                                            ? address
                                                ? truncateAddress(address) 
                                                : ''
                                            : ''
                                        }
                                    </Text>
                                </Box>
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
                                        <Text
                                            fontSize='14'
                                            color='boxText'
                                        >
                                            {t('totalBalance')}
                                        </Text>
                                        <Text
                                            fontSize='20'
                                        >
                                            €0 EUR
                                        </Text>
                                        </Box>
                                        <NextLink 
                                            href='/faucet'
                                            cursor='pointer'
                                            onClick={() => setOpen(false)}
                                            display='flex'
                                            alignItems='center'
                                            justifyContent='center'
                                            width='full'
                                            padding='16'
                                            background={{
                                                base: 'accentColor',
                                                hover: 'accentColorHover'
                                            }}
                                        >
                                            <Text
                                                color='accentColorText'
                                                fontWeight='600'
                                            >
                                                {t('addFunds')}
                                            </Text>
                                        </NextLink>
                                    </Box>
                                    {/* To do: make boxes below depend on available payment tokens */}
                                    <Box
                                        display='flex'
                                        width='full'
                                        alignItems='center'
                                        borderWidth='1'
                                        borderColor='box'
                                        borderStyle='solid'
                                        borderRadius='10'
                                        paddingY='20'
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
                                                    <Text
                                                        fontSize='15'
                                                        fontWeight='600'
                                                    >
                                                        ETH
                                                    </Text>
                                                    <Text
                                                        fontSize='15'
                                                    >
                                                        Ethereum
                                                    </Text>
                                                </Box>
                                            </Box>
                                            <Box
                                                display='flex'
                                                flexDirection='column'
                                            >
                                                <Text
                                                    fontSize='15'
                                                    fontWeight='600'
                                                    textAlign='right'
                                                >
                                                    {mounted ? ETHbalance.data ? ETHbalance.data.formatted.toString() : '?' : '?'}
                                                </Text>
                                                <Text
                                                    fontSize='15'
                                                    textAlign='right'
                                                >
                                                    {mounted ? ETHbalance.data ? '€0,00 EUR' : '' : ''}
                                                </Text>
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
                                                    <Text
                                                        fontSize='15'
                                                        fontWeight='600'
                                                    >
                                                        WETH
                                                    </Text>
                                                    <Text
                                                        fontSize='15'
                                                    >
                                                        Ethereum
                                                    </Text>
                                                </Box>
                                            </Box>
                                            <Box
                                                display='flex'
                                                flexDirection='column'
                                            >
                                                <Text
                                                    fontSize='15'
                                                    fontWeight='600'
                                                    textAlign='right'
                                                >
                                                    {mounted ? WETHbalance.data ? WETHbalance.data.formatted.toString() : '?' : '?'}
                                                </Text>
                                                <Text
                                                    fontSize='15'
                                                    textAlign='right'
                                                >
                                                    {mounted ? WETHbalance.data ? '€0,00 EUR' : '' : ''}
                                                </Text>
                                            </Box>
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    :
                        <ConnectWalletScreen />
                    }
                </Box>
            </Box>
        </Dialog.Content>
    )
}