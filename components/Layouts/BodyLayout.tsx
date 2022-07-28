import { Toaster } from 'react-hot-toast'
import { Box } from '../Box/Box'
import { MenuHeader } from '../Headers/MenuHeader'
import { MenuSidebar } from '../Sidebars/MenuSidebar'
import { WalletSidebar } from '../Sidebars/WalletSidebar'

type Props = {
    children: React.ReactNode
}

export const BodyLayout: React.FC<Props> = ({ children }: Props) => {
    return (
        <Box
            minHeight='full'
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
            <WalletSidebar />
            { children }
        </Box>
    )
}
  