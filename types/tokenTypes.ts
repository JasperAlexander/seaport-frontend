import { SWRInfiniteResponse } from 'swr/infinite'

export interface TokenType {
    id: number
    symbol: string,
    address: string,
    image_url: string,
    name: string,
    decimals: number,
    eth_price: number,
    usd_price: number
}

export interface TokensType {
    next: string | null
    previous: string | null
    tokens: TokenType[]
}

export interface TokensQueryType {
    sortBy?: string
    address?: string
}

export interface TokensStateType {
    tokens: SWRInfiniteResponse<TokensType, any>
    ref: (node?: Element | null | undefined) => void
}