import type { NextPage } from 'next'
import Head from 'next/head'
import React from 'react'
import { useAccount, useEnsAvatar, useEnsName } from 'wagmi'
import { emojiAvatarForAddress } from '../utils/emojiAvatar'
import { Orders } from '../components/Orders/Orders'
import { Box } from '../components/Box/Box'
import { Text } from '../components/Text/Text'
import { Button } from '../components/Buttons/Button'
import { touchableStyles } from '../styles/touchableStyles'

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
    const { color: backgroundColor, emoji } = React.useMemo(
        () => emojiAvatarForAddress(address),
        [address]
    )

    const [isLoadingDOM, setIsLoadingDOM] = React.useState(true)

    React.useEffect(() => {
        setIsLoadingDOM(false)
    }, [])
    
    return (
        <React.Fragment>
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
                    className={touchableStyles({ 
                        hoverBackground: 'alpha600', 
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
                            boxShadow='defaultSmall'
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

                    <Box display='flex' flexDirection='column' gap='20'>
                        <Text as='h2' size='24' weight='bold'>My NFTs</Text>
                        {isLoadingDOM
                        ? ''
                        : address
                            ? <Orders filter={order => order.meta.NFTcreator === address} />
                            : <Text as='span'>Not connected</Text>
                        }
                    </Box>
                </Box>
            </Box>
        </main>
        </React.Fragment>
    )
}

export default Profile
