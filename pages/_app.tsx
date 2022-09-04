import '../styles/globals.css'
import type { AppProps } from 'next/app'
import StyleProvider from '../components/Providers/StyleProvider'
import Web3Provider from '../components/Providers/Web3Provider'
import ErrorBoundary from '../components/ErrorBoundary/ErrorBoundary'
import { BodyLayout } from '../components/Layouts/BodyLayout'
import { SessionProvider } from 'next-auth/react'

function MyApp({ 
  Component, 
  pageProps: { session, ...pageProps }
}: AppProps) {
  return (
    <Web3Provider>
      <StyleProvider>
        <SessionProvider session={session}>
          <ErrorBoundary>
            <BodyLayout>
              <Component {...pageProps} />
            </BodyLayout>
          </ErrorBoundary>
        </SessionProvider>
      </StyleProvider>
    </Web3Provider>
  )
}

export default MyApp
