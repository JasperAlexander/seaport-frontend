import { BigNumber } from 'ethers'

export type AssetIdType = {
    contract_address: string,
    token_id: BigNumber
}

export type AssetContractType = {
    address: string
    name: string
    symbol: string
    image_url: string
    description: string
    external_link: string
}

export type AssetType = {
    token_id: BigNumber, 
    image_url: File | undefined, 
    background_color: string, 
    name: string, 
    description: string,
    external_link: string,
    asset_contract: AssetContractType,
    owner: string,
    last_sale: string
}