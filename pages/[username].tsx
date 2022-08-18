// To do: making it possible to pass sprinkles to icons

import type { GetStaticPaths, GetStaticProps, InferGetStaticPropsType, NextPage } from 'next'
import Head from 'next/head'
import { Fragment, useMemo, useState } from 'react'
import { UserType } from '../types/userTypes'
import setParams from '../utils/params'
import useUser from '../hooks/useUser'
import { Box } from '../components/Box/Box'
import { sprinkles } from '../styles/sprinkles.css'
import { useAccount, useEnsAvatar, useEnsName } from 'wagmi'
import { emojiAvatarForAddress } from '../utils/emojiAvatar'
import { AssetsList } from '../components/Lists/AssetsList'
import useAssets from '../hooks/useAssets'
import { useRouter } from 'next/router'
import { AssetsType } from '../types/assetTypes'
import useMounted from '../hooks/useMounted'
import { ShareIcon } from '../components/Icons/ShareIcon'
import { VerifiedIcon } from '../components/Icons/VerifiedIcon'

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
        chainId: 1337
    })
    const { data: EnsName } = useEnsName({
        address: address,
        chainId: 1337
    })
    const { color: backgroundColor, emoji } = useMemo(
        () => emojiAvatarForAddress(address),
        [address]
    )
    const user = useUser(username, fallbackUser)
    const assets = useAssets(router, fallbackAssets, username)
    const { mounted } = useMounted()

    const isOwner = address === user.data?.address

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
            <Head>
                <title>{isOwner ? 'Your' : `${username} |`} Profile | OpenFish</title>
                <meta name="description" content="An example of how to implement the Seaport marketplace protocol." />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main>
                <Box display='flex' flexDirection='column' gap='12'>
                    <Box 
                        height='180' 
                        background='profileTop' 
                        style={{position: 'initial'}}
                        className={sprinkles({ 
                            background: {
                                hover: 'profileTopHover'
                            } 
                        })}
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
                        style={{
                            backgroundColor, 
                            aspectRatio: '1 / 1', 
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
                    <Box paddingX='32' display='flex' flexDirection='column' gap='44' marginTop='-60'>
                        <Box display='flex' flexDirection='column'>
                            <Box display='flex' justifyContent='space-between' alignItems='center' gap='8'>
                                <Box
                                    display='flex'
                                    alignItems='center'
                                    gap='4'
                                >
                                    <Box as='h2' fontSize='24' fontWeight='700' overflow='hidden'>
                                        {mounted 
                                            ? username
                                                ? username
                                                : EnsName 
                                                    ? EnsName 
                                                    : address 
                                            : ''
                                        }
                                    </Box>
                                    {user.data?.config === 'verified' && <VerifiedIcon fill='accentColor' />}
                                </Box>
                                <Box
                                    as='button'
                                    padding='12'
                                    borderRadius='full'
                                    className={sprinkles({
                                        boxShadow: {
                                            hover: 'subHeader'
                                        },
                                        background: {
                                            active: 'buttonBackgroundActive'
                                        }
                                    })}
                                >
                                    <ShareIcon />
                                </Box>
                            </Box>
                            <Box as='span'>Biography</Box>
                        </Box>

                        <Box display='flex' flexDirection='column'>
                            {/* <Text as='h2' size='24' weight='700'>My NFTs</Text> */}
                            <Box
                                display='flex'
                                alignItems='center'
                                gap='48'
                                width='full'
                                marginTop='32'
                                marginBottom='24'
                            >
                                <Box
                                    as='button'
                                    display='flex'
                                    alignItems='center'
                                    paddingBottom='10'
                                    fontWeight='600'
                                    onClick={() => setCurrentTab(Tabs.Created)}
                                    color={currentTab === Tabs.Created ? 'defaultTextHover' : 'boxText'}
                                    style={{borderBottom: currentTab === Tabs.Created ? '2px solid rgb(4, 17, 29)' : '2px solid transparent'}}
                                >
                                    <Box>
                                        Created
                                    </Box>
                                    <Box
                                        as='span'
                                        fontWeight='400'
                                        marginLeft='8'
                                    >
                                        8
                                    </Box>
                                </Box>
                                <Box
                                    as='button'
                                    display='flex'
                                    alignItems='center'
                                    paddingBottom='10'
                                    fontWeight='600'
                                    onClick={() => setCurrentTab(Tabs.Collected)}
                                    color={currentTab === Tabs.Collected ? 'defaultTextHover' : 'boxText'}
                                    style={{borderBottom: currentTab === Tabs.Collected ? '2px solid rgb(4, 17, 29)' : '2px solid transparent'}}
                                >
                                    <Box>
                                        Collected
                                    </Box>
                                    <Box
                                        as='span'
                                        fontWeight='400'
                                        marginLeft='8'
                                    >
                                        5
                                    </Box>
                                </Box>
                            </Box>
                            {mounted 
                                ? assets
                                    ? 
                                        <AssetsList 
                                            data={assets}
                                            isOwner={isOwner}
                                            displayFilters={false} 
                                        />
                                    : <Box as='span'>Not connected</Box>
                                : ''
                            }
                        </Box>
                    </Box>
                </Box>
            </main>
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
    const username = params?.username?.toString()
  
    if (!username) {
        return {
            notFound: true,
        }
    }
  
    // USER
    const userOptions: RequestInit | undefined = {}

    const userUrl = new URL(`/api/v1/user/${username}/`, 'http://localhost:8000')

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

    const assetsUrl = new URL(`/api/v1/assets/`, 'http://localhost:8000')

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
}