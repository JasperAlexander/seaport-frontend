import { OrderType } from "../types/orderTypes"


export default function useApi() {
    const saveEvent = async () => {
        const href = `http://localhost:8000/api/v1/events/create/`

        const options = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                
            })
        }

        const res = await fetch(href, options)

        return res.json()
    }

    const saveOrder = async ({
        parameters,
        signature
    }: OrderType) => {
        console.log('Inside saveOrder with parameters: ', parameters)
        const href = `http://localhost:8000/api/v1/orders/create/`

        const options = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                parameters,
                signature
            })
        }

        const res = await fetch(href, options)
        console.log('Order saved in backend with result: ', res)

        return res.json()
    }


    return {
        saveEvent,
        saveOrder
    }
}