import type { NextPage } from 'next'
import Head from 'next/head'
import { useState, Fragment } from 'react'
import { Box } from '../../components/Box/Box'
import { Input } from '../../components/Input/Input'
import { CreateCollectionButton } from '../../components/Buttons/CreateCollectionButton'
import { CollectionInputType } from '../../types/collectionTypes'
import { MainButton } from '../../components/Buttons/MainButton'
import { Text } from '../../components/Text/Text'

const CollectionsPage: NextPage = () => {
    return (
        <Fragment>
            <Head>
                <title>My Collections | Seaport implementation</title>
                <meta name="description" content="An example of how to implement the Seaport marketplace protocol." />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Box
                as='main'
                display='flex'
                flexDirection='column'
                padding='24'
                gap='16'
            >
                <Box
                    marginTop='24'
                >
                    <Text
                        as='h1'
                        fontSize='40'
                        fontWeight='600'
                    >
                        My collections
                    </Text>
                </Box>
                <Text
                    as='p'
                >
                    Create, curate, and manage collections of unique NFTs to share and sell.
                </Text>
                <Box>
                    <MainButton 
                        href='/collection/create'
                    >
                        Create a collection
                    </MainButton>
                </Box>
            </Box>
        </Fragment>
    )
}

export default CollectionsPage
