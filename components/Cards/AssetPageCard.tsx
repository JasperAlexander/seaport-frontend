import { FC } from 'react'
import useMounted from '../../hooks/useMounted'
import { AssetType } from '../../types/assetTypes'
import { Box } from '../Box/Box'
import { EthIcon } from '../Icons/EthIcon'
import { FavoriteOutlinedIcon } from '../Icons/FavoriteOutlinedIcon'

interface Props {
    asset: AssetType | undefined
}

export const AssetPageCard: FC<Props> = ({
    asset,
}) => {
    const { mounted } = useMounted()

  return (
    <Box
      marginY='20'
      borderWidth='1'
      borderRadius='10'
      borderStyle='solid'
      borderColor='box'
      overflow='hidden'
      marginX={{
        wideScreen: '20',
        largeScreen: '20'
    }}
  >
      <Box
          display='flex'
          padding='12'
          alignItems='center'
          justifyContent='space-between'
          width='full'
          height='42'
      >
          <Box
              display='flex'
              alignItems='center'
          >
              <EthIcon 
                width='18' 
            />
          </Box>
          <Box
              display='flex'
              alignItems='center'
          >
              <Box
                    as='span'
                    paddingBottom='1'
                    paddingX='8'
                    color='boxText'
                    fontSize='12'
                    fontWeight='600'
              >
                  0
              </Box>
              <FavoriteOutlinedIcon 
                width='20' 
                fill='boxText' 
            />
          </Box>
      </Box>
      <Box
          minHeight='200'
          maxHeight='1000'
          cursor='pointer'
          dimension='full'
      >
          <Box
              display='flex'
              alignItems='center'
              justifyContent='center'
              flexDirection='column'
              dimension='full'
              position='relative'
          >
            {mounted ?
              <Box
                  as='img'
                  objectFit='cover'
                  height='full'
                  display='flex'
                  alignItems='center'
                  justifyContent='center'
                  maxHeight='full'
                  maxWidth='full'
                  overflow='hidden'
                  position='relative'
                  src={asset?.image_url}
              />
              : ''}
          </Box>
      </Box>
    </Box>
  )
}
