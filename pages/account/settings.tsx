import type { GetServerSideProps, NextPage } from 'next'
import { Fragment } from 'react'
import { Box } from '../../components/Box/Box'
import { TitleAndMetaTags } from '../../components/TitleAndMetaTags/TitleAndMetaTags'
import { unstable_getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]'
import useTranslation from 'next-translate/useTranslation'

const AccountSettingsPage: NextPage = () => {
    const { t } = useTranslation('common')

    return (
        <Fragment>
            <TitleAndMetaTags 
                title='Account Settings | OpenFish'
            />

            <Box 
                as='main' 
                display='flex' 
                alignItems='center' 
                flexDirection='column'
            >
                AccountSettingsPage
            </Box>
        </Fragment>
    )
}

export default AccountSettingsPage

export const getServerSideProps: GetServerSideProps = async (context) => {
    const session = await unstable_getServerSession(
        context.req,
        context.res,
        authOptions
    )

    if (!session) {
        return {
            redirect: {
                destination: '/login/?referrer=/account/settings'
            },
            props: {}
        }
    } else {
        return {
            props: {}
        }
    }
}
