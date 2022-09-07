import type { GetStaticPaths, GetStaticProps, InferGetStaticPropsType, NextPage } from 'next'
import { Fragment, useMemo, useState } from 'react'
import { UserType } from '../types/userTypes'
import setParams from '../utils/params'
import useUser from '../hooks/useUser'
import { Box } from '../components/Box/Box'
import { useAccount, useEnsAvatar, useEnsName } from 'wagmi'
import { emojiAvatarForAddress } from '../utils/emojiAvatar'
import { AssetGrid } from '../components/Grids/AssetGrid'
import useAssets from '../hooks/useAssets'
import { useRouter } from 'next/router'
import { AssetsType } from '../types/assetTypes'
import useMounted from '../hooks/useMounted'
import { ShareIcon } from '../components/Icons/ShareIcon'
import { VerifiedIcon } from '../components/Icons/VerifiedIcon'
import { Text } from '../components/Text/Text'
import { RoundButton } from '../components/Buttons/RoundButton'
import { truncateAddress, truncateEns } from '../utils/truncateText'
import { TitleAndMetaTags } from '../components/TitleAndMetaTags/TitleAndMetaTags'

const API_BASE = process.env.NEXT_PUBLIC_API_BASE

enum Tabs {
    Created,
    Collected
}

type Props = InferGetStaticPropsType<typeof getStaticProps>

const UserPage: NextPage<Props> = ({
    username,
    fallbackUser,
    fallbackAssets
}) => {
    const router = useRouter()
    const { address } = useAccount()
    const { data: EnsAvatar } = useEnsAvatar({
        addressOrName: address,
        enabled: false
    })
    const { data: EnsName } = useEnsName({
        address: address,
        enabled: false
    })
    const { color: backgroundColor, emoji } = useMemo(
        () => emojiAvatarForAddress(address),
        [address]
    )
    const user = useUser(username, fallbackUser)
    const assets = useAssets(router, address, fallbackAssets)
    const { mounted } = useMounted()

    const isOwner = address === user?.data?.address

    const [currentTab, setCurrentTab] = useState<Tabs>(Tabs.Created)

    let tabs = [
        { name: 'Portfolio', id: 'portfolio' },
        // { name: 'History', id: 'history' },
    ]

    if (isOwner) {
        tabs = [
            { name: 'Tokens', id: 'portfolio' },
            { name: 'Offers', id: 'buying' },
            { name: 'Listings', id: 'selling' },
            // { name: 'History', id: 'history' },
        ]
    }
    
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
                    gap='12'
                >
                    <Box 
                        height='180' 
                        background={{
                            base: 'profileTop',
                            hover: 'profileTopHover'
                        }}
                        position='initial'
                    />
                    <Box 
                        margin='44'
                        marginTop='-120'
                        borderRadius='full'
                        borderWidth='2'
                        borderStyle='solid'
                        borderColor='white'
                        display='flex'
                        alignItems='center'
                        justifyContent='center'
                        boxShadow='box'
                        aspectRatio='square'
                        style={{
                            width: '140px',
                            fontSize: '80px',
                            userSelect: 'none',
                        }}
                    >
                        {mounted 
                            ? EnsAvatar 
                                ? EnsAvatar 
                                : emoji 
                            : ''
                        }
                    </Box>
                    <Box 
                        display='flex' 
                        flexDirection='column' 
                        gap='44' 
                        marginTop='-60'
                    >
                        <Box 
                            display='flex' 
                            flexDirection='column'
                            paddingX='32'
                        >
                            <Box 
                                display='flex' 
                                justifyContent='space-between' 
                                alignItems='center' 
                                gap='8'
                            >
                                <Box
                                    display='flex'
                                    alignItems='center'
                                    gap='4'
                                >
                                    <Text 
                                        as='h2' 
                                        fontSize='24' 
                                        fontWeight='700'
                                    >
                                        {mounted 
                                            ? username
                                                ? truncateEns(username)
                                                : EnsName 
                                                    ? truncateEns(EnsName) 
                                                    : address
                                                        ? truncateAddress(address) 
                                                        : ''
                                            : ''
                                        }
                                    </Text>
                                    {user?.data?.config === 'verified' && <VerifiedIcon fill='accentColor' />}
                                </Box>
                                <RoundButton>
                                    <ShareIcon />
                                </RoundButton>
                            </Box>
                            <Text 
                                as='span'
                            >
                                Biography
                            </Text>
                        </Box>

                        <Box 
                            display='flex' 
                            flexDirection='column'
                        >
                            {/* <Text as='h2' size='24' weight='700'>My NFTs</Text> */}
                            <Box
                                display='flex'
                                alignItems='center'
                                gap='48'
                                width='full'
                                marginTop='32'
                                marginBottom='24'
                                paddingX='32'
                            >
                                <Box
                                    as='button'
                                    display='flex'
                                    alignItems='center'
                                    paddingBottom='10'
                                    gap='8'
                                    onClick={() => setCurrentTab(Tabs.Created)}
                                    style={{
                                        borderBottom: currentTab === Tabs.Created ? '2px solid rgb(4, 17, 29)' : '2px solid transparent'
                                    }}
                                >
                                    <Text
                                        fontWeight='600'
                                        color={currentTab === Tabs.Created ? 'defaultTextHover' : 'boxText'}
                                    >
                                        Created
                                    </Text>
                                    <Text
                                        as='span'
                                        color={currentTab === Tabs.Created ? 'defaultTextHover' : 'boxText'}
                                    >
                                        8
                                    </Text>
                                </Box>
                                <Box
                                    as='button'
                                    display='flex'
                                    alignItems='center'
                                    paddingBottom='10'
                                    gap='8'
                                    onClick={() => setCurrentTab(Tabs.Collected)}
                                    style={{
                                        borderBottom: currentTab === Tabs.Collected ? '2px solid rgb(4, 17, 29)' : '2px solid transparent'
                                    }}
                                >
                                    <Text
                                        fontWeight='600'
                                        color={currentTab === Tabs.Collected ? 'defaultTextHover' : 'boxText'}
                                    >
                                        Collected
                                    </Text>
                                    <Text
                                        as='span'
                                        color={currentTab === Tabs.Collected ? 'defaultTextHover' : 'boxText'}
                                    >
                                        5
                                    </Text>
                                </Box>
                            </Box>
                            {mounted 
                                ? assets
                                    ? 
                                        <AssetGrid 
                                            data={assets}
                                            isOwner={isOwner}
                                            displayFilters={false} 
                                        />
                                    : 
                                        <Text 
                                            as='span'
                                        >
                                            Not connected
                                        </Text>
                                : ''
                            }
                        </Box>
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
    
        return {
            props: { 
                username,
                fallbackUser,
                fallbackAssets
            }
        }
    } catch {
        return {
            notFound: true
        }
    }
}