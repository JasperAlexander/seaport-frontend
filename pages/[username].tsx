import type { GetStaticPaths, GetStaticProps, InferGetStaticPropsType, NextPage } from 'next'
import { Fragment } from 'react'
import { UserType } from '../types/userTypes'
import setParams from '../utils/params'
import useUser from '../hooks/useUser'
import { Box } from '../components/Box/Box'
import { useAccount } from 'wagmi'
import useAssets from '../hooks/useAssets'
import { useRouter } from 'next/router'
import { AssetsType } from '../types/assetTypes'
import { TitleAndMetaTags } from '../components/TitleAndMetaTags/TitleAndMetaTags'
import { ProfileTabs } from '../components/ProfileTabs/ProfileTabs'
import { ProfileDescription } from '../components/ProfileDescription/ProfileDescription'
import { ProfileName } from '../components/ProfileName/ProfileName'
import { ProfileImg } from '../components/ProfileImg/ProfileImg'
import { ProfileBanner } from '../components/ProfileBanner/ProfileBanner'
import useTokens from '../hooks/useTokens'
import { TokensType } from '../types/tokenTypes'

const API_BASE = process.env.NEXT_PUBLIC_API_BASE

enum Tabs {
    Created,
    Collected
}

type Props = InferGetStaticPropsType<typeof getStaticProps>

const UserPage: NextPage<Props> = ({
    username,
    fallbackUser,
    fallbackAssets,
    fallbackTokens
}) => {
    const router = useRouter()
    const { address } = useAccount()
    const user = useUser(username, undefined, fallbackUser)
    const assets = useAssets(router, address, fallbackAssets)
    const tokens = useTokens(router, fallbackTokens)

    const isOwner = address === user?.data?.address
    
    return (
        <Fragment>
            <TitleAndMetaTags 
                title={isOwner ? 'Your Profile | OpenFish' : `${username} | Profile | OpenFish`}
            />

            <Box
                as='main'
            >
                <Box 
                    display='flex' 
                    flexDirection='column' 
                >
                   <ProfileBanner 
                        isOwner={isOwner}
                    />
                    <ProfileImg 
                        user={user}
                        isOwner={isOwner}
                        address={address}
                    />
                    <ProfileName 
                        user={user?.data}
                    />
                    <ProfileDescription 
                        user={user?.data}
                    />
                    <Box paddingX='32'>
                        <ProfileTabs 
                            assets={assets}
                            isOwner={isOwner}
                            tokens={tokens}
                        />
                    </Box>
                </Box>
            </Box>
        </Fragment>
    )
}

export default UserPage

export const getStaticPaths: GetStaticPaths = () => {
    return {
        paths: [],
        fallback: 'blocking',
    }
  }
  
export const getStaticProps: GetStaticProps<{
    username: string
    fallbackUser: UserType
    fallbackAssets: AssetsType
    fallbackTokens: TokensType
}> = async ({ params }) => {
    try {
        const username = params?.username?.toString()
    
        if (!username) {
            return {
                notFound: true,
            }
        }
    
        // USER
        const userOptions: RequestInit | undefined = {}

        const userUrl = new URL(`/api/v1/user/${username}/`, API_BASE)

        const userQuery = {}
    
        const userHref = setParams(userUrl, userQuery)
    
        const userData = await fetch(userHref, userOptions)
    
        const fallbackUser = (await userData.json()) as UserType
    
        if (!fallbackUser) {
            return {
                notFound: true,
            }
        }

        // ASSETS
        const assetsOptions: RequestInit | undefined = {}

        const assetsUrl = new URL(`/api/v1/assets/`, API_BASE)

        const assetsQuery = {
            ...(username && { owner__username: username })
        }
    
        const assetsHref = setParams(assetsUrl, assetsQuery)
    
        const assetsData = await fetch(assetsHref, assetsOptions)
    
        const fallbackAssets = (await assetsData.json()) as AssetsType
    
        if (!fallbackAssets) {
            return {
                notFound: true,
            }
        }

        // TOKENS
        const tokensOptions: RequestInit | undefined = {}

        const tokensUrl = new URL(`/api/v1/tokens/`, API_BASE)

        const tokensQuery = { }
    
        const tokensHref = setParams(tokensUrl, tokensQuery)
    
        const tokensData = await fetch(tokensHref, tokensOptions)
    
        const fallbackTokens = (await tokensData.json()) as TokensType
    
        if (!fallbackTokens) {
            return {
                notFound: true,
            }
        }
    
        return {
            props: { 
                username,
                fallbackUser,
                fallbackAssets,
                fallbackTokens
            }
        }
    } catch {
        return {
            notFound: true
        }
    }
}