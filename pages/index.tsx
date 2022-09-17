import type { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next'
import React, { Fragment } from 'react'
import { Box } from '../components/Box/Box'
import setParams from '../utils/params'
import { AssetsType } from '../types/assetTypes'
import { useRouter } from 'next/router'
import useAssets from '../hooks/useAssets'
import { MainButton } from '../components/Buttons/MainButton/MainButton'
import { Text } from '../components/Text/Text'
import { FeaturedCard } from '../components/Cards/FeaturedCard'
import { TitleAndMetaTags } from '../components/TitleAndMetaTags/TitleAndMetaTags'
import useTranslation from 'next-translate/useTranslation'

const API_BASE = process.env.NEXT_PUBLIC_API_BASE

type Props = InferGetStaticPropsType<typeof getStaticProps>

const HomePage: NextPage<Props> = ({ 
  fallbackAssets 
}) => {
  const { t } = useTranslation('common')
  const router = useRouter()
  const assets = useAssets(router, undefined, fallbackAssets)
  const mappedAssets = assets.assets.data ? assets.assets.data.map(({ assets }) => assets).flat() : []

  return (
    <Fragment>
      <TitleAndMetaTags />

      <Box
        as='main'
        display='flex'
        flexDirection='column'
        flexBasis='0'
        flexGrow='1'
        flexShrink='1'
        height='full'
      >
        <Box
          display='flex'
          style={{
            height: '586px'
          }}
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
                filter: 'blur(8px)',
                mask: 'linear-gradient(rgb(255, 255, 255), transparent)'
              }}
            />
          </Box>
          <Box
            marginX='auto'
            width='full'
            style={{
              maxWidth: 'min(1280px, 100% - 40px)'
            }}
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
                marginRight='10'
              >
                <Text
                  as='h1'
                  fontSize='45'
                  fontWeight='600'
                >
                  {t('appSubTitle')}
                </Text>
              </Box>
              <Box
                marginTop='20'
              >
                <Text
                  fontSize='24'
                >
                  {t('appDescription')}
                </Text>
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
                  {t('explore')}
                </MainButton>
                <MainButton
                  variant='secondary'
                  size='large'
                  href='/create'
                >
                  {t('create')}
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
              {mappedAssets.length > 0 &&
                <FeaturedCard 
                  asset={mappedAssets[0]}
                />
              }
            </Box>
          </Box>
        </Box>
        <Box
          marginBottom='120'
        />
      </Box>
    </Fragment>
  )
}

export default HomePage

export const getStaticProps: GetStaticProps<{
  fallbackAssets: AssetsType
}> = async () => {
  try {
    const assetsOptions: RequestInit | undefined = {}

    const assetsUrl = new URL(`/api/v1/assets/`, API_BASE)

    const assetsQuery = {}

    const assetsHref = setParams(assetsUrl, assetsQuery)

    const assetsData = await fetch(assetsHref, assetsOptions)

    const fallbackAssets = (await assetsData.json()) as AssetsType

    if (!fallbackAssets) {
      return {
        notFound: true
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