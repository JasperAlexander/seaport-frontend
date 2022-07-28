import { useAssets } from '../../hooks/useAssets'
import { AssetCardSmall } from '../Cards/AssetCardSmall'
import { Box } from '../Box/Box'
import { ethers } from 'ethers'
import { useEvents } from '../../hooks/useEvents'
import { EventTypes } from '../../types/eventTypes'
import { AssetType } from '../../types/assetTypes'
import { Fragment } from 'react'
import { Refresh } from '../Icons/Refresh'
import { FilterAccordion } from '../Accordions/FilterAccordion/FilterAccordion'
import { AssetsHeader } from '../Headers/AssetsHeader'

export const AssetsLayout: React.FC = () => {
  const { assets } = useAssets()
  const { events } = useEvents()

  const getAssetEventsCreated = (asset: AssetType) => {
    const assetEventsCreated = events.filter((event) => {
      return (
          asset &&
          event.asset.contract_address === asset.asset_contract.address && 
          event.asset.token_id === asset.token_id &&
          event.event_type === EventTypes.created
      )
    })
    return assetEventsCreated[0]
  }

    return (
      <Fragment>
        <AssetsHeader />
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
                {assets.length} items
              </Box>
            </Box>
            <Box
              display='grid'
              gridTemplateColumns='repeat(2, 1fr)'
              gap='16'
              paddingBottom='16'
              width='full'
            >
              {assets.map(asset => (
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

    // if(assets.length > 0) {
    //   return(
    //     <Box
    //       display='grid'
    //       gridTemplateColumns='repeat(4, 1fr)'
    //       gap='10'
    //     >
    //       {assets.map(asset => (
    //         <AssetCard 
    //           asset={asset} 
    //           event={getAssetEventsCreated(asset)}
    //           key={ethers.utils.formatEther(asset.token_id)} 
    //         />
    //       ))}
    //     </Box>
    //   )
    // } else {
    //   return(
    //     <Text as='span'>No assets available</Text>
    //   )
    // }
}
