import { Fragment, useState } from 'react'
import { Box } from '../Box/Box'
import { AssetGridHeader } from '../Headers/AssetGridHeader/AssetGridHeader'
import { FilterAccordion } from '../Accordions/FilterAccordion/FilterAccordion'
import { RefreshIcon } from '../Icons/RefreshIcon'
import { AssetsStateType, AssetType } from '../../types/assetTypes'
import { AssetGridCard } from '../Cards/AssetGridCard'
import { AssetGridLoadingCard } from '../Cards/AssetGridLoadingCard'
import TimeAgo from 'react-timeago'
import { RoundButton } from '../Buttons/RoundButton'
import { Text } from '../Text/Text'

interface Props {
  data: AssetsStateType
  isOwner?: boolean
  displayFilters: boolean
}

export const AssetGrid: React.FC<Props> = ({ 
  data: { assets, ref },
  isOwner,
  displayFilters
}) => {
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
    <Fragment>
      <AssetGridHeader 
        toggleShowFilters={toggleShowFilters}
        mutate={assets.mutate}
      />
      <Box
        display='flex'
        width='full'
        marginTop='8'
        paddingX='32'
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
                  header: { name: 'Status', key: 'status' },
                  content: [
                      { name: 'Buy now', key: 'buynow' }, 
                      { name: 'Has offers', key: 'hasoffers' }
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
              display='flex'
              alignItems='center'
              justifyContent='space-between'
              marginY='8'
              width='full'
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
                    Updated{'\u00a0'}
                    <TimeAgo 
                      date={refreshTime} 
                      formatter={(value, unit) => `${value} ${unit} ago`} 
                    />
                  </Text>
                </Box>
              </Box>
              <Text
                fontWeight='600'
              >
                {mappedAssets ? mappedAssets.length : 'Unknown amount of'} 
                {mappedAssets.length === 1 ? ' asset ' : ' assets '} 
                loaded
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
                  No assets
                </Text>
              : size === 1 && isValidating
                ? 
                  Array(6).map((_, index) => (
                    <AssetGridLoadingCard 
                      key={`loading-card-${index}`} 
                    />
                  ))
                : 
                  mappedAssets?.map((asset: AssetType) => (
                      <AssetGridCard 
                        asset={asset}
                        key={asset.id}
                        mutate={assets.mutate}
                        isOwner={isOwner}
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
    </Fragment>
  )
}