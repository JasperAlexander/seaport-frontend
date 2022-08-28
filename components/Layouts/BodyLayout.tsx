import { FC, ReactNode, useState } from 'react'
import { Toaster } from 'react-hot-toast'
import { Box } from '../Box/Box'
import { BodyHeader } from '../Headers/BodyHeader/BodyHeader'
import LoadingBar from 'react-top-loading-bar'
import { Router } from 'next/router'

interface Props {
    children: ReactNode
}

export const BodyLayout: FC<Props> = ({ 
    children 
}) => {
    const [progress, setProgress] = useState<number>(0)

    Router.events.on('routeChangeStart', () => setProgress(10))
    Router.events.on('routeChangeComplete', () => setProgress(100))
    Router.events.on('routeChangeError', () => setProgress(100))
    
    return (
        <Box
            minHeight='full'
            // position='absolute'
        >
            <LoadingBar 
                color='#FA5B0F'
                progress={progress}
                onLoaderFinished={() => setProgress(0)}
            />
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
  