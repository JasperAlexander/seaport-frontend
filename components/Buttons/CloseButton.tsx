import React from 'react'
import { sprinkles } from '../../styles/sprinkles.css'
import { isMobile } from '../../utils/isMobile'
import { Box } from '../Box/Box'
import { CloseIcon } from '../Icons/Close'

export const CloseButton = ({
  ariaLabel = 'Close',
  onClose,
}: {
  ariaLabel?: string
  onClose: () => void
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
      className={sprinkles({
        background: {
          hover: 'lightgray500'
        },
        borderColor: {
          hover: 'lightgray200'
        },
        scale: {
          hover: 'growLg',
          active: 'shrinkSm'
        }
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