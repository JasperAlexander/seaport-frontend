import type { NextPage } from 'next'
import Head from 'next/head'
import React from 'react'
import { useStore } from '../hooks/useStore'
import { Order } from '../components/Order'
import { ethers } from 'ethers'

const Home: NextPage = () => {
  const { orders } = useStore()
  const [signerAddress, setSignerAddress] = React.useState<string | undefined>(undefined)
  
  if(typeof window !== 'undefined') {
    (window as any).ethereum.request({ method: 'eth_requestAccounts' });
    const web3provider = new ethers.providers.Web3Provider((window as any).ethereum);
    const signer = web3provider.getSigner()
    signer.getAddress().then((a) => setSignerAddress(a))
  }

  return (
    <React.Fragment>
      <Head>
        <title>Seaport implementation</title>
        <meta name="description" content="An example of how to implement the Seaport marketplace protocol." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>All NFTs</h1>
        <div className='orders'>
          {orders.length > 0
          ? typeof signerAddress !== 'undefined'
            ?
              orders.map((order) => (
                <Order order={order} signerAddress={signerAddress} />
              ))
            : ''
          : <span>No orders available</span>}
        </div>
      </main>
    </React.Fragment>
  )
}

export default Home
