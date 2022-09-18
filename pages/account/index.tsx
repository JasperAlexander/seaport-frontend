import type { GetServerSideProps, NextPage } from 'next'
import { Fragment, useEffect, useState } from 'react'
import useUser from '../../hooks/useUser'
import { Box } from '../../components/Box/Box'
import { useAccount } from 'wagmi'
import useAssets from '../../hooks/useAssets'
import { useRouter } from 'next/router'
import { TitleAndMetaTags } from '../../components/TitleAndMetaTags/TitleAndMetaTags'
import { ProfileImg } from '../../components/ProfileImg/ProfileImg'
import { ProfileName } from '../../components/ProfileName/ProfileName'
import { ProfileTabs } from '../../components/ProfileTabs/ProfileTabs'
import { ProfileBanner } from '../../components/ProfileBanner/ProfileBanner'
import { ProfileDescription } from '../../components/ProfileDescription/ProfileDescription'
import { unstable_getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]'
import useTokens from '../../hooks/useTokens'

const AccountPage: NextPage = () => {
    const router = useRouter()
    const { address } = useAccount()
    const user = useUser(address)
    const assets = useAssets(router, address)
    const tokens = useTokens(router)

    const [isOwner, setIsOwner] = useState<boolean>(false)
    useEffect(() => {
        if (address && user?.data?.address)
            setIsOwner(address === user?.data?.address)
    })
    
    return (
        <Fragment>
            <TitleAndMetaTags 
                title={isOwner ? 'Your Profile | OpenFish' : `${user?.data?.username ? user.data.username : 'Unnamed'} | Profile | OpenFish`}
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

export default AccountPage

export const getServerSideProps: GetServerSideProps = async (context) => {
    const session = await unstable_getServerSession(
        context.req,
        context.res,
        authOptions
    )

    if (!session) {
        return {
            redirect: {
                destination: '/login/?referrer=/account'
            },
            props: {}
        }
    } else {
        return {
            props: {}
        }
    }
}
