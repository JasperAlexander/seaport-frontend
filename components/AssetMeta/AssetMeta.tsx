import useMounted from '../../hooks/useMounted'
import { AssetReadType } from '../../types/assetTypes'
import { Box } from '../Box/Box'
import { FC } from 'react'
import { VisibilityIcon } from '../Icons/VisibilityIcon'
import { FavoriteFilledIcon } from '../Icons/FavoriteFilledIcon'
import { truncateAddress, truncateEns } from '../../utils/truncateText'
import { Text } from '../Text/Text'
import { NextLink } from '../NextLink/NextLink'
import useTranslation from 'next-translate/useTranslation'

interface Props {
  asset: AssetReadType | undefined
}

export const AssetMeta: FC<Props> = ({
  asset
}) => {
  const { t } = useTranslation('common')
  const { mounted } = useMounted()
    
  return (
    <Box
        display='flex'
        gap='20'
        maxWidth='full'
        overflow='hidden'
        textOverflow='ellipsis'
        color='boxText'
        style={{wordBreak: 'break-all'}}
    >
      <Box
        display='flex'
        alignItems='center'
        gap='4'
      >
        <Text
          color='boxText'
          fontSize='15'
        >
          {t('ownedBy')}
        </Text>
        {mounted ?
          <NextLink 
            href={`/${asset?.owner?.username ? asset.owner.username : asset?.owner?.address}/`}
            display='flex'  
            alignItems='center'
            maxWidth='full'
          >
            <Text
              display='inline-block'
              color='accentColor'
              fontSize='15'
            >
              {mounted ? asset?.owner?.username ? truncateEns(asset.owner.username) : asset?.owner?.address ? truncateAddress(asset.owner.address) : '' : ''}
            </Text>
          </NextLink>
        : ''}
      </Box>
      <Box
        display='flex'
        alignItems='center'
        gap='8'
      >
          <VisibilityIcon 
            fill='boxText' 
          />
          <Text
            color='boxText'
            fontSize='15'
          >
            0.0K {t('views')}
          </Text>
      </Box>
      <Box
        display='flex'
        alignItems='center'
        gap='8'
      >
          <FavoriteFilledIcon fill='boxText' />
          <Text
            color='boxText'
            fontSize='15'
          >
            0 {t('favorites')}
          </Text>
      </Box>
    </Box>
  )
}