import { getCsrfToken, signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { FC } from 'react'
import { SiweMessage } from 'siwe'
import { useAccount, useConnect, useNetwork, useSignMessage, useSwitchNetwork } from 'wagmi'
import { Box } from '../Box/Box'
import { MetaMaskIcon } from '../Icons/MetaMaskIcon'
import { NextLink } from '../NextLink/NextLink'
import { Text } from '../Text/Text'

interface Props {

}

export const ConnectWalletScreen: FC<Props> = ({
    
}) => {
    const router = useRouter()
    const { referrer } = router.query
    const { status } = useSession()
    const { isConnected, connector: activeConnector, address } = useAccount()
    const { chain: activeChain } = useNetwork()
    const { signMessageAsync } = useSignMessage()
    const { connect, connectors } = useConnect()
    const { switchNetwork } = useSwitchNetwork()

    const handleLogin = async () => {
        try {
            const chainId = activeChain?.id
            if (!address || !chainId) return
            
            const callbackUrl = '/protected'
            const message = new SiweMessage({
                domain: window.location.host,
                address,
                statement: `Welcome to OpenFish! Click to sign in and accept the OpenFish Terms of Service: ${process.env.NEXTAUTH_URL}/tos. This request will not trigger a blockchain transaction or cost any gas fees. Your authentication status will reset after 24 hours.`,
                uri: window.location.origin,
                version: '1',
                chainId,
                nonce: await getCsrfToken()
            })

            const signature = await signMessageAsync({
                message: message.prepareMessage()
            })

            await signIn('credentials', { message: JSON.stringify(message), redirect: false, signature, callbackUrl });
        } catch {
            return
        }
    }
    
    return (
        <Box 
            marginX='auto'
            padding='20'
        >
            <Box
                marginY='16'
            >
                <Text
                    as='h1'
                    fontWeight='600'
                    fontSize='24'
                    
                >
                    Connect your wallet.
                </Text>
            </Box>
            <Box>
                <Box>
                    <Text
                        as='p'
                    >
                        If you don't have a 
                        <NextLink
                            href='/supportedwallets'
                            target='_blank'
                            rel='nofollow noopener'
                        >
                            <Text 
                                as='span'
                                color='accentColor'
                                display="inline-flex"
                                fontWeight='600'
                            >
                                {"\u00a0"}wallet{"\u00a0"}
                            </Text>
                        </NextLink>
                        yet, you can select a provider and create one now.
                    </Text>
                </Box>
                <Box 
                    marginBottom='72'
                    marginTop='24'
                >
                    <Box
                        as='ul'
                        borderTopLeftRadius='10'
                        borderTopRightRadius='10' 
                        borderTopWidth='1'
                        borderLeftWidth='1'
                        borderRightWidth='1'
                        borderStyle='solid'
                        borderColor='box'
                    >
                        <Box
                            as='li' 
                            borderTopWidth={{
                                notfirstchild: '1'  
                            }}
                            borderColor='box'
                            borderStyle='solid'
                            borderTopLeftRadius={{
                                firstchild: '10'
                            }}
                            borderTopRightRadius={{
                                firstchild: '10'
                            }}
                            width='full'
                        >
                            <Box 
                                as='button'
                                type="button"
                                onClick={async() => {
                                    try {
                                        if (!isConnected) await connect({connector: connectors[0]})
                                        if (activeChain?.id !== 1337) await switchNetwork?.(1337)
                                        if (isConnected && activeChain?.id == 1337) await handleLogin()
                                        if (referrer) router.push(referrer.toString())
                                    } catch {
                                        console.log('Test')
                                    }
                                }}
                                disabled={status === 'loading'}
                                borderTopLeftRadius={{
                                    firstchild: '10'
                                }}
                                borderTopRightRadius={{
                                    firstchild: '10'
                                }}
                                width='full'
                                overflow='hidden'
                                textAlign='left'
                                display='inline-flex'
                                alignItems='center'
                                padding='16'
                                boxShadow={{
                                    hover: 'header',
                                    active: 'header'
                                }}
                                transition={{
                                    hover: 'hover',
                                    active: 'hover'
                                }}
                                background={{
                                    hover: 'accordionBackground',
                                    active: 'accordionBackground'
                                }}
                            >
                                <Box
                                    marginRight='16'
                                    overflow='hidden'
                                    alignItems='center'
                                    display='flex'
                                    justifyContent='center'
                                >
                                    <MetaMaskIcon />
                                </Box>
                                <Box 
                                    alignSelf='stretch'
                                    flexGrow='1'
                                    flexShrink='1'
                                    flexBasis='auto'
                                    display='flex'
                                    flexDirection='column'
                                    flexWrap='nowrap'
                                    justifyContent='center'
                                    overflow='hidden'
                                    alignItems='flex-start'
                                    marginRight='16'
                                >
                                    <Text 
                                        fontWeight="700" 
                                        fontSize='14'
                                        textAlign='left'
                                    >
                                        MetaMask
                                    </Text>
                                </Box>
                                <Box 
                                    display='flex'
                                    alignSelf='stretch'
                                    flexGrow='0'
                                    flexShrink='0'
                                    flexBasis='auto'
                                    flexDirection='column'
                                    justifyContent='center'
                                    flexWrap='nowrap'
                                    style={{maxWidth: '40%'}}
                                >
                                    <Box 
                                        background='accentColor'
                                        borderRadius='10'
                                        paddingY='4'
                                        paddingX='8'
                                        textAlign='right'
                                    >
                                        <Text
                                            as='span'
                                            fontSize='14'
                                            color='accentColorText'
                                        >
                                            Popular
                                        </Text>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                    <Box 
                        as='button'
                        type="button"
                        width='full'
                        borderBottomLeftRadius='10'
                        borderBottomRightRadius='10'
                        display='flex'
                        alignItems='center'
                        justifyContent='center'
                        padding='16'
                        borderWidth='1'
                        borderStyle='solid'
                        borderColor='box'
                        boxShadow={{
                            hover: 'header',
                            active: 'header'
                        }}
                        transition={{
                            hover: 'hover',
                            active: 'hover'
                        }}
                        background={{
                            hover: 'accordionBackground',
                            active: 'accordionBackground'
                        }}
                    >
                        <Text
                            fontWeight='600'
                        >
                            Show more options
                        </Text>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}