import { sprinkles } from '../../styles/sprinkles.css'
import { AssetType } from '../../types/assetTypes'
import { Box } from '../Box/Box'
import { ETH } from '../Icons/ETH'
import { Favorite } from '../Icons/Favorite'

interface Props {
    asset: AssetType | undefined
}

export const AssetCardLarge: React.FC<Props> = ({
    asset,
}: Props) => {
  return (
    <Box
      marginY='20'
      borderWidth='1'
      borderRadius='10'
      borderStyle='solid'
      borderColor='box'
      overflow='hidden'
      className={sprinkles({
        marginX: {
          largeScreen: '20'
        }
      })}
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
              <ETH width='12px' color='gray' />
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
                    fontWeight='semibold'
              >
                  0
              </Box>
              <Favorite width='20' color='rgb(112, 122, 131)' />
          </Box>
      </Box>
      <Box
          minHeight='200'
          maxHeight='1000'
          height='full'
          cursor='pointer'
          width='full'
      >
          <Box
              display='flex'
              alignItems='center'
              justifyContent='center'
              flexDirection='column'
              height='full'
              width='full'
              position='relative'
          >
              <Box
                  as='img'
                  objectFit='cover'
                  height='full'
                  width='600'
                  display='flex'
                  alignItems='center'
                  justifyContent='center'
                  maxHeight='full'
                  maxWidth='full'
                  overflow='hidden'
                  position='relative'
                  src={asset && asset.image_url
                          ? URL.createObjectURL(asset.image_url)
                          : ''
                      }
              />
          </Box>
      </Box>
    </Box>
  )
}
