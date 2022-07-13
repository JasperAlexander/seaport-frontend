import type { NextPage } from 'next'
import Head from 'next/head'
import React from 'react'
import { useStore } from '../hooks/useStore'
import { Order } from '../components/Order'
import { Orders } from '../components/Orders'
import { useAccount } from 'wagmi'

const Home: NextPage = () => {
  const { orders } = useStore()
  const { address } = useAccount()

  return (
    <React.Fragment>
      <Head>
        <title>Seaport implementation</title>
        <meta name="description" content="An example of how to implement the Seaport marketplace protocol." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Explore</h1>
        <Orders filter={order => order.meta.NFTcreator !== address} />
      </main>
    </React.Fragment>
  )
}

export default Home
