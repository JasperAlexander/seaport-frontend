import React from 'react'
import { touchableStyles } from '../../styles/touchableStyles'
import { isMobile } from '../../utils/isMobile'
import { Box } from '../Box/Box'
import { CloseIcon } from '../Icons/Close'

export const CloseButton = ({
  'aria-label': ariaLabel = 'Close',
  onClose,
}: {
  'aria-label'?: string
  'onClose': () => void
}) => {
  const mobile = isMobile()
  return (
    <Box
      alignItems="center"
      aria-label={ariaLabel}
      as="button"
      background="closeButtonBackground"
      borderColor="defaultBackgroundBorder"
      borderRadius="full"
      borderStyle="solid"
      borderWidth={mobile ? '0' : '1'}
      className={touchableStyles({ 
        hoverBackground: 'lightgray500', 
        hoverBorderColor: 'gray', 
        activeScale: 'shrinkSm', 
        hoverScale: 'growLg' 
      })}
      color="closeButton"
      display="flex"
      height={mobile ? '30' : '28'}
      justifyContent="center"
      onClick={onClose}
      style={{ willChange: 'transform' }}
      transition="default"
      type="button"
      width={mobile ? '30' : '28'}
    >
      <CloseIcon />
    </Box>
  )
}