import fetcher from '../utils/fetcher'
import setParams from '../utils/params'
import { NextRouter } from 'next/router'
import { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import useSWRInfinite, { SWRInfiniteKeyLoader, SWRInfiniteResponse } from 'swr/infinite'
import { OrdersQueryType, OrdersType } from '../types/orderTypes'

const API_BASE = process.env.NEXT_PUBLIC_API_BASE

export default function useOrders(
    router: NextRouter,
    fallback?: OrdersType,
    contract_address?: string,
    token_id?: string
) {
    const { ref, inView } = useInView()

    const pathname = `${API_BASE}/api/v1/orders/`

    const query: OrdersQueryType = {
        ...(router.query['sort'] && { sortBy: router.query['sort']?.toString()}),
        ...(contract_address && { parameters__offer__token: contract_address }),
        ...(token_id && { parameters__offer__identifierOrCriteria: token_id })
    }

    let orders: SWRInfiniteResponse<OrdersType, any>
    if (fallback) {
        orders = useSWRInfinite(
            (index, previousPageData) => getKey(pathname, query, index, previousPageData),
            fetcher,
            {
                revalidateFirstPage: false,
                fallbackData: [
                    {
                        orders: fallback?.orders,
                    }
                ]
            }
        )
    } else {
        orders = useSWRInfinite(
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
            orders.setSize(orders.size + 1)
        }
    }, [inView])

  return { orders, ref }
}

const getKey: (
    pathname: string,
    query: OrdersQueryType,
    ...base: Parameters<SWRInfiniteKeyLoader>
) => ReturnType<SWRInfiniteKeyLoader> = (
    pathname: string,
    query: OrdersQueryType,
    index: number,
    previousPageData: OrdersType
) => {
    // End
    if (previousPageData && !previousPageData.next) return null

    // Start
    if(index === 0) return setParams(pathname, query)

    // Middle
    if(previousPageData.next) return setParams(previousPageData.next, query)
}