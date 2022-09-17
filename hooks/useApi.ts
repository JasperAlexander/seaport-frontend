import { AssetWriteType } from "../types/assetTypes"
import { EventPostType } from "../types/eventTypes"
import { OrderType } from "../types/orderTypes"

const API_BASE = process.env.NEXT_PUBLIC_API_BASE

export default function useApi() {
    const saveAsset = async (
        asset: AssetWriteType
    ) => {
        const href = `${API_BASE}/api/v1/assets/create/`

        const options = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(asset)
        }

        const res = await fetch(href, options)

        return res.json()
    }

    const saveEvent = async (
        event: EventPostType
    ) => {
        const href = `${API_BASE}/api/v1/events/create/`

        const options = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(event)
        }

        const res = await fetch(href, options)

        return res.json()
    }

    const saveOrder = async (
        listing_time: string,
        expiration_time: string,
        order: OrderType
    ) => {
        const combinedOrder = {
            ...order,
            listing_time,
            expiration_time
        }

        const href = `${API_BASE}/api/v1/orders/create/`

        const options = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(combinedOrder)
        }

        const res = await fetch(href, options)

        return res.json()
    }

    const updateOrder = async (
        cancelled: boolean,
        finalized: boolean,
        order: OrderType
    ) => {
        const combinedOrder = {
            ...order,
            cancelled,
            finalized
        }

        console.log('order inside updateOrder', order)

        const href = `${API_BASE}/api/v1/order/${order.id}/`

        const options = {
            method: 'PATCH',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(combinedOrder)
        }

        const res = await fetch(href, options)

        return res.json()
    }

    return {
        saveAsset,
        saveEvent,
        saveOrder,
        updateOrder
    }
}