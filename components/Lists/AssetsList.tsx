import { Fragment, useState } from 'react'
import { Box } from '../Box/Box'
import { AssetsHeader } from '../Headers/AssetsHeader'
import { FilterAccordion } from '../Accordions/FilterAccordion/FilterAccordion'
import { RefreshIcon } from '../Icons/RefreshIcon'
import { AssetsStateType, AssetType } from '../../types/assetTypes'
import { AssetCardSmall } from '../Cards/AssetCardSmall'
import { sprinkles } from '../../styles/sprinkles.css'
import LoadingCard from '../Cards/LoadingCard'
import TimeAgo from 'react-timeago'

interface Props {
  data: AssetsStateType
  isOwner?: boolean
  displayFilters: boolean
}

export const AssetsList: React.FC<Props> = ({ 
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
      <AssetsHeader 
        toggleShowFilters={toggleShowFilters}
        mutate={assets.mutate}
      />
      <Box
        display='flex'
        width='full'
        marginTop='8'
      >
        <Box
          display='none'
          className={sprinkles({
              display: {
                  wideScreen: showFilters ? 'initial' : 'none',
                  largeScreen: showFilters ? 'initial' : 'none'
              }
          })}
          marginLeft='-10'
            marginRight='16'
            paddingRight='16'
            paddingTop='8'
            style={{top: '138px', height: 'calc(-138px + 100vh)', width: '340px'}}
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
                color='boxText'
              >
                <Box
                  as='button'
                  display='flex'
                  alignItems='center'
                  justifyContent='center'
                  padding='12'
                  marginRight='8'
                  borderRadius='full'
                  onClick={() => { assets.mutate(), setRefreshTime(Date.now() - 2000) }}
                  className={sprinkles({
                    boxShadow: {
                      hover: 'subHeader'
                    },
                    background: {
                      active: 'buttonBackgroundActive'
                    }
                  })}
                >
                  <RefreshIcon />
                </Box>
                <Box
                  display='flex'
                  gap='6'
                >
                  Updated {
                    <TimeAgo date={refreshTime} formatter={(value, unit) => `${value} ${unit} ago`} />
                  }
                </Box>
              </Box>
              <Box
                fontWeight='600'
              >
                {mappedAssets ? mappedAssets.length : 'Unknown amount of'} assets loaded
              </Box>
            </Box>
          </Box>
          <Box
            display='grid'
            gap='16'
            paddingBottom='16'
            width='full'
            maxWidth='full'
            className={sprinkles({
              gridTemplateColumns: {
                wideScreen: showFilters ? 'repeat(3, 1fr)' : 'repeat(4, 1fr)',
                largeScreen: showFilters ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)',
                mediumScreen: 'repeat(3, 1fr)',
                smallScreen: 'repeat(2, 1fr)',
                base: 'repeat(1, 1fr)'
              }
            })}
          >
            {!isValidating && isEmpty 
              ? <p>No assets</p>
              : size === 1 && isValidating
                ? 
                  Array(6).map((_, index) => (
                    <LoadingCard key={`loading-card-${index}`} />
                  ))
                : 
                  mappedAssets?.map((asset: AssetType) => (
                      <AssetCardSmall 
                        asset={asset}
                        key={asset.id}
                        mutate={assets.mutate}
                        isOwner={isOwner}
                      />
                  ))
              }
              {!didReachEnd &&
                Array(6).fill(null).map((_, index) => {
                  if (index === 0) return <LoadingCard viewRef={ref} key={`loading-card-${index}`} />
                  return <LoadingCard key={`loading-card-${index}`} />
                })
              }
          </Box>
        </Box>
      </Box>
    </Fragment>
  )
}