import { FC, ReactNode, useEffect, useRef } from 'react'
import { Box } from '../Box/Box'
import { BodyHeader } from '../Headers/BodyHeader/BodyHeader'
import LoadingBar from 'react-top-loading-bar'
import { useRouter } from 'next/router'
import { BodyFooter } from '../Footers/BodyFooter/BodyFooter'

interface Props {
    children: ReactNode
}

export const BodyLayout: FC<Props> = ({ 
    children 
}) => {
    const router = useRouter()
    const loadingBarRef = useRef<any>(null)

    const handleRouteChange = () => {
        loadingBarRef?.current?.continuousStart()
    }

    const handleRouteComplete = () => {
        loadingBarRef?.current?.complete()
    }

    useEffect(() => {
        router.events.on('routeChangeStart', handleRouteChange)
        router.events.on('routeChangeComplete', handleRouteComplete)

        return () => {
            router.events.off('routeChangeStart', handleRouteChange)
            router.events.off('routeChangeComplete', handleRouteComplete)
        }
    })
    
    return (
        <Box
            display='flex'
            flexDirection='column'
            minHeight='full'
        >
            <LoadingBar 
                color='#FA5B0F'
                ref={loadingBarRef}
            />
            <BodyHeader />
            { children }
            <BodyFooter />
        </Box>
    )
}
  