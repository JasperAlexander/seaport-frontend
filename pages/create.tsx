// To do: add option to save files to other storage solutions

import type { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next'
import { Fragment } from 'react'
import { Box } from '../components/Box/Box'
import { CollectionsType } from '../types/collectionTypes'
import setParams from '../utils/params'
import useCollections from '../hooks/useCollections'
import { useRouter } from 'next/router'
import { CreateAssetForm } from '../components/Forms/CreateAssetForm'
import { TitleAndMetaTags } from '../components/TitleAndMetaTags/TitleAndMetaTags'
// import { useIpfs } from '../hooks/useIPFS'
// import { create } from 'ipfs-http-client'

const API_BASE = process.env.NEXT_PUBLIC_API_BASE

type Props = InferGetStaticPropsType<typeof getStaticProps>

const CreateAssetPage: NextPage<Props> = ({
    fallbackCollections
}) => {
    const router = useRouter()
    const collections = useCollections(router, fallbackCollections)
    // const { client } = useIpfs()
    // const client = create({ host: '127.0.0.1', port: 5001, protocol: 'http' })
    
    return (
        <Fragment>
            <TitleAndMetaTags 
                title={'Create Asset | OpenFish'}
            />

            <Box 
                as='main' 
                display='flex' 
                alignItems='center' 
                flexDirection='column'
            >
                <CreateAssetForm 
                    collections={collections} 
                />
            </Box>
        </Fragment>
    )
}

export default CreateAssetPage

export const getStaticProps: GetStaticProps<{
    fallbackCollections: CollectionsType
}> = async () => {
    try {
        const collectionsOptions: RequestInit | undefined = {}

        // Todo: add filter to only show collections of user
        const collectionsUrl = new URL(`/api/v1/collections/`, API_BASE)

        const collectionsQuery = {}
    
        const collectionsHref = setParams(collectionsUrl, collectionsQuery)
    
        const collectionsRes = await fetch(collectionsHref, collectionsOptions)
    
        const fallbackCollections = (await collectionsRes.json()) as CollectionsType
    
        return {
            props: { 
                fallbackCollections
            }
        }
    } catch {
        return {
            notFound: true
        }
    }
}