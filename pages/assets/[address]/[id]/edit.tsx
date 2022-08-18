import type { GetStaticPaths, GetStaticProps, InferGetStaticPropsType, NextPage } from 'next'
import Head from 'next/head'
import { Fragment, useEffect, useState } from 'react'
import useAsset from '../../../../hooks/useAsset'
import useMounted from '../../../../hooks/useMounted'
import { useRouter } from 'next/router'
import { useAccount } from 'wagmi'
import { MainLayout } from '../../../../components/Layouts/MainLayout'
import { AssetType } from '../../../../types/assetTypes'
import setParams from '../../../../utils/params'
import { EditAssetForm } from '../../../../components/Forms/EditAssetForm'
import { CollectionsType } from '../../../../types/collectionTypes'
import useCollections from '../../../../hooks/useCollections'
import { Box } from '../../../../components/Box/Box'
import { MainButton } from '../../../../components/Buttons/MainButton'

type Props = InferGetStaticPropsType<typeof getStaticProps>

const EditAssetPage: NextPage<Props> = ({
    fallbackAsset,
    fallbackCollections,
    contract_address,
    token_id
}) => {
    const { mounted } = useMounted()

    const router = useRouter()
    const asset = useAsset(fallbackAsset, contract_address, token_id)
    const collections = useCollections(router, fallbackCollections)

    const { address } = useAccount()
    const [isOwner, setIsOwner] = useState<boolean>(false)
    useEffect(() => {
        if (asset?.data?.owner?.address === address)
            setIsOwner(true)
    })

    return (
        <Fragment>
            <Head>
                <title>Edit asset | Seaport implementation</title>
                <meta name="description" content="An example of how to implement the Seaport marketplace protocol." />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <MainLayout>
                {isOwner &&
                    <Fragment>
                        <Box 
                            display='flex'
                            justifyContent='flex-end'
                            alignItems='center'
                            position='sticky'
                            height='80' 
                            width='full' 
                            background='accordionBackground'
                            borderBottomWidth='1'
                            borderStyle='solid'
                            borderColor='box'
                        >
                            <Box 
                                display='flex'
                                gap='8'
                                paddingX='40' 
                                marginTop='-8'
                            >
                                <MainButton 
                                    onClick={() => router.back()}
                                    width='160'
                                >
                                    Go back
                                </MainButton>
                            </Box>
                        </Box>
                        <EditAssetForm 
                            asset={asset}
                            collections={collections}
                        />
                    </Fragment>
                }
            </MainLayout>
        </Fragment>
    )
}

export default EditAssetPage

export const getStaticPaths: GetStaticPaths = () => {
    return {
        paths: [],
        fallback: 'blocking',
    }
  }
  
export const getStaticProps: GetStaticProps<{
    fallbackAsset: AssetType
    fallbackCollections: CollectionsType
    contract_address: string
    token_id: string
}> = async ({ params }) => {
    // ASSET
    const contract_address = params?.address?.toString()
    const token_id = params?.id?.toString()
  
    if (!contract_address || !token_id) {
        return {
            notFound: true,
        }
    }
  
    const assetOptions: RequestInit | undefined = {}

    const assetUrl = new URL(`/api/v1/asset/${contract_address}/${token_id}/`, 'http://localhost:8000')

    const assetQuery = {}
  
    const assetHref = setParams(assetUrl, assetQuery)
  
    const assetRes = await fetch(assetHref, assetOptions)
  
    const fallbackAsset = (await assetRes.json()) as AssetType
  
    if (!fallbackAsset) {
      return {
        notFound: true,
      }
    }

    // COLLECTIONS
    const collectionsOptions: RequestInit | undefined = {}

    // Todo: add filter to only show collections of user
    const collectionsUrl = new URL(`/api/v1/collections/`, 'http://localhost:8000')

    const collectionsQuery = {}
  
    const collectionsHref = setParams(collectionsUrl, collectionsQuery)
  
    const collectionsRes = await fetch(collectionsHref, collectionsOptions)
  
    const fallbackCollections = (await collectionsRes.json()) as CollectionsType

    // RETURN
    return {
        props: { 
            fallbackAsset,
            fallbackCollections,
            contract_address,
            token_id
        }
    }
}