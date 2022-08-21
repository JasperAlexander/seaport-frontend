import Link from 'next/link'
import useMounted from '../../hooks/useMounted'
import { sprinkles } from '../../styles/sprinkles.css'
import { AssetType } from '../../types/assetTypes'
import { Box } from '../Box/Box'
import { FC } from 'react'
import { VisibilityIcon } from '../Icons/VisibilityIcon'
import { FavoriteFilledIcon } from '../Icons/FavoriteFilledIcon'
import { truncateAddress, truncateEns } from '../../utils/truncateText'

interface Props {
  asset: AssetType | undefined
}

export const AssetMeta: FC<Props> = ({
  asset
}) => {
  const { mounted } = useMounted()
    
  return (
    <Box
        marginY='20'
        display='flex'
        gap='20'
        maxWidth='full'
        overflow='hidden'
        textOverflow='ellipsis'
        color='boxText'
        className={sprinkles({
            marginX: {
              wideScreen: '20',
              largeScreen: '20'
            }
        })}
        style={{wordBreak: 'break-all'}}
    >
      <Box
        display='flex'
        alignItems='center'
        gap='4'
      >
        Owned by 
        {mounted ?
          <Link href={`/${asset?.owner?.username ? asset.owner.username : asset?.owner?.address}/`}>
            <a
              className={sprinkles({
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                maxWidth: 'full',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                color: 'accentColor'
              })}
            >
              {mounted ? asset?.owner?.username ? truncateEns(asset.owner.username) : asset?.owner?.address ? truncateAddress(asset.owner.address) : '' : ''}
            </a>
          </Link>
        : ''}
        </Box>
        <Box
          display='flex'
          alignItems='center'
          gap='8'
        >
            <VisibilityIcon fill='boxText' />
            0.0K views
        </Box>
        <Box
          display='flex'
          alignItems='center'
          gap='8'
        >
            <FavoriteFilledIcon fill='boxText' />
            0 favorites
        </Box>
    </Box>
  )
}