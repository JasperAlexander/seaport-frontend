import { ReactNode } from 'react'
import { chain, Chain, configureChains, createClient, WagmiConfig } from 'wagmi'
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc'
import { InjectedConnector } from 'wagmi/connectors/injected'

// const SUPPORTED_CHAIN_IDS = process.env.NEXT_PUBLIC_SUPPORTED_CHAIN_IDS
// const { SUPPORTED_CHAIN_IDS } = process.env

// const hardhatChain: Chain = {
//     id: 1337,
//     name: 'Localhost 8545',
//     network: 'hardhat',
//     nativeCurrency: {
//         decimals: 18,
//         name: 'Ethereum',
//         symbol: 'ETH'
//     },
//     rpcUrls: {
//         default: 'http://localhost:8545'
//     },
//     testnet: true
// }

const { chains, provider } = configureChains(
    [
        // All of Wagmi default chains
        chain.arbitrum,
        chain.arbitrumGoerli,
        chain.arbitrumRinkeby,
        chain.foundry,
        chain.goerli,
        chain.hardhat,
        chain.kovan,
        chain.sepolia,
        chain.localhost,
        chain.mainnet,
        chain.optimism,
        chain.optimismKovan,
        chain.optimismGoerli,
        chain.polygon,
        chain.polygonMumbai,
        chain.rinkeby,
        chain.ropsten,
    ],
    [
        jsonRpcProvider({
            rpc: (chain) => {
                return { http: chain.rpcUrls.default }
                // http: 'http://localhost:8545'
            }
        })
    ]
)

const connectors = [
    new InjectedConnector({ 
        chains
    })
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
        <WagmiConfig 
            client={wagmiClient}
        >
            {children}
        </WagmiConfig>
    )
}

export default Web3Provider