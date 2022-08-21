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

export interface EventType {
    type: EventTypes
    asset: EventAssetType
    from_account: UserType
    to_account: UserType
    start_time: string
    end_time: string
    start_amount: string
    end_amount: string
    payment_token: TokenType
    is_private: Boolean
    created_timestamp: string
}

export interface EventPostType {
    type: EventTypes
    asset: EventAssetType
    from_account?: string // Username
    to_account?: string // Username
    start_time: string
    end_time: string
    start_amount: string
    end_amount: string
    payment_token?: string // Address
    is_private: Boolean
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