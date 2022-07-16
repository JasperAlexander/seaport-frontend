import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import Head from 'next/head'
import React from 'react'

const Asset: NextPage = () => {

    const router = useRouter()
    const { address, id } = router.query
    
    return (
        <React.Fragment>
        <Head>
            <title>List NFT | Seaport implementation</title>
            <meta name="description" content="An example of how to implement the Seaport marketplace protocol." />
            <link rel="icon" href="/favicon.ico" />
        </Head>

        <main>
            <h1>Page of token {address} with id {id}</h1>
        </main>
        </React.Fragment>
    )
}

export default Asset
