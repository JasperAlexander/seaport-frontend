import fetcher from '../utils/fetcher'
import setParams from '../utils/params'
import { NextRouter } from 'next/router'
import { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import useSWRInfinite, { SWRInfiniteKeyLoader } from 'swr/infinite'
import { AssetsType, AssetsQueryType } from '../types/assetTypes'

export default function useAssets(
    router: NextRouter,
    fallback?: AssetsType,
    username?: string
    // filters?: AssetsQueryType
) {
    const { ref, inView } = useInView()

    const pathname = `http://localhost:8000/api/v1/assets/`

    const query: AssetsQueryType = {
        ...(username && { owner__username: username }),
        ...(router.query['sort'] && { sortBy: router.query['sort']?.toString()}),
        ...(router.query['contract'] && { asset_contract__address: router.query['contract']?.toString()}),
    }

    const assets = useSWRInfinite<AssetsType>(
        (index, previousPageData) => getKey(pathname, query, index, previousPageData),
        fetcher,
        {
            revalidateFirstPage: false,
            fallback
        }
    )

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