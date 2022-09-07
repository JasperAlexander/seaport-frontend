import { ReactNode } from 'react'
import { Chain, configureChains, createClient, WagmiConfig } from 'wagmi'
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'

const hardhatChain: Chain = {
    id: 1337,
    name: 'Localhost 8545',
    network: 'hardhat',
    nativeCurrency: {
        decimals: 18,
        name: 'Ethereum',
        symbol: 'ETH'
    },
    rpcUrls: {
        default: 'http://localhost:8545'
    },
    testnet: true
}

const { chains, provider } = configureChains(
    [hardhatChain],
    [
        jsonRpcProvider({
            rpc: (chain) => ({
                http: 'http://localhost:8545'
            })
        })
    ]
)

const connectors = [
    new MetaMaskConnector({ chains })
]

const wagmiClient = createClient({
    autoConnect: true,
    connectors,
    provider
})

interface Props {
    children: ReactNode
}

function Web3Provider({
    children
}: Props) {
    return (
        <WagmiConfig client={wagmiClient}>
            {children}
        </WagmiConfig>
    )
}

export default Web3Provider