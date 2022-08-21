import { EventPostType } from "../types/eventTypes"
import { OrderType } from "../types/orderTypes"


export default function useApi() {
    const saveEvent = async (
        event: EventPostType
    ) => {
        const href = `http://localhost:8000/api/v1/events/create/`

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
        order: OrderType
    ) => {
        const href = `http://localhost:8000/api/v1/orders/create/`

        const options = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(order)
        }

        const res = await fetch(href, options)

        return res.json()
    }

    return {
        saveEvent,
        saveOrder
    }
}