import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Layout } from '../components/Layout'
import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultWallets,
  RainbowKitProvider,
  lightTheme
} from '@rainbow-me/rainbowkit'
import {
  Chain,
  configureChains,
  createClient,
  WagmiConfig,
} from 'wagmi'
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc'

const hardhatChain: Chain = {
  id: 1337,
  name: 'Localhost 8545',
  network: 'hardhat',
  nativeCurrency: {
    decimals: 18,
    name: 'Ethereum',
    symbol: 'ETH',
  },
  rpcUrls: {
    default: 'http://localhost:8545',
  },
  testnet: true,
}

const { chains, provider } = configureChains(
  [hardhatChain],
  [
    jsonRpcProvider({
      rpc: (chain) => ({
        http: 'http://localhost:8545',
      }),
    }),
  ]
);

const { connectors } = getDefaultWallets({
  appName: 'Seaport implementation',
  chains
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider
})

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider 
        chains={chains}
        theme={lightTheme({
          accentColor: '#FFFFFF',
          accentColorForeground: '#000000',
        })}
        appInfo={{
          appName: 'Seaport implementation',
          learnMoreUrl: 'https://github.com/JasperAlexander/seaport-implementation#readme',
        }}
      >
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </RainbowKitProvider>
    </WagmiConfig>
  )
}

export default MyApp
