import type { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next'
import Head from 'next/head'
import { Fragment } from 'react'
import { Box } from '../../components/Box/Box'
import { TokensType } from '../../types/tokenTypes'
import setParams from '../../utils/params'
import useTokens from '../../hooks/useTokens'
import { useRouter } from 'next/router'
import { CreateCollectionForm } from '../../components/Forms/CreateCollectionForm'

type Props = InferGetStaticPropsType<typeof getStaticProps>

const CreateCollectionPage: NextPage<Props> = ({
    fallbackTokens
}) => {
    const router = useRouter()
    const tokens = useTokens(router, fallbackTokens)
    
    return (
        <Fragment>
            <Head>
                <title>Create Collection | Seaport implementation</title>
                <meta name="description" content="An example of how to implement the Seaport marketplace protocol." />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Box
                as='main'
            >
                <CreateCollectionForm 
                    tokens={tokens}
                />
            </Box>
        </Fragment>
    )
}

export default CreateCollectionPage

export const getStaticProps: GetStaticProps<{
    fallbackTokens: TokensType
}> = async () => {
    const tokensOptions: RequestInit | undefined = {}

    const tokensUrl = new URL(`/api/v1/tokens/`, 'http://localhost:8000')

    const tokensQuery = {}
  
    const tokensHref = setParams(tokensUrl, tokensQuery)
  
    const tokensRes = await fetch(tokensHref, tokensOptions)
  
    const fallbackTokens = (await tokensRes.json()) as TokensType
  
    return {
        props: { 
            fallbackTokens
        }
    }
}