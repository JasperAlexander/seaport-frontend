import { Dialog } from '../Dialog/Dialog'
import React, { ReactNode } from 'react'
import { DialogContent } from '../Dialog/DialogContent'
import { isMobile } from '../../utils/isMobile'
import { Box } from '../Box/Box'
import { CloseButton } from '../Buttons/CloseButton'

interface ModalProps {
  onClose: () => void,
  open: boolean,
  children: ReactNode
}

export const Modal = ({
  onClose,
  open,
  children
}: ModalProps) => {
  const titleId = 'si_account_modal_title'

  const mobile = isMobile()

  return (
    <Dialog onClose={onClose} open={open} titleId={titleId}>
      <DialogContent bottomSheetOnMobile padding="0">
        <Box display="flex" flexDirection="column">
          <Box background="profileForeground" padding="16">
            <Box
              alignItems="center"
              display="flex"
              flexDirection="column"
              gap={mobile ? '16' : '12'}
              justifyContent="center"
              margin="0"
              style={{ textAlign: 'center' }}
            >
              <Box
                style={{
                  position: 'absolute',
                  right: 16,
                  top: 16,
                  willChange: 'transform',
                }}
              >
                <CloseButton onClose={onClose} />
              </Box>{' '}
            </Box>
            <Box
              display="flex"
              flexDirection="column"
              gap="8"
              margin="2"
              marginTop="16"
            >
              {children}
            </Box>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  )
}
  