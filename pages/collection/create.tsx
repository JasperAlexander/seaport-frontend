import type { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next'
import { Fragment } from 'react'
import { Box } from '../../components/Box/Box'
import { TokensType } from '../../types/tokenTypes'
import setParams from '../../utils/params'
import useTokens from '../../hooks/useTokens'
import { useRouter } from 'next/router'
import { CreateCollectionForm } from '../../components/Forms/CreateCollectionForm'
import { TitleAndMetaTags } from '../../components/TitleAndMetaTags/TitleAndMetaTags'
import useTranslation from 'next-translate/useTranslation'

const API_BASE = process.env.NEXT_PUBLIC_API_BASE

type Props = InferGetStaticPropsType<typeof getStaticProps>

const CreateCollectionPage: NextPage<Props> = ({
    fallbackTokens
}) => {
    const { t } = useTranslation('common')

    const router = useRouter()
    const tokens = useTokens(router, fallbackTokens)
    
    return (
        <Fragment>
            <TitleAndMetaTags 
                title={`${t('createCollection')} | OpenFish`}
            />

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
    try {
        const tokensOptions: RequestInit | undefined = {}

        const tokensUrl = new URL(`/api/v1/tokens/`, API_BASE)

        const tokensQuery = {}
    
        const tokensHref = setParams(tokensUrl, tokensQuery)
    
        const tokensRes = await fetch(tokensHref, tokensOptions)
    
        const fallbackTokens = (await tokensRes.json()) as TokensType
    
        return {
            props: { 
                fallbackTokens
            }
        }
    } catch {
        return {
            notFound: true
        }
    }
}