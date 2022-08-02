import React from 'react'
import { Box } from '../Box/Box'

export const Logo = () => {
  return (
    <Box 
      display='flex' 
      width='40' 
      marginRight='8' 
      color='transparent' 
      background='accentColor'
      alignItems='center'
      justifyContent='center'
      aspectRatio='1'
      borderRadius='20'
      fontSize='28'
      style={{textShadow: '0 0 0 white'}}
    >
      🐟
    </Box>
  )
}
