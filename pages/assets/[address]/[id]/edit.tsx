import type { GetStaticPaths, GetStaticProps, InferGetStaticPropsType, NextPage } from 'next'
import { Fragment, useEffect, useState } from 'react'
import useAsset from '../../../../hooks/useAsset'
import { useRouter } from 'next/router'
import { useAccount } from 'wagmi'
import { MainLayout } from '../../../../components/Layouts/MainLayout'
import { AssetReadType } from '../../../../types/assetTypes'
import setParams from '../../../../utils/params'
import { EditAssetForm } from '../../../../components/Forms/EditAssetForm'
import { CollectionsType } from '../../../../types/collectionTypes'
import useCollections from '../../../../hooks/useCollections'
import { MainButton } from '../../../../components/Buttons/MainButton/MainButton'
import { AssetPageHeader } from '../../../../components/Headers/AssetPageHeader/AssetPageHeader'
import { TitleAndMetaTags } from '../../../../components/TitleAndMetaTags/TitleAndMetaTags'
import useTranslation from 'next-translate/useTranslation'

const API_BASE = process.env.NEXT_PUBLIC_API_BASE

type Props = InferGetStaticPropsType<typeof getStaticProps>

const EditAssetPage: NextPage<Props> = ({
    fallbackAsset,
    fallbackCollections,
    contract_address,
    token_id
}) => {
    const { t } = useTranslation('common')
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
            <TitleAndMetaTags 
                title='Edit Asset | OpenFish'
            />

            <MainLayout>
                {isOwner &&
                    <Fragment>
                        <AssetPageHeader>
                            <MainButton 
                                onClick={() => router.back()}
                                width='160'
                            >
                                {t('goBack')}
                            </MainButton>
                        </AssetPageHeader>
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
    fallbackAsset: AssetReadType
    fallbackCollections: CollectionsType
    contract_address: string
    token_id: string
}> = async ({ params }) => {
    try {
        // ASSET
        const contract_address = params?.address?.toString()
        const token_id = params?.id?.toString()
    
        if (!contract_address || !token_id) {
            return {
                notFound: true,
            }
        }
    
        const assetOptions: RequestInit | undefined = {}

        const assetUrl = new URL(`/api/v1/asset/${contract_address}/${token_id}/`, API_BASE)

        const assetQuery = {}
    
        const assetHref = setParams(assetUrl, assetQuery)
    
        const assetRes = await fetch(assetHref, assetOptions)
    
        const fallbackAsset = (await assetRes.json()) as AssetReadType
    
        if (!fallbackAsset) {
        return {
            notFound: true,
        }
        }

        // COLLECTIONS
        const collectionsOptions: RequestInit | undefined = {}

        // Todo: add filter to only show collections of user
        const collectionsUrl = new URL(`/api/v1/collections/`, API_BASE)

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
    } catch {
        return {
            notFound: true
        }
    }
}