import '../styles/globals.css'
import type { AppProps } from 'next/app'
import StyleProvider from '../components/Providers/StyleProvider'
import Web3Provider from '../components/Providers/Web3Provider'
import ErrorBoundary from '../components/ErrorBoundary/ErrorBoundary'
import { BodyLayout } from '../components/Layouts/BodyLayout'

function MyApp({ 
  Component, 
  pageProps 
}: AppProps) {
  return (
    <Web3Provider>
      <StyleProvider>
        <ErrorBoundary>
          <BodyLayout>
            <Component {...pageProps} />
          </BodyLayout>
        </ErrorBoundary>
      </StyleProvider>
    </Web3Provider>
  )
}

export default MyApp
