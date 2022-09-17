import fetcher from '../utils/fetcher'
import setParams from '../utils/params'
import { NextRouter } from 'next/router'
import { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import useSWRInfinite, { SWRInfiniteKeyLoader } from 'swr/infinite'
import { TokensQueryType, TokensType } from '../types/tokenTypes'

const API_BASE = process.env.NEXT_PUBLIC_API_BASE

export default function useTokens(
    router: NextRouter,
    fallback?: TokensType,
    // address?: string
) {
    const { ref, inView } = useInView()

    const pathname = `${API_BASE}/api/v1/tokens/`

    const query: TokensQueryType = {
        ...(router.query['sort'] && { sortBy: router.query['sort']?.toString()}),
        // ...(address && { address: address })
    }

    const tokens = useSWRInfinite(
        (index, previousPageData) => getKey(pathname, query, index, previousPageData),
        fetcher,
        {
            revalidateFirstPage: false,
            fallbackData: [
                {
                    tokens: fallback?.tokens,
                }
            ]
        }
    )

  // Fetch more data when component is visible
    useEffect(() => {
        if (inView) {
            tokens.setSize(tokens.size + 1)
        }
    }, [inView])

  return { tokens, ref }
}

const getKey: (
    pathname: string,
    query: TokensQueryType,
    ...base: Parameters<SWRInfiniteKeyLoader>
) => ReturnType<SWRInfiniteKeyLoader> = (
    pathname: string,
    query: TokensQueryType,
    index: number,
    previousPageData: TokensType
) => {
    // End
    if (previousPageData && !previousPageData.next) return null

    // Start
    if(index === 0) return setParams(pathname, query)

    // Middle
    if(previousPageData.next) return setParams(previousPageData.next, query)
}