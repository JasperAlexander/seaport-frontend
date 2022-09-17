import type { GetStaticPaths, GetStaticProps, InferGetStaticPropsType, NextPage } from 'next'
import { Fragment } from 'react'
import { CollectionType } from '../../types/collectionTypes'
import setParams from '../../utils/params'
import useCollection from '../../hooks/useCollection'
import useMounted from '../../hooks/useMounted'
import { Box } from '../../components/Box/Box'
import { Text } from '../../components/Text/Text'
import { TitleAndMetaTags } from '../../components/TitleAndMetaTags/TitleAndMetaTags'
import useTranslation from 'next-translate/useTranslation'

const API_BASE = process.env.NEXT_PUBLIC_API_BASE

type Props = InferGetStaticPropsType<typeof getStaticProps>

const CollectionPage: NextPage<Props> = ({
    fallbackCollection,
    slug
}) => {
    const { t } = useTranslation('common')
    const collection = useCollection(fallbackCollection, slug)
    const { mounted } = useMounted()
    
    return (
        <Fragment>
            <TitleAndMetaTags 
                title='Collection | OpenFish'
            />

            <Box
                as='main'
            >
                <Text
                    as='h1'
                >
                    {t('pageOfCollection')} {mounted && collection?.data?.name}
                </Text>
            </Box>
        </Fragment>
    )
}

export default CollectionPage

export const getStaticPaths: GetStaticPaths = () => {
    return {
        paths: [],
        fallback: 'blocking',
    }
  }
  
export const getStaticProps: GetStaticProps<{
    fallbackCollection: CollectionType
    slug: string
}> = async ({ params }) => {
    try {
        const slug = params?.slug?.toString()
    
        if (!slug) {
            return {
                notFound: true,
            }
        }
    
        const options: RequestInit | undefined = {}

        const url = new URL(`/api/v1/collection/${slug}/`, API_BASE)

        const query = {}
    
        const href = setParams(url, query)
    
        const res = await fetch(href, options)
    
        const fallbackCollection = (await res.json()) as CollectionType
    
        if (!fallbackCollection) {
        return {
            notFound: true,
        }
        }
    
        return {
            props: { 
                fallbackCollection,
                slug
            }
        }
    } catch {
        return {
            notFound: true
        }
    }
}