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

export interface OfferItem {
    itemType: ItemType
    token: string
    identifierOrCriteria: string
    startAmount: string
    endAmount: string
}
  
export interface ConsiderationItem {
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
    offer: OfferItem[]
    consideration: ConsiderationItem[]
    totalOriginalConsiderationItems: number
    salt: string
    conduitKey: string
    counter: number
}

export interface OrderType {
    parameters: OrderParametersType
    signature: string
}
