import { FC, ReactNode } from 'react'
import { Toaster } from 'react-hot-toast'
import { Box } from '../Box/Box'
import { MenuHeader } from '../Headers/MenuHeader'
import { FilterSidebar } from '../Sidebars/FilterSidebar'
import { MenuSidebar } from '../Sidebars/MenuSidebar'

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
            <MenuHeader />
            <MenuSidebar />
            <FilterSidebar />
            { children }
        </Box>
    )
}
  