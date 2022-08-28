import fetcher from '../utils/fetcher'
import setParams from '../utils/params'
import { NextRouter } from 'next/router'
import { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import useSWRInfinite, { SWRInfiniteKeyLoader } from 'swr/infinite'
import { EventsType, EventsQueryType } from '../types/eventTypes'

const API_BASE = process.env.NEXT_PUBLIC_API_BASE

export default function useEvents(
    router: NextRouter,
    fallback?: EventsType,
    contract_address?: string,
    token_id?: string
) {
    const { ref, inView } = useInView()

    const pathname = `${API_BASE}/api/v1/events/`

    const query: EventsQueryType = {
        ...(router.query['sort'] && { sortBy: router.query['sort']?.toString()}),
        ...(contract_address && { asset_contract__address: contract_address }),
        ...(token_id && { token_id: token_id })
    }

    const events = useSWRInfinite(
        (index, previousPageData) => getKey(pathname, query, index, previousPageData),
        fetcher,
        {
            revalidateFirstPage: false,
            fallbackData: [
                {
                    events: fallback?.events,
                }
            ]
        }
    )

  // Fetch more data when component is visible
    useEffect(() => {
        if (inView) {
            events.setSize(events.size + 1)
        }
    }, [inView])

  return { events, ref }
}

const getKey: (
    pathname: string,
    query: EventsQueryType,
    ...base: Parameters<SWRInfiniteKeyLoader>
) => ReturnType<SWRInfiniteKeyLoader> = (
    pathname: string,
    query: EventsQueryType,
    index: number,
    previousPageData: EventsType
) => {
    // End
    if (previousPageData && !previousPageData.next) return null

    // Start
    if(index === 0) return setParams(pathname, query)

    // Middle
    if(previousPageData.next) return setParams(previousPageData.next, query)
}