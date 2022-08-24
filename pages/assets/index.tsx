import type { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next'
import Head from 'next/head'
import React, { Fragment } from 'react'
import { AssetGrid } from '../../components/Grids/AssetGrid'
import { Box } from '../../components/Box/Box'
import setParams from '../../utils/params'
import { AssetsType } from '../../types/assetTypes'
import { useRouter } from 'next/router'
import useAssets from '../../hooks/useAssets'
import useMounted from '../../hooks/useMounted'

type Props = InferGetStaticPropsType<typeof getStaticProps>

const AssetsPage: NextPage<Props> = ({ 
  fallbackAssets 
}) => {
  const router = useRouter()
  const assets = useAssets(router, fallbackAssets)
  const { mounted } = useMounted()

  return (
    <Fragment>
      <Head>
        <title>Seaport implementation</title>
        <meta name="description" content='An example implementation of the Seaport marketplace protocol for educational purpose.' />
        <link rel="icon" href='/favicon.ico' />
      </Head>

      <Box
        as='main'
      >
        <Box 
          display='flex' 
          flexDirection='column' 
        >
          {mounted
            ?
              <AssetGrid 
                data={assets}
                displayFilters={true} 
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
}> = async () => {
  try {
    const assetsOptions: RequestInit | undefined = {}

    const assetsUrl = new URL(`/api/v1/assets/`, 'http://localhost:8000')

    const assetsQuery = {}

    const assetsHref = setParams(assetsUrl, assetsQuery)

    const assetsData = await fetch(assetsHref, assetsOptions)

    const fallbackAssets = (await assetsData.json()) as AssetsType

    if (!fallbackAssets) {
      return {
        notFound: true,
      }
    }

    return {
        props: { 
            fallbackAssets
        }
    }
  } catch {
    return {
      notFound: true
    }
  }
}