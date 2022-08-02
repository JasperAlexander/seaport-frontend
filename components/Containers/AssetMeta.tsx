import { sprinkles } from '../../styles/sprinkles.css'
import { AssetType } from '../../types/assetTypes'
import { Box } from '../Box/Box'

interface Props {
  asset: AssetType | undefined
}

export const AssetMeta: React.FC<Props> = ({
  asset,
}: Props) => {
  return (
    <Box
        marginY='20'
        display='flex'
        maxWidth='full'
        overflow='hidden'
        textOverflow='ellipsis'
        color='boxText'
        className={sprinkles({
            marginX: {
              largeScreen: '20'
            }
        })}
        style={{wordBreak: 'break-all'}}
    >
        Owned by {asset ? asset.owner : ''}
    </Box>
  )
}