import { SWRInfiniteResponse } from 'swr/infinite'
import { TokenType } from './tokenTypes'

export interface CollectionType {
    name: string
    description: string
    slug: string
    created_timestamp: string
    banner_image_url: string
    image_url: string
    external_url: string
    twitter_username: string
    instagram_username: string
    medium_username: string
    is_nsfw: boolean
    payment_tokens: TokenType[]
}

export interface CollectionInputType {
    name: string
    description: string
    slug: string
    banner_image_url: string
    image_url: string
    external_url: string
    twitter_username: string
    instagram_username: string
    medium_username: string
    is_nsfw: boolean
    payment_tokens: number | null
}

export interface CollectionsType {
    next: string | null
    previous: string | null
    collections: CollectionType[]
}

export interface CollectionsStateType {
    collections: SWRInfiniteResponse<CollectionsType, any>
    ref: (node?: Element | null | undefined) => void
}