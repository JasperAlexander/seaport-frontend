import { AssetIdType } from "./assetTypes"
import { OrderWithCounter } from "./orderTypes"

export enum EventTypes {
    created,
    succesful,
    cancelled,
    bid_entered,
    bid_withdrawn,
    transfer,
    offer_entered,
    approve,
    order
}

export type EventType = {
    event_type: EventTypes,
    asset: AssetIdType,
    created_date: string,
    from_account: string,
    to_account?: string,
    is_private?: boolean,
    payment_token?: string,
    quantity?: number,
    total_price?: string,
    order?: OrderWithCounter
}