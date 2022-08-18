import type { GetStaticPaths, GetStaticProps, InferGetStaticPropsType, NextPage } from 'next'
import Head from 'next/head'
import { Fragment } from 'react'
import { CollectionType } from '../../types/collectionTypes'
import setParams from '../../utils/params'
import useCollection from '../../hooks/useCollection'
import useMounted from '../../hooks/useMounted'

type Props = InferGetStaticPropsType<typeof getStaticProps>

const CollectionPage: NextPage<Props> = ({
    fallbackCollection,
    slug
}) => {
    const collection = useCollection(fallbackCollection, slug)
    const { mounted } = useMounted()
    
    return (
        <Fragment>
        <Head>
            <title>Collection | Seaport implementation</title>
            <meta name="description" content="An example of how to implement the Seaport marketplace protocol." />
            <link rel="icon" href="/favicon.ico" />
        </Head>

        <main>
            <h1>Page of collection {mounted && collection?.data?.name}</h1>
        </main>
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
    const slug = params?.slug?.toString()
  
    if (!slug) {
        return {
            notFound: true,
        }
    }
  
    const options: RequestInit | undefined = {}

    const url = new URL(`/api/v1/collection/${slug}/`, 'http://localhost:8000')

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
}