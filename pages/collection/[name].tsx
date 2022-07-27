import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import Head from 'next/head'
import React from 'react'

const Collection: NextPage = () => {

    const router = useRouter()
    const { name } = router.query
    
    return (
        <React.Fragment>
        <Head>
            <title>Collection | Seaport implementation</title>
            <meta name="description" content="An example of how to implement the Seaport marketplace protocol." />
            <link rel="icon" href="/favicon.ico" />
        </Head>

        <main>
            <h1>Page of collection {name}</h1>
        </main>
        </React.Fragment>
    )
}

export default Collection
