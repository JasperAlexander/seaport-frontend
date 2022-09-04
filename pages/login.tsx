import type { NextPage } from 'next'
import { Fragment } from 'react'
import { Box } from '../components/Box/Box'
import { TitleAndMetaTags } from '../components/TitleAndMetaTags/TitleAndMetaTags'
import { MainButton } from '../components/Buttons/MainButton'
import { useRouter } from 'next/router'
import { useSession, signIn, getCsrfToken } from 'next-auth/react'
import { SiweMessage } from 'siwe'
import { useAccount, useNetwork, useSignMessage } from 'wagmi'

const LoginPage: NextPage = () => {
    const router = useRouter()
    const { data: session, status } = useSession()
    const { referrer } = router.query
    const { address } = useAccount()
    const { chain: activeChain } = useNetwork()
    const { signMessageAsync } = useSignMessage()

    const handleLogin = async () => {
        const chainId = activeChain?.id
        if (!address || !chainId) return
        
        const callbackUrl = '/protected'
        const message = new SiweMessage({
            domain: window.location.host,
            address,
            statement: 
                `Welcome to OpenFish!

                Click to sign in and accept the OpenFish Terms of Service: ${process.env.NEXTAUTH_URL}/tos
                
                This request will not trigger a blockchain transaction or cost any gas fees.
                
                Your authentication status will reset after 24 hours.`,
            uri: window.location.origin,
            version: '1',
            chainId,
            nonce: await getCsrfToken()
        })

        const signature = await signMessageAsync({
            message: message.prepareMessage()
        })

        await signIn('credentials', { message: JSON.stringify(message), redirect: false, signature, callbackUrl });
    }
    
    return (
        <Fragment>
            <TitleAndMetaTags 
                title='Login | OpenFish'
            />

            <Box
                as='main'
            >
                <MainButton
                    onClick={async() => {
                        await handleLogin()
                        if (referrer) router.push(referrer.toString())
                    }}
                    disabled={status === 'loading'}
                >
                    Login
                    {session && 'signed in'}
                </MainButton>
            </Box>
        </Fragment>
    )
}

export default LoginPage