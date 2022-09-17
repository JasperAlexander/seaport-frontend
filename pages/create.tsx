// To do: add option to save files to other storage solutions

import type { GetServerSideProps, NextPage } from 'next'
import { Fragment } from 'react'
import { Box } from '../components/Box/Box'
import useCollections from '../hooks/useCollections'
import { useRouter } from 'next/router'
import { CreateAssetForm } from '../components/Forms/CreateAssetForm'
import { TitleAndMetaTags } from '../components/TitleAndMetaTags/TitleAndMetaTags'
// import { useIpfs } from '../hooks/useIPFS'
// import { create } from 'ipfs-http-client'
import { unstable_getServerSession } from 'next-auth/next'
import { authOptions } from './api/auth/[...nextauth]'
import useTranslation from 'next-translate/useTranslation'

const CreateAssetPage: NextPage = () => {
    const { t } = useTranslation('common')

    const router = useRouter()
    const collections = useCollections(router)
    // const { client } = useIpfs()
    // const client = create({ host: '127.0.0.1', port: 5001, protocol: 'http' })
    
    return (
        <Fragment>
            <TitleAndMetaTags 
                title={`${t('createAsset')} | OpenFish`}
            />

            <Box 
                as='main' 
                display='flex' 
                alignItems='center' 
                flexDirection='column'
            >
                {collections?.collections?.data &&
                    <CreateAssetForm 
                        collections={collections} 
                    />
                }
            </Box>
        </Fragment>
    )
}

export default CreateAssetPage

export const getServerSideProps: GetServerSideProps = async (context) => {
    const session = await unstable_getServerSession(
        context.req,
        context.res,
        authOptions
    )

    if (!session) {
        return {
            redirect: {
                destination: '/login/?referrer=/create'
            },
            props: {}
        }
    } else {
        return {
            props: {}
        }
    }
}
