import { useState } from 'react'
import { Box } from '../Box/Box'
import { AssetGridHeader } from '../Headers/AssetGridHeader/AssetGridHeader'
import { FilterAccordion } from '../Accordions/FilterAccordion/FilterAccordion'
import { RefreshIcon } from '../Icons/RefreshIcon'
import { AssetsStateType, AssetReadType } from '../../types/assetTypes'
import { AssetGridCard } from '../Cards/AssetGridCard'
import { AssetGridLoadingCard } from '../LoadingCards/AssetGridLoadingCard'
import TimeAgo from 'react-timeago'
import { RoundButton } from '../Buttons/RoundButton/RoundButton'
import { Text } from '../Text/Text'
import { TokensStateType } from '../../types/tokenTypes'
import useTranslation from 'next-translate/useTranslation'

interface Props {
  assets: AssetsStateType
  isOwner?: boolean
  displayFilters: boolean
  tokens: TokensStateType
}

export const AssetGrid: React.FC<Props> = ({ 
  assets: { assets, ref },
  isOwner,
  displayFilters,
  tokens
}) => {
  const { t } = useTranslation('common')

  const [refreshTime, setRefreshTime] = useState<number>(Date.now())
  const { data, isValidating, size } = assets

  const mappedAssets = data ? data.map(({ assets }) => assets).flat() : []
  const isEmpty = mappedAssets.length === 0
  const didReachEnd = isEmpty 
    || (data?.[data.length - 1]?.assets?.length && data?.[data.length - 1]?.assets?.length < 6)

  const [showFilters, setShowFilters] = useState<boolean>(displayFilters)
  const toggleShowFilters = () => {
    setShowFilters(!showFilters)
  }

  return (
    <Box
      paddingX='32'
      marginX='auto'
      width='full'
      style={{maxWidth: '2560px'}}
    >
      <AssetGridHeader 
        toggleShowFilters={toggleShowFilters}
        mutate={assets.mutate}
      />
      <Box
        display='flex'
        width='full'
        marginTop='8'
      >
        <Box
          display={{
            base: 'none',
            largeScreen: showFilters ? 'initial' : 'none',
            wideScreen: showFilters ? 'initial' : 'none'
          }}
          marginLeft='-10'
          marginRight='16'
          paddingRight='16'
          paddingTop='8'
          style={{
            top: '138px', 
            height: 'calc(-138px + 100vh)', 
            width: '340px'
          }}
        >
          <FilterAccordion
            items={[
                { 
                    header: { name: t('status'), key: 'status' },
                    content: [
                        { name: t('buyNow'), key: 'buynow' }, 
                        { name: t('hasOffers'), key: 'hasoffers' }
                    ]
                }
            ]}
            display={showFilters}
          />
        </Box>
        <Box
          flexGrow='1'
          flexShrink='0'
          flexBasis='0'
        >
          <Box
            display='flex'
            justifyContent='space-between'
            marginBottom='10'
            alignItems='center'
            flexWrap='wrap'
          >
            <Box
              alignItems='center'
              justifyContent='space-between'
              marginY='8'
              width='full'
              display={{
                wideScreen: 'flex',
                largeScreen: 'flex',
                mediumScreen: 'flex',
                smallScreen: 'flex',
                base: 'none'
              }}
            >
              <Box
                display='flex'
                alignItems='center'
                gap='8'
              >
                <RoundButton
                  onClick={() => { 
                    assets.mutate(), 
                    setRefreshTime(Date.now() - 2000) 
                  }}
                >
                  <RefreshIcon />
                </RoundButton>
                <Box
                  display='flex'
                  gap='6'
                >
                  <Text
                    color='boxText'
                  >
                    {t('updated')}{'\u00a0'}
                    <TimeAgo 
                      date={refreshTime} 
                      formatter={(value, unit) => `${value} ${unit}${value > 1 ? 's' : ''} ago`} 
                    />
                  </Text>
                </Box>
              </Box>
              <Text
                fontWeight='600'
              >
                {mappedAssets ? mappedAssets.length : 'Unknown amount of'} 
                {mappedAssets.length === 1 ? ' asset ' : ' assets '} 
                {t('loaded')}
              </Text>
            </Box>
          </Box>
          <Box
            display='grid'
            gap='16'
            paddingBottom='16'
            width='full'
            maxWidth='full'
            gridTemplateColumns={{
              wideScreen: showFilters ? 'repeat(3, 1fr)' : 'repeat(4, 1fr)',
              largeScreen: showFilters ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)',
              mediumScreen: 'repeat(3, 1fr)',
              smallScreen: 'repeat(2, 1fr)',
              base: 'repeat(1, 1fr)'
            }}
          >
            {!isValidating && isEmpty 
              ? 
                <Text>
                  {t('noAssets')}
                </Text>
              : size === 1 && isValidating
                ? 
                  Array(6).map((_, index) => (
                    <AssetGridLoadingCard 
                      key={`loading-card-${index}`} 
                    />
                  ))
                : 
                  mappedAssets?.map((asset: AssetReadType) => (
                      <AssetGridCard 
                        asset={asset}
                        key={asset.id}
                        mutate={assets.mutate}
                        isOwner={isOwner}
                        tokens={tokens}
                      />
                  ))
              }
              {!didReachEnd &&
                Array(6).fill(null).map((_, index) => {
                  if (index === 0) {
                    return (
                      <AssetGridLoadingCard 
                        viewRef={ref} 
                        key={`loading-card-${index}`} 
                      />
                    )
                  }
                  return (
                    <AssetGridLoadingCard 
                      key={`loading-card-${index}`} 
                    />
                  )
                })
              }
          </Box>
        </Box>
      </Box>
    </Box>
  )
}