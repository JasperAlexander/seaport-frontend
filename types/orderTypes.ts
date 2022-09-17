import { SWRInfiniteResponse } from "swr/infinite"

export enum ItemType {
    NATIVE = 0,
    ERC20 = 1,
    ERC721 = 2,
    ERC1155 = 3,
    ERC721_WITH_CRITERIA = 4,
    ERC1155_WITH_CRITERIA = 5,
}

export enum OrderTypes {
    FULL_OPEN = 0, // No partial fills, anyone can execute
    PARTIAL_OPEN = 1, // Partial fills supported, anyone can execute
    FULL_RESTRICTED = 2, // No partial fills, only offerer or zone can execute
    PARTIAL_RESTRICTED = 3, // Partial fills supported, only offerer or zone can execute
}

export interface OrderOfferType {
    itemType: ItemType
    token: string
    identifierOrCriteria: string
    startAmount: string
    endAmount: string
}
  
export interface OrderConsiderationType {
    itemType: ItemType
    token: string
    identifierOrCriteria: string
    startAmount: string
    endAmount: string
    recipient: string
}

export interface OrderParametersType {
    offerer: string
    zone: string
    zoneHash: string
    startTime: string
    endTime: string
    orderType: number
    offer: OrderOfferType[]
    consideration: OrderConsiderationType[]
    totalOriginalConsiderationItems: number
    salt: string
    conduitKey: string
    counter: number
}

export interface OrderType {
    id?: number
    listing_time: string
    expiration_time: string
    cancelled: boolean
    finalized: boolean
    parameters: OrderParametersType
    signature: string
}

export interface OrdersType {
    next: string | null
    previous: string | null
    orders: OrderType[]
}

export interface OrdersQueryType {
    sortBy?: string
    parameters__offer__token?: string
    parameters__offer__identifierOrCriteria?: string
}

export interface OrdersStateType {
    orders: SWRInfiniteResponse<OrdersType, any>
    ref: (node?: Element | null | undefined) => void
}