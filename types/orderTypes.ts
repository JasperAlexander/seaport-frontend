import { BigNumberish } from 'ethers'

export enum ItemType {
    NATIVE = 0,
    ERC20 = 1,
    ERC721 = 2,
    ERC1155 = 3,
    ERC721_WITH_CRITERIA = 4,
    ERC1155_WITH_CRITERIA = 5,
}

export enum OrderType {
    FULL_OPEN = 0, // No partial fills, anyone can execute
    PARTIAL_OPEN = 1, // Partial fills supported, anyone can execute
    FULL_RESTRICTED = 2, // No partial fills, only offerer or zone can execute
    PARTIAL_RESTRICTED = 3, // Partial fills supported, only offerer or zone can execute
}

export type OfferItem = {
    itemType: ItemType
    token: string
    identifierOrCriteria: string
    startAmount: string
    endAmount: string
}
  
export type ConsiderationItem = {
    itemType: ItemType
    token: string
    identifierOrCriteria: string
    startAmount: string
    endAmount: string
    recipient: string
}

export type OrderParameters = {
    offerer: string
    zone: string
    orderType: OrderType
    startTime: BigNumberish
    endTime: BigNumberish
    zoneHash: string
    salt: string
    offer: OfferItem[]
    consideration: ConsiderationItem[]
    totalOriginalConsiderationItems: BigNumberish
    conduitKey: string
}

export type OrderComponents = OrderParameters & { counter: number }

export type OrderWithCounter = {
    parameters: OrderComponents
    signature: string
}
