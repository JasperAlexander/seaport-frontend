import type { GetStaticPaths, GetStaticProps, InferGetStaticPropsType, NextPage } from 'next'
import { Fragment, useEffect, useState } from 'react'
import useAsset from '../../../../hooks/useAsset'
import { useRouter } from 'next/router'
import { useAccount } from 'wagmi'
import { MainLayout } from '../../../../components/Layouts/MainLayout'
import { AssetReadType } from '../../../../types/assetTypes'
import setParams from '../../../../utils/params'
import { ListAssetForm } from '../../../../components/Forms/ListAssetForm'
import { MainButton } from '../../../../components/Buttons/MainButton/MainButton'
import { TokensType } from '../../../../types/tokenTypes'
import useTokens from '../../../../hooks/useTokens'
import { AssetPageHeader } from '../../../../components/Headers/AssetPageHeader/AssetPageHeader'
import { TitleAndMetaTags } from '../../../../components/TitleAndMetaTags/TitleAndMetaTags'
import useTranslation from 'next-translate/useTranslation'

const API_BASE = process.env.NEXT_PUBLIC_API_BASE

type Props = InferGetStaticPropsType<typeof getStaticProps>

const SellAssetPage: NextPage<Props> = ({
    fallbackAsset,
    fallbackTokens,
    contract_address,
    token_id
}) => {
    const { t } = useTranslation('common')
    const router = useRouter()
    const asset = useAsset(fallbackAsset, contract_address, token_id)
    const tokens = useTokens(router, fallbackTokens)

    // const { address } = useAccount()
    // const [isOwner, setIsOwner] = useState<boolean>(false)
    // useEffect(() => {
    //     if (asset?.data?.owner?.address === address)
    //         setIsOwner(true)
    // })

    return (
        <Fragment>
            <TitleAndMetaTags 
                title={`${t('sellAsset')} | OpenFish`}
            />

            <MainLayout>
                {/* {isOwner && */}
                    <Fragment>
                        <AssetPageHeader>
                            <MainButton 
                                onClick={() => router.back()}
                                width='160'
                            >
                                {t('goBack')}
                            </MainButton>
                        </AssetPageHeader>
                        <ListAssetForm 
                            asset={asset}
                            tokens={tokens}
                        />
                    </Fragment>
                {/* } */}
            </MainLayout>
        </Fragment>
    )
}

export default SellAssetPage

export const getStaticPaths: GetStaticPaths = () => {
    return {
        paths: [],
        fallback: 'blocking',
    }
  }
  
export const getStaticProps: GetStaticProps<{
    fallbackAsset: AssetReadType
    fallbackTokens: TokensType
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

        // TOKENS
        const tokensOptions: RequestInit | undefined = {}

        // Todo: add filter to only show tokens of user
        const tokensUrl = new URL(`/api/v1/tokens/`, API_BASE)

        const tokensQuery = {}
    
        const tokensHref = setParams(tokensUrl, tokensQuery)
    
        const tokensRes = await fetch(tokensHref, tokensOptions)
    
        const fallbackTokens = (await tokensRes.json()) as TokensType
    
        return {
            props: { 
                fallbackAsset,
                fallbackTokens,
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