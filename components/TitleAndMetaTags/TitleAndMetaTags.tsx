import Head from 'next/head'
import { useRouter } from 'next/router'
import { FC } from 'react'

interface Props {
    description?: string
    pathname?: string
    title?: string
    url?: string
    color?: string
}

export const TitleAndMetaTags: FC<Props> = ({
    color = 'white',
    description = 'An example implementation of the Seaport marketplace protocol for educational purpose.',
    pathname,
    title = 'OpenFish',
    url = 'https://github.com/JasperAlexander/seaport-frontend',
}) => {
    const router = useRouter()

    const path = pathname || router.pathname

    return (
        <Head>
            <title>{title}</title>

            <meta content={description} name="description" />

            <meta content={`${url}${path}`} property="og:url" />
            <meta content={title} property="og:title" />
            <meta content={description} property="og:description" />

            <meta content="@JasperAlexandr" name="twitter:site" />
            <meta content="summary_large_image" name="twitter:card" />

            <link href="/favicon.ico" rel="shortcut icon" type="image/x-icon" />

            <meta content={color} name="theme-color" />
        </Head>
    )
}