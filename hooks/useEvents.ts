import create from 'zustand'
import { EventType, EventTypes } from '../types/eventTypes'
import { AssetIdType } from '../types/assetTypes'
import { OrderWithCounter } from '../types/orderTypes'

interface EventState {
    events: EventType[]
    addEvent: (
        event_type: EventTypes,
        asset: AssetIdType,
        created_date: Date,
        from_account: string,
        to_account?: string,
        is_private?: boolean,
        payment_token?: string,
        quantity?: number,
        total_price?: string,
        order?: OrderWithCounter
    ) => void
}

export const useEvents = create<EventState>((set) => ({
    events: [],
    addEvent: (
        event_type,
        asset,
        created_date,
        from_account,
        to_account,
        is_private,
        payment_token,
        quantity,
        total_price,
        order
    ) => { 
        set((state) => ({ 
            events: [
                ...state.events, 
                { 
                    event_type: event_type,
                    asset: asset,
                    created_date: created_date,
                    from_account: from_account,
                    to_account: to_account,
                    is_private: is_private,
                    payment_token: payment_token,
                    quantity: quantity,
                    total_price: total_price,
                    order: order
                },
            ] 
        }))
    },
}))