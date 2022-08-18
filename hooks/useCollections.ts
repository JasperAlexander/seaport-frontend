import fetcher from '../utils/fetcher'
import setParams from '../utils/params'
import { NextRouter } from 'next/router'
import { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import useSWRInfinite, { SWRInfiniteKeyLoader } from 'swr/infinite'
import { CollectionsType } from '../types/collectionTypes'

export default function useCollections(
    router: NextRouter,
    fallback?: CollectionsType
) {
    const { ref, inView } = useInView()

    const pathname = `http://localhost:8000/api/v1/collections/`
    const sortBy = router.query['sort']?.toString()

    const collections = useSWRInfinite(
        (index, previousPageData) => getKey(pathname, sortBy, index, previousPageData),
        fetcher,
        {
            revalidateFirstPage: false,
            fallbackData: [
                {
                    collections: fallback?.collections,
                }
            ]
        }
    )

  // Fetch more data when component is visible
    useEffect(() => {
        if (inView) {
            collections.setSize(collections.size + 1)
        }
    }, [inView])

  return { collections, ref }
}

const getKey: (
    pathname: string,
    sortBy: string | undefined,
    ...base: Parameters<SWRInfiniteKeyLoader>
) => ReturnType<SWRInfiniteKeyLoader> = (
    pathname: string,
    sortBy: string | undefined,
    index: number,
    previousPageData: CollectionsType
) => {
    // End
    if (previousPageData && !previousPageData.next) return null

    let query = {
        // limit: 20,
        // sortBy: '1DayVolume',
    }

    // if (sortBy === '30DayVolume' || sortBy === '7DayVolume') query.sortBy = sortBy

    // Start
    if(index === 0) return setParams(pathname, query)

    // Middle
    if(previousPageData.next) return setParams(previousPageData.next, query)
}