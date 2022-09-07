import { FC } from 'react'
import { Box } from '../Box/Box'
import { CloseIcon } from '../Icons/CloseIcon'
import { MenuIcon } from '../Icons/MenuIcon'

interface Props {
    open: boolean
}

export const MenuDialogButton: FC<Props> = ({ 
    open
}) => {
    return (
        <Box
            as='button'
            display={{
                base: 'flex',
                wideScreen: 'none',
                largeScreen: 'none'
            }}
            alignItems='center'
            paddingX='10'
        >
            {open 
                ? <CloseIcon width='32' />
                : <MenuIcon width='32' />
            }
        </Box>
    )
}