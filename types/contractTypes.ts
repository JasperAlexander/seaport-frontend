export enum ContractSchemas {
    ERC721 = 'erc721',
    ERC1155 = 'erc1155'
}

export interface ContractType {
    address: string
    name: string
    description: string
    schema_name: ContractSchemas
}

export interface EventContractType {
    address: string
}