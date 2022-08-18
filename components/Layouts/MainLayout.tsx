import { FC, ReactNode } from 'react'
import { Box } from '../Box/Box'

type Props = {
    children: ReactNode
}

export const MainLayout: FC<Props> = ({ 
    children 
}) => {
    return (
        <Box
            as='main'
            marginTop='8'
            marginBottom='16'
            marginX={{
                base: '8',
                wideScreen: '0',
                largeScreen: '0'
            }}
        >
            {children}
        </Box>
    )
}