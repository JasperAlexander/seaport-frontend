import type { NextPage } from 'next'
import Head from 'next/head'
import React, { useState } from 'react'
import { Orders } from '../components/Orders/Orders'
import { useAccount } from 'wagmi'
import { Text } from '../components/Text/Text'
import { Box } from '../components/Box/Box'
import { Input } from '../components/Input/Input'
import { touchableStyles } from '../styles/touchableStyles'

const Home: NextPage = () => {
  const { address } = useAccount()

  const [isLoadingDOM, setIsLoadingDOM] = React.useState(true)

  React.useEffect(() => {
      setIsLoadingDOM(false)
  }, [])

  const [inputState, setInputState] = useState({
    sort: '',
  })

const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputState({
        ...inputState,
        [e.target.name]: e.target.value
    })
}

  return (
    <React.Fragment>
      <Head>
        <title>Seaport implementation</title>
        <meta name="description" content='An example implementation of the Seaport marketplace protocol for educational purpose.' />
        <link rel="icon" href='/favicon.ico' />
      </Head>

      <main>
        <Box 
          display='flex' 
          flexDirection='column' 
          gap='24' 
          padding='32'
        >
          <Box display='flex' justifyContent='space-between' alignItems='center' flexWrap='wrap' gap='12'>
            <Text as='h1' size='32' weight='bold'>Explore</Text>
            {!isLoadingDOM ?
            <Input 
              type='select'
              name='sort' 
              value={inputState.sort} 
              onChange={handleInputChange} 
              options={['Recently listed', 'Recently created']}
              className={touchableStyles({ hoverBorderColor: 'gray', focusBorderColor: 'gray' })}
            />
            : ''}
          </Box>
          {isLoadingDOM
            ? ''
            : <Orders filter={order => order.meta.NFTcreator !== address} />
          }
        </Box>
      </main>
    </React.Fragment>
  )
}

export default Home
