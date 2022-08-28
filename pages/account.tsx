// To do: make redirect faster and more robust

import type { NextPage } from 'next'
import { useEffect, Fragment } from 'react'
import { useAccount } from 'wagmi'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import { UsersType } from '../types/userTypes'
import setParams from '../utils/params'
import fetcher from '../utils/fetcher'
import useMounted from '../hooks/useMounted'
import { TitleAndMetaTags } from '../components/TitleAndMetaTags/TitleAndMetaTags'
import { Box } from '../components/Box/Box'
import { Text } from '../components/Text/Text'

const API_BASE = process.env.NEXT_PUBLIC_API_BASE

const AccountPage: NextPage = () => {
    const router = useRouter()
    const { address } = useAccount()
    const { mounted } = useMounted()
    
    const user = useSWR<UsersType>(
        mounted && address ? setParams(`${API_BASE}/api/v1/users/`, { address: address }) : null, 
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
                <TitleAndMetaTags 
                    title={'Redirecting | OpenFish'}
                />

                <Box
                    as='main'
                >
                    <Text>
                        Redirecting...
                    </Text>
                </Box>
            </Fragment>
        )
    } else {
        return (
            <Fragment>
                <TitleAndMetaTags 
                    title={'Login | OpenFish'}
                />

                <Box
                    as='main'
                >
                    <Text>
                        Connect first to view your profile
                    </Text>
                </Box>
            </Fragment>
        )
    }
}

export default AccountPage
