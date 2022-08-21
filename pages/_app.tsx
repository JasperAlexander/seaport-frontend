import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { BodyLayout } from '../components/Layouts/BodyLayout'
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
import { VanillaExtractProvider } from '../components/Providers/VanillaExtractProvider'
import { lightSeaportTheme } from '../styles/lightSeaportTheme'
import LoadingBar from 'react-top-loading-bar'
import { useState } from 'react'
import { Router } from 'next/router'

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
  const [progress, setProgress] = useState<number>(0)

  Router.events.on('routeChangeStart', () => setProgress(10))
  Router.events.on('routeChangeComplete', () => setProgress(100))
  Router.events.on('routeChangeError', () => setProgress(100))

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
          learnMoreUrl: 'https://github.com/JasperAlexander/seaport-frontend#readme',
        }}
      >
        <VanillaExtractProvider theme={lightSeaportTheme()}>
          <LoadingBar 
            color='#FA5B0F'
            progress={progress}
            onLoaderFinished={() => setProgress(0)}
          />
          <BodyLayout>
            <Component {...pageProps} />
          </BodyLayout>
        </VanillaExtractProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  )
}

export default MyApp
