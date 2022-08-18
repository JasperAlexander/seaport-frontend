import type { IPFS } from 'ipfs-core-types'

interface HTTPClientExtraOptions {
    headers?: Record<string, string>
    searchParams?: URLSearchParams
}

interface EndpointConfig {
    host: string
    port: string
    protocol: string
    pathname: string
    'api-path': string
}

interface IPFSHTTPClient extends IPFS<HTTPClientExtraOptions> {
    getEndpointConfig: () => EndpointConfig
}

export interface IPFSstate {
    client: IPFSHTTPClient
}