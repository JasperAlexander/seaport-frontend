// To do: make use of redirect in getStaticProps

import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, Fragment } from 'react'
import { useAccount } from 'wagmi'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import { UsersType } from '../types/userTypes'
import setParams from '../utils/params'
import fetcher from '../utils/fetcher'
import useMounted from '../hooks/useMounted'

const ProfilePage: NextPage = () => {
    const router = useRouter()
    const { address } = useAccount()
    const { mounted } = useMounted()
    
    const user = useSWR<UsersType>(
        mounted && address ? setParams('http://localhost:8000/api/v1/users/', { address: address }) : null, 
        fetcher
    )

    useEffect(() => {
        let timer: string | number | NodeJS.Timeout | undefined = undefined
        if(!user.isValidating && user.data?.users[0]) {
            // router.push(`/${user.data.users[0].username !== '' ? user.data.users[0].username : user.data.users[0].address}`)
            timer = setTimeout(() => {
                router.push(`/${user.data?.users[0].username !== '' ? user.data?.users[0].username : user.data.users[0].address}`)
            }, 1500)
        }
        if (typeof timer !== 'undefined') return () => clearTimeout(timer)
    }, [user])

    if (user.data?.users[0]) {
        return (
            <Fragment>
                <Head>
                    <title>Redirecting | OpenFish</title>
                    <meta name="description" content="An example of how to implement the Seaport marketplace protocol." />
                    <link rel="icon" href="/favicon.ico" />
                </Head>

                <main>
                    <p>Redirecting...</p>
                </main>
            </Fragment>
        )
    } else {
        return (
            <Fragment>
                <Head>
                    <title>Login | OpenFish</title>
                    <meta name="description" content="An example of how to implement the Seaport marketplace protocol." />
                    <link rel="icon" href="/favicon.ico" />
                </Head>

                <main>
                    <p>Connect first to view your profile</p>
                </main>
            </Fragment>
        )
    }
}

export default ProfilePage
