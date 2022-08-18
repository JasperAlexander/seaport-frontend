import { FC } from 'react'
import { useInView } from 'react-intersection-observer'
import { sprinkles } from '../../styles/sprinkles.css'
import { Box } from '../Box/Box'

type Props = {
  viewRef?: ReturnType<typeof useInView>['ref']
}

const LoadingCard: FC<Props> = ({ viewRef }) => {
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
      boxShadow='box'
      transition='default'
      className={sprinkles({
        boxShadow: {
            hover: 'boxHover'
        }
      })}
      cursor='pointer'
      aspectRatio='1.1'
  />
  )
}

export default LoadingCard