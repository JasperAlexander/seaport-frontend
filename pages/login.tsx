import type { NextPage } from 'next'
import { Fragment } from 'react'
import { Box } from '../components/Box/Box'
import { TitleAndMetaTags } from '../components/TitleAndMetaTags/TitleAndMetaTags'

interface Props {

}

const LoginPage: NextPage<Props> = ({ 
   
}) => {
    return (
        <Fragment>
            <TitleAndMetaTags />

            <Box
                as='main'
            >

            </Box>
        </Fragment>
    )
}