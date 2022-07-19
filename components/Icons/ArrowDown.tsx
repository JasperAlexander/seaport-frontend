import React from 'react'
import { Box } from '../Box/Box'

export const ArrowDown = () => {
  return (
    <Box display='flex' width='40' marginLeft='-40' style={{zIndex: '1', pointerEvents: 'none'}}>
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="square" stroke-linejoin="arcs"><path d="M6 9l6 6 6-6"/></svg>
    </Box>
  )
}
