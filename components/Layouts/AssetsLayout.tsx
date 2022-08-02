import { useAssets } from '../../hooks/useAssets'
import { AssetCardSmall } from '../Cards/AssetCardSmall'
import { Box } from '../Box/Box'
import { ethers } from 'ethers'
import { useEvents } from '../../hooks/useEvents'
import { EventTypes } from '../../types/eventTypes'
import { AssetType } from '../../types/assetTypes'
import { Fragment, useState } from 'react'
import { Refresh } from '../Icons/Refresh'
import { FilterAccordion } from '../Accordions/FilterAccordion/FilterAccordion'
import { AssetsHeader } from '../Headers/AssetsHeader'

interface Props {
  displayFilters: boolean
}

export const AssetsLayout: React.FC<Props> = ({
  displayFilters
}) => {
  const { assets } = useAssets()
  const { events } = useEvents()

  const getAssetEventsCreated = (asset: AssetType) => {
    const assetEventsCreated = events.filter((event) => {
      return (
          asset &&
          event.asset.contract_address === asset.asset_contract.address && 
          event.asset.token_id.toString() === asset.token_id.toString() &&
          event.event_type === EventTypes.created
      )
    })
    return assetEventsCreated[0]
  }

  const [sortState, setSortState] = useState<{sort: string}>({
    sort: ''
  })

  const [filterState, setFilterState] = useState<{filter: string[]}>({
    filter: []
  })

  const filteredAssets = assets.filter((asset) => {
    const assetEventsListed = events.filter((event) => {
      return (
          event.asset.contract_address === asset.asset_contract.address && 
          event.asset.token_id.toString() === asset.token_id.toString() &&
          event.event_type === EventTypes.listed
      )
    })

    const assetEventsCancelled = events.filter((event) => {
        return (
            event.asset.contract_address === asset.asset_contract.address && 
            event.asset.token_id.toString() === asset.token_id.toString() &&
            event.event_type === EventTypes.cancelled
        )
    })

    const lastEvent = [
      ...assetEventsListed,
      ...assetEventsCancelled
    ].sort((a, b) => {
        return new Date(b.created_date).getTime() - new Date(a.created_date).getTime()
    })

    if(filterState.filter.includes('Buy now')) {
      if(lastEvent.length > 0) {
        return lastEvent[0].event_type === EventTypes.listed
      } else if(filterState.filter.includes('Not listed') && lastEvent.length === 0) {
        return true
      } else {
        return false
      }
    }

    if(filterState.filter.includes('Not listed')) {
      if(lastEvent.length === 0) {
        return true
      } else if(lastEvent.length > 0) {
        return lastEvent[0].event_type !== EventTypes.listed
      } else {
        return false
      }
    }

    // Show all assets if no filter is selected
    return true
  })

  const [showFilters, setShowFilters] = useState<boolean>(displayFilters)
  const toggleShowFilters = () => {
    setShowFilters(!showFilters)
  }

    return (
      <Fragment>
        <AssetsHeader 
          sortState={sortState}
          setSortState={setSortState}
          toggleShowFilters={toggleShowFilters}
        />
        <Box
          display='flex'
          width='full'
          marginTop='8'
          paddingX='16'
        >
          <FilterAccordion 
            initialExpandedState={true} 
            headerTitle='Status'
            items={['Buy now', 'Not listed']}
            filterState={filterState}
            setFilterState={setFilterState}
            display={showFilters}
          />
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
                marginY='8'
              >
                <Box
                  as='button'
                  display='flex'
                  alignItems='center'
                  justifyContent='center'
                  padding='12'
                  marginRight='8'
                >
                  <Refresh width='24' color='black' />
                </Box>
                {filteredAssets.length} items
              </Box>
            </Box>
            <Box
              display='grid'
              gridTemplateColumns='repeat(2, 1fr)'
              gap='16'
              paddingBottom='16'
              width='full'
            >
              {filteredAssets.map(asset => (
                    <AssetCardSmall 
                      asset={asset} 
                      event={getAssetEventsCreated(asset)}
                      key={ethers.utils.formatEther(asset.token_id)} 
                    />
              ))}
            </Box>
          </Box>
        </Box>
      </Fragment>
    )
}
