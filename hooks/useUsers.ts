import fetcher from '../utils/fetcher'
import setParams from '../utils/params'
import { NextRouter } from 'next/router'
import { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import useSWRInfinite, { SWRInfiniteKeyLoader } from 'swr/infinite'
import { UsersType, UsersQueryType } from '../types/userTypes'

const API_BASE = process.env.NEXT_PUBLIC_API_BASE

export default function useUsers(
    router: NextRouter,
    address?: string,
    fallback?: UsersType
) {
    const { ref, inView } = useInView()

    const pathname = `${API_BASE}/api/v1/users/`
    
    const query: UsersQueryType = {
        ...(address && { address: address }),
        ...(router.query['sort'] && { sortBy: router.query['sort']?.toString()})
    }

    const users = useSWRInfinite(
        (index, previousPageData) => getKey(pathname, query, index, previousPageData),
        fetcher,
        {
            revalidateFirstPage: false,
            fallbackData: [
                {
                    users: fallback?.users,
                }
            ]
        }
    )

  // Fetch more data when component is visible
    useEffect(() => {
        if (inView) {
            users.setSize(users.size + 1)
        }
    }, [inView])

  return { users, ref }
}

const getKey: (
    pathname: string,
    query: UsersQueryType,
    ...base: Parameters<SWRInfiniteKeyLoader>
) => ReturnType<SWRInfiniteKeyLoader> = (
    pathname: string,
    query: UsersQueryType,
    index: number,
    previousPageData: UsersType
) => {
    // End
    if (previousPageData && !previousPageData.next) return null

    // if (sortBy === '30DayVolume' || sortBy === '7DayVolume') query.sortBy = sortBy

    // Start
    if(index === 0) return setParams(pathname, query)

    // Middle
    if(previousPageData.next) return setParams(previousPageData.next, query)
}