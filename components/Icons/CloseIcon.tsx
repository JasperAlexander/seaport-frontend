import { FC } from 'react'
import { sprinkles } from '../../styles/sprinkles.css'
import { BoxProps } from '../Box/Box'

interface Props {
  width?: BoxProps['width']
  height?: BoxProps['height']
  fill?: BoxProps['fill']
  fillOnHover?: BoxProps['fill']
}

export const CloseIcon: FC<Props> = ({
  width = '24',
  height,
  fill = 'black',
  fillOnHover
}) => {
  return (
    <svg 
      className={sprinkles({
        width: width,
        height: height ? height : width,
        fill: {
          // @ts-ignore
          base: fill,
          // @ts-ignore
          hover: fillOnHover ? fillOnHover : fill
        }
      })}
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
    >
      <path 
        d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
      />
    </svg>
  )
}