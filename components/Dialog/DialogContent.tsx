import React, { ReactNode } from 'react'
import { isMobile } from '../../utils/isMobile'
import { Box, BoxProps } from '../Box/Box'
import * as styles from './DialogContent.css'

interface DialogContentProps {
  children: ReactNode
  bottomSheetOnMobile?: boolean
  paddingX?: BoxProps['paddingX']
  paddingY?: BoxProps['paddingX']
  marginTop?: BoxProps['marginTop']
  wide?: boolean
}

export function DialogContent({
  bottomSheetOnMobile = false,
  children,
  marginTop,
  paddingX = '0',
  paddingY = '0',
  wide = false,
}: DialogContentProps) {
  const mobile = isMobile()
  return (
    <Box marginTop={marginTop}>
      <Box
        className={[
          wide
            ? mobile
              ? styles.dialogContentWideMobile
              : styles.dialogContentWideDesktop
            : styles.dialogContent,
          mobile ? styles.dialogContentMobile : null,
          mobile && bottomSheetOnMobile ? styles.bottomSheetOverrides : null,
        ].join(' ')}
      >
        <Box 
          paddingX={paddingX}
          paddingY={paddingY}
        >
          {children}
        </Box>
      </Box>
    </Box>
  )
}