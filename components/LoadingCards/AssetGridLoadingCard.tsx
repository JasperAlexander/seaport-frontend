import { FC } from 'react'
import { useInView } from 'react-intersection-observer'
import { Box } from '../Box/Box'

type Props = {
  viewRef?: ReturnType<typeof useInView>['ref']
}

export const AssetGridLoadingCard: FC<Props> = ({ 
  viewRef 
}) => {
  return (
    <Box
      ref={viewRef}
      display='flex'
      flexDirection='column'
      background='defaultBackground'
      height='auto'
      overflow='hidden'
      borderRadius='10'
      borderWidth='1'
      boxShadow={{
        base: 'box',
        hover: 'boxHover'
      }}
      transition='default'
      cursor='pointer'
      aspectRatio='1.1'
    />
  )
}