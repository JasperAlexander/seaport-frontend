import { AssetIdType } from "./assetTypes"
import { OrderWithCounter } from "./orderTypes"

export enum EventTypes {
    created = 'Created',
    listed = 'Listed',
    succesful = 'Sold',
    cancelled = 'Cancelled',
    bid_entered = 'Entered',
    bid_withdrawn = 'Withdrawn',
    transfer = 'Transfered',
    offer_entered = 'Entered',
    approve = 'Approved'
}

export type EventType = {
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
}