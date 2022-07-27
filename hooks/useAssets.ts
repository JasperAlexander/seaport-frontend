import { BigNumber } from 'ethers'
import create from 'zustand'
import { AssetType, AssetContractType } from '../types/assetTypes'

interface AssetState {
    assets: AssetType[]
    addAsset: (
        token_id: BigNumber, 
        image_url: File | undefined, 
        background_color: string, 
        name: string, 
        description: string,
        external_link: string,
        asset_contract: AssetContractType,
        owner: string,
        last_sale: string
    ) => void
}

export const useAssets = create<AssetState>((set) => ({
    assets: [],
    addAsset: (
        token_id: BigNumber, 
        image_url: File | undefined, 
        background_color: string, 
        name: string, 
        description: string,
        external_link: string,
        asset_contract: AssetContractType,
        owner: string,
        last_sale: string
    ) => { 
        set((state) => ({ 
            assets: [
                ...state.assets, 
                { 
                    token_id: token_id, 
                    image_url: image_url, 
                    background_color: background_color, 
                    name: name, 
                    description: description,
                    external_link: external_link,
                    asset_contract: asset_contract,
                    owner: owner,
                    last_sale: last_sale
                },
            ] 
        }))
    },
}))