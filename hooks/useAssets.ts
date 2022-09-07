import fetcher from '../utils/fetcher'
import setParams from '../utils/params'
import { NextRouter } from 'next/router'
import { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import useSWRInfinite, { SWRInfiniteKeyLoader, SWRInfiniteResponse } from 'swr/infinite'
import { AssetsType, AssetsQueryType } from '../types/assetTypes'

const API_BASE = process.env.NEXT_PUBLIC_API_BASE

export default function useAssets(
    router: NextRouter,
    address?: string | undefined,
    fallback?: AssetsType
    // filters?: AssetsQueryType
) {
    const { ref, inView } = useInView()

    const pathname = `${API_BASE}/api/v1/assets/`

    const query: AssetsQueryType = {
        ...(address && { owner__address: address }),
        ...(router.query['sort'] && { sortBy: router.query['sort']?.toString()}),
        ...(router.query['contract'] && { asset_contract__address: router.query['contract']?.toString()}),
    }

    let assets: SWRInfiniteResponse<AssetsType, any>
    if (fallback) {
        assets = useSWRInfinite<AssetsType>(
            (index, previousPageData) => getKey(pathname, query, index, previousPageData),
            fetcher,
            {
                revalidateFirstPage: false,
                fallback
            }
        )
    } else {
        assets = useSWRInfinite<AssetsType>(
            (index, previousPageData) => getKey(pathname, query, index, previousPageData),
            fetcher,
            {
                revalidateFirstPage: false
            }
        )
    }

  // Fetch more data when component is visible
    useEffect(() => {
        if (inView) {
            assets.setSize(assets.size + 1)
        }
    }, [inView])

    return { 
        assets, 
        ref 
    }
}

const getKey: (
    pathname: string,
    query: AssetsQueryType,
    ...base: Parameters<SWRInfiniteKeyLoader>
) => ReturnType<SWRInfiniteKeyLoader> = (
    pathname: string,
    query: AssetsQueryType,
    index: number,
    previousPageData: AssetsType
) => {
    // End
    if (previousPageData && !previousPageData.next) return null

    // Start
    if(index === 0) return setParams(pathname, query)

    // Middle
    if(previousPageData.next) return setParams(previousPageData.next, query)
}