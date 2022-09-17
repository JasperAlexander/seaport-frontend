import { CollectionType } from './collectionTypes'
import { ContractType, EventContractType } from './contractTypes'
import { UserType } from './userTypes'
import { TokenType } from './tokenTypes'
import { OrderType } from './orderTypes'
import { SWRInfiniteResponse } from 'swr/infinite'

export interface AssetReadType {
    id: number
    token_id: string
    name: string
    description: string
    image_url: string
    external_link: string
    asset_contract: ContractType
    collection: CollectionType
    owner: UserType
    creator: UserType
    transfer_fee: number
    transfer_fee_payment_token: TokenType | null
    is_nsfw: boolean
}

export interface AssetWriteType {
    token_id: string
    name: string
    description: string
    image_url: string
    external_link: string
    asset_contract: string
    collection: string
    owner: string
    creator: string
    transfer_fee: string
    transfer_fee_payment_token: string
    is_nsfw: boolean
}

export interface EventAssetType {
    token_id: string
    asset_contract: EventContractType
}

export type AssetInputType = {
    name: string
    description: string
    image_url: string
    external_link: string
    asset_contract: number // ContractType
    collection: number // CollectionType
    transfer_fee: number
    transfer_fee_payment_token: number | null // TokenType | null
    is_nsfw: boolean
}

export interface AssetsQueryType {
    sortBy?: string
    asset_contract__address?: string
    owner__address?: string
}

export interface AssetsType {
    next: string | null
    previous: string | null
    assets: AssetReadType[]
}

export interface AssetsStateType {
    assets: SWRInfiniteResponse<AssetsType, any>
    ref: (node?: Element | null | undefined) => void
}

export interface AssetStateType {
    asset: SWRInfiniteResponse<AssetReadType, any>
}