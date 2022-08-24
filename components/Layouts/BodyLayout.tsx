import { FC, ReactNode } from 'react'
import { Toaster } from 'react-hot-toast'
import { Box } from '../Box/Box'
import { BodyHeader } from '../Headers/BodyHeader/BodyHeader'

interface Props {
    children: ReactNode
}

export const BodyLayout: FC<Props> = ({ 
    children 
}) => {
    return (
        <Box
            minHeight='full'
            // position='absolute'
        >
            <Toaster 
                position='bottom-right'
                toastOptions={{
                    style: {
                        zIndex: '21474836471'
                    }
                }}
            />
            <BodyHeader />
            { children }
        </Box>
    )
}
  