import type { NextPage } from 'next'
import Head from 'next/head'
import React from 'react'
import { useAccount, useEnsAvatar, useEnsName } from 'wagmi'
import { emojiAvatarForAddress } from '../utils/emojiAvatar'
import { Orders } from '../components/Orders'

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
            <div className='profile'>
                {isLoadingDOM
                    ? ''
                    : EnsAvatar
                        ? <div className='avatar'>{EnsAvatar}</div> 
                        : 
                            <div 
                                className='avatar'
                                style={{backgroundColor}}
                            >
                                {emoji}
                            </div>
                }
                <h2>{isLoadingDOM ? '' : EnsName ? EnsName : address}</h2>
                <span>Biography</span>
                <h2>My NFTs</h2>
                {isLoadingDOM
                ? ''
                : address
                    ? <Orders filter={order => order.meta.NFTcreator === address} />
                    : <span>Not connected</span>
                }
            </div>
        </main>
        </React.Fragment>
    )
}

export default Profile