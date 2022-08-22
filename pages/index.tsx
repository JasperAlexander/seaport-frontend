import type { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next'
import Head from 'next/head'
import React, { Fragment } from 'react'
import { AssetsList } from '../components/Lists/AssetsList'
import { Box } from '../components/Box/Box'
import setParams from '../utils/params'
import { AssetsType } from '../types/assetTypes'
import { useRouter } from 'next/router'
import useAssets from '../hooks/useAssets'
import useMounted from '../hooks/useMounted'
import { MainButton } from '../components/Buttons/MainButton'
import * as AspectRatio from '@radix-ui/react-aspect-ratio'
import Link from 'next/link'
import { FeaturedCard } from '../components/Cards/FeaturedCard'

type Props = InferGetStaticPropsType<typeof getStaticProps>

const HomePage: NextPage<Props> = ({ 
  fallbackAssets 
}) => {
  const router = useRouter()
  const assets = useAssets(router, fallbackAssets)
  const mappedAssets = assets.assets.data ? assets.assets.data.map(({ assets }) => assets).flat() : []

  return (
    <Fragment>
      <Head>
        <title>Seaport implementation</title>
        <meta name="description" content='An example implementation of the Seaport marketplace protocol for educational purpose.' />
        <link rel="icon" href='/favicon.ico' />
      </Head>

      <Box
        as='main'
        display='flex'
        flexDirection='column'
        flexBasis='0'
        flexGrow='1'
        flexShrink='1'
        style={{height: '586px'}}
      >
        <Box 
          width='full'
          position='absolute'
          overflow='hidden'
        >
          <Box 
            display='flex'
            alignItems='flex-start'
            style={{
              backgroundImage: `url(${mappedAssets?.[0]?.image_url})`,
              height: '586px',
              backgroundSize: 'cover',
              backgroundPosition: 'center center',
              opacity: '0.3',
              backgroundColor: 'white',
              filter: 'blut(8px)',
              mask: 'linear-gradient(rgb(255, 255, 255), transparent)'
            }}
          />
        </Box>
        <Box
          marginX='auto'
          width='full'
          style={{maxWidth: 'min(1280px, 100% - 40px)'}}
          display='flex'
          flexWrap='wrap'
          zIndex='100'
        >
          <Box
            display='flex'
            flexDirection='column'
            alignItems='flex-start'
            width='50p'
            color='defaultText'
            style={{padding: '110px 20px 44px 30px'}}
          >
            <Box
              as='h1'
              style={{fontSize: '45px'}}
              marginRight='10'
              fontWeight='600'
            >
              Discover, collect, and sell extraordinary NFTs
            </Box>
            <Box
              fontSize='24'
              marginTop='20'
              color='defaultText'
              fontWeight='400'
            >
              OpenFish is an example implementation of the Seaport marketplace protocol for educational purpose
            </Box>
            <Box
              marginTop='40'
              display='flex'
              gap='20'
            >
              <MainButton
                size='large'
                href='/assets'
              >
                Explore
              </MainButton>
              <MainButton
                variant='secondary'
                size='large'
                href='/create'
              >
                Create
              </MainButton>
            </Box>
          </Box>
          <Box
            width='50p'
            paddingY='80'
            display='flex'
            flexDirection='column'
            alignItems='flex-end'
          >
            <FeaturedCard 
              asset={mappedAssets[0]}
            />
          </Box>
        </Box>
      </Box>
    </Fragment>
  )
}

export default HomePage

export const getStaticProps: GetStaticProps<{
  fallbackAssets: AssetsType
}> = async ({ params }) => {
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
}