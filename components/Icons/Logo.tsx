import React, { FC } from 'react'
import { Box, BoxProps } from '../Box/Box'

interface Props {
  variant?: 'primary' | 'secondary'
  width?: BoxProps['width']
  height?: BoxProps['height']
  fontSize?: BoxProps['fontSize']
}

export const Logo: FC<Props> = ({
  variant = 'primary',
  width = '40',
  height,
  fontSize = '28'
}) => {
  return (
    <Box 
      display='flex' 
      width={width}
      height={height ? height : width}
      marginRight='8' 
      color='transparent' 
      background={variant === 'primary' ? 'accentColor' : 'white'}
      alignItems='center'
      justifyContent='center'
      aspectRatio='square'
      borderRadius='20'
      fontSize={fontSize}
      userSelect='none'
      style={{textShadow: `0 0 0 ${variant === 'primary' ? 'white' : '#FA5B0F'}`}}
    >
      🐟
    </Box>
  )
}
