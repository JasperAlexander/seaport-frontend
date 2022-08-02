import type { NextPage } from 'next'
import Head from 'next/head'
import React, { Fragment, useEffect, useState } from 'react'
import { AssetsLayout } from '../components/Layouts/AssetsLayout'
import { Box } from '../components/Box/Box'

const Home: NextPage = () => {
  const [isLoadingDOM, setIsLoadingDOM] = useState(true)

  useEffect(() => {
      setIsLoadingDOM(false)
  }, [])

  return (
    <Fragment>
      <Head>
        <title>Seaport implementation</title>
        <meta name="description" content='An example implementation of the Seaport marketplace protocol for educational purpose.' />
        <link rel="icon" href='/favicon.ico' />
      </Head>

      <main>
        <Box 
          display='flex' 
          flexDirection='column' 
          // id='stickyroot'
          // position='absolute'
          // top='72'
        >
          {isLoadingDOM
            ? ''
            : <AssetsLayout displayFilters={true} />
          }
        </Box>
      </main>
    </Fragment>
  )
}

export default Home
