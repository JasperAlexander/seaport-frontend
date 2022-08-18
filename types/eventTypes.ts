import { SWRInfiniteResponse } from 'swr/infinite'
import { EventAssetType } from './assetTypes'
import { UserType } from './userTypes'
import { TokenType } from './tokenTypes'

export enum EventTypes {
    Created = 'created',
    Succesfull = 'succesfull',
    Cancelled = 'cancelled',
    BidEntered = 'bid_entered',
    BidWithdrawn = 'bid_withdrawn',
    Transfer = 'transfer',
    OfferEntered = 'offer_entered',
    Approve = 'approve'
}

export type EventType = {
    type: EventTypes
    asset: EventAssetType
    created_timestamp: string
    from_account: UserType
    to_account: UserType
    is_private: boolean
    payment_token: TokenType
    quantity: number
    total_price: number
}

export interface EventsType {
    next: string | null
    previous: string | null
    events: EventType[]
}

export interface EventsStateType {
    events: SWRInfiniteResponse<EventsType, any>
    ref: (node?: Element | null | undefined) => void
}

export interface EventsQueryType {
    sortBy?: string
    asset_contract__address?: string
    token_id?: string
}