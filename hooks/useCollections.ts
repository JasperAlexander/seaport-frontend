import create from 'zustand'
import { CollectionType } from '../types/collectionTypes'

interface CollectionState {
    collections: CollectionType[]
    addCollection: (
        name: string,
        external_link: string,
        description: string,
        slug?: string,
        image_url?: string,
        banner_image_url?: string,
        dev_seller_fee_basis_points?: string,
        safelist_request_status?: string,
        payout_address?: string,
        primary_asset_contracts?: string,
        payment_tokens?: string,
        editors?: string,
        stats?: string
    ) => void
}

export const useCollections = create<CollectionState>((set) => ({
    collections: [],
    addCollection: (
        name: string,
        external_link: string,
        description: string,
        slug?: string,
        image_url?: string,
        banner_image_url?: string,
        dev_seller_fee_basis_points?: string,
        safelist_request_status?: string,
        payout_address?: string,
        primary_asset_contracts?: string,
        payment_tokens?: string,
        editors?: string,
        stats?: string
    ) => { 
        set((state) => ({ 
            collections: [
                ...state.collections, 
                { 
                    name: name,
                    external_link: external_link,
                    description: description,
                    slug: slug,
                    image_url: image_url,
                    banner_image_url: banner_image_url,
                    dev_seller_fee_basis_points: dev_seller_fee_basis_points,
                    safelist_request_status: safelist_request_status,
                    payout_address: payout_address,
                    primary_asset_contracts: primary_asset_contracts,
                    payment_tokens: payment_tokens,
                    editors: editors,
                    stats: stats
                },
            ] 
        }))
    },
}))