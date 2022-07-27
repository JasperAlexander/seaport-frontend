import type { NextPage } from 'next'
import Head from 'next/head'
import { useMemo, useEffect, useState, Fragment } from 'react'
import { useAccount, useEnsAvatar, useEnsName } from 'wagmi'
import { emojiAvatarForAddress } from '../utils/emojiAvatar'
import { AssetsLayout } from '../components/Layouts/AssetsLayout'
import { Box } from '../components/Box/Box'
import { Text } from '../components/Text/Text'
import { Button } from '../components/Buttons/Button'
import { sprinkles } from '../styles/sprinkles.css'

enum Tabs {
    Created,
    Collected
}

const Profile: NextPage = () => {
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

    const [currentTab, setCurrentTab] = useState<Tabs>(Tabs.Created)

    const [isLoadingDOM, setIsLoadingDOM] = useState(true)
    useEffect(() => {
        setIsLoadingDOM(false)
    }, [])
    
    return (
        <Fragment>
        <Head>
            <title>Profile | Seaport implementation</title>
            <meta name="description" content="An example of how to implement the Seaport marketplace protocol." />
            <link rel="icon" href="/favicon.ico" />
        </Head>

        <main>
            <Box display='flex' flexDirection='column' gap='12'>
                <Box 
                    height='180' 
                    background='lightgray400' 
                    style={{position: 'initial'}}
                    className={sprinkles({ 
                        background: {
                            hover: 'alpha600'
                        } 
                    })}
                />
                {isLoadingDOM
                    ? ''
                    : 
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
                            {EnsAvatar ? EnsAvatar : emoji}
                        </Box>
                }
                <Box paddingX='32' display='flex' flexDirection='column' gap='44' marginTop='-60'>
                    <Box display='flex' flexDirection='column'>
                        <Box display='flex' justifyContent='space-between' alignItems='center' gap='8'>
                            <Text as='h2' size='24' weight='bold' overflow='hidden'>{isLoadingDOM ? '' : EnsName ? EnsName : address}</Text>
                            <Button>Follow</Button>
                        </Box>
                        <Text as='span'>Biography</Text>
                    </Box>

                    <Box display='flex' flexDirection='column'>
                        {/* <Text as='h2' size='24' weight='bold'>My NFTs</Text> */}
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
                                fontWeight='semibold'
                                onClick={() => setCurrentTab(Tabs.Created)}
                                color={currentTab === Tabs.Created ? 'defaultTextHover' : 'boxText'}
                                style={{borderBottom: currentTab === Tabs.Created ? '2px solid rgb(4, 17, 29)' : '2px solid transparent'}}
                            >
                                <Box>
                                    Created
                                </Box>
                                <Box
                                    as='span'
                                    fontWeight='regular'
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
                                fontWeight='semibold'
                                onClick={() => setCurrentTab(Tabs.Collected)}
                                color={currentTab === Tabs.Collected ? 'defaultTextHover' : 'boxText'}
                                style={{borderBottom: currentTab === Tabs.Collected ? '2px solid rgb(4, 17, 29)' : '2px solid transparent'}}
                            >
                                <Box>
                                    Collected
                                </Box>
                                <Box
                                    as='span'
                                    fontWeight='regular'
                                    marginLeft='8'
                                >
                                    5
                                </Box>
                            </Box>
                        </Box>
                        {isLoadingDOM
                        ? ''
                        : address
                            ? <AssetsLayout />
                            : <Text as='span'>Not connected</Text>
                        }
                    </Box>
                </Box>
            </Box>
        </main>
        </Fragment>
    )
}

export default Profile
