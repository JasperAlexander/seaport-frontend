import type { NextPage } from 'next'
import { Fragment } from 'react'
import { Box } from '../components/Box/Box'
import { TitleAndMetaTags } from '../components/TitleAndMetaTags/TitleAndMetaTags'
import { ConnectWalletScreen } from '../components/ConnectWalletScreen/ConnectWalletScreen'

const LoginPage: NextPage = () => {
    return (
        <Fragment>
            <TitleAndMetaTags 
                title='Login | OpenFish'
            />

            <Box
                as='main'
                display='flex'
                flexDirection='column'
            >
                <ConnectWalletScreen />
            </Box>
        </Fragment>
    )
}

export default LoginPage