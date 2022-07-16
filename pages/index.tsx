import type { NextPage } from 'next'
import Head from 'next/head'
import React from 'react'
import { Orders } from '../components/Orders'
import { useAccount } from 'wagmi'

const Home: NextPage = () => {
  const { address } = useAccount()

  const [isLoadingDOM, setIsLoadingDOM] = React.useState(true)

  React.useEffect(() => {
      setIsLoadingDOM(false)
  }, [])

  return (
    <React.Fragment>
      <Head>
        <title>Seaport implementation</title>
        <meta name="description" content='An example implementation of the Seaport marketplace protocol for educational purpose.' />
        <link rel="icon" href='/favicon.ico' />
      </Head>

      <main>
        <h1>Explore</h1>
        {isLoadingDOM
        ? ''
        : <Orders filter={order => order.meta.NFTcreator !== address} />
        }
      </main>
    </React.Fragment>
  )
}

export default Home
