import type { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next'
import React, { Fragment } from 'react'
import { AssetGrid } from '../../components/Grids/AssetGrid'
import { Box } from '../../components/Box/Box'
import setParams from '../../utils/params'
import { AssetsType } from '../../types/assetTypes'
import { useRouter } from 'next/router'
import useAssets from '../../hooks/useAssets'
import useMounted from '../../hooks/useMounted'
import { TitleAndMetaTags } from '../../components/TitleAndMetaTags/TitleAndMetaTags'
import useTokens from '../../hooks/useTokens'
import { TokensQueryType, TokensType } from '../../types/tokenTypes'

const API_BASE = process.env.NEXT_PUBLIC_API_BASE

type Props = InferGetStaticPropsType<typeof getStaticProps>

const AssetsPage: NextPage<Props> = ({ 
  fallbackAssets,
  fallbackTokens
}) => {
  const router = useRouter()
  const assets = useAssets(router, undefined, fallbackAssets)
  const tokens = useTokens(router, fallbackTokens)
  const { mounted } = useMounted()

  return (
    <Fragment>
      <TitleAndMetaTags />

      <Box
        as='main'
        display='flex'
        flexDirection='column'
        flexGrow='1'
        flexShrink='1'
        flexBasis='0'
      >
        <Box 
          display='flex' 
          flexDirection='column' 
          width='full'
          height='full'
          flexGrow='1'
          flexShrink='1'
          flexBasis='0'
        >
          {mounted
            ?
              <AssetGrid 
                assets={assets}
                displayFilters={true} 
                tokens={tokens}
              />
            : ''
          }
        </Box>
      </Box>
    </Fragment>
  )
}

export default AssetsPage

export const getStaticProps: GetStaticProps<{
  fallbackAssets: AssetsType
  fallbackTokens: TokensType
}> = async () => {
  try {
    // ASSETS
    const assetsOptions: RequestInit | undefined = {}

    const assetsUrl = new URL(`/api/v1/assets/`, API_BASE)

    const assetsQuery = {}

    const assetsHref = setParams(assetsUrl, assetsQuery)

    const assetsData = await fetch(assetsHref, assetsOptions)

    const fallbackAssets = (await assetsData.json()) as AssetsType

    if (!fallbackAssets) {
      return {
        notFound: true,
      }
    }

    // TOKENS
    const tokensOptions: RequestInit | undefined = {}

    const tokensUrl = new URL(`/api/v1/tokens/`, API_BASE)

    const tokensQuery: TokensQueryType = {
        // ...(contract_address && { parameters__offer__token: contract_address }),
        // ...(token_id && { parameters__offer__identifierOrCriteria: token_id })
    }

    const tokensHref = setParams(tokensUrl, tokensQuery)

    const tokensRes = await fetch(tokensHref, tokensOptions)

    const fallbackTokens = (await tokensRes.json()) as TokensType

    return {
        props: { 
            fallbackAssets,
            fallbackTokens
        }
    }
  } catch {
    return {
      notFound: true
    }
  }
}