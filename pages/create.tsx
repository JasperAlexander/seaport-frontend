import type { NextPage } from 'next'
import Head from 'next/head'
import React from 'react'
import { useStore } from '../hooks/useStore'
import { useRouter } from 'next/router'
import { randomBN } from '../utils/encoding'
import { useAccount } from 'wagmi'
import toast from 'react-hot-toast'
import { Button } from '../components/Buttons/Button'
import { Text } from '../components/Text/Text'
import { Box } from '../components/Box/Box'
import { touchableStyles } from '../styles/touchableStyles'
import { Input } from '../components/Input/Input'

const Create: NextPage = () => {
    const { addOrder } = useStore()
    const router = useRouter()
    const { address } = useAccount()

    const [inputState, setInputState] = React.useState({
        NFTname: '',
        NFTdescription: '',
        NFTimage: undefined
    })

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.files) {
            setInputState({
                ...inputState,
                [e.target.name]: e.target.files[0]
            })
        } else {
            setInputState({
                ...inputState,
                [e.target.name]: e.target.value
            })
        }
    }

    const [isLoadingDOM, setIsLoadingDOM] = React.useState(true)

    React.useEffect(() => {
        setIsLoadingDOM(false)
    }, [])
    
    return (
        <React.Fragment>
        <Head>
            <title>Create NFT | Seaport implementation</title>
            <meta name="description" content="An example of how to implement the Seaport marketplace protocol." />
            <link rel="icon" href="/favicon.ico" />
        </Head>

        <main>
            <Box padding='44'>
            {/* <h1>Create NFT</h1> */}
            <Text as='h1' size='32' weight='bold'>Create NFT</Text>

            <Box display='flex' flexDirection='column' gap='12' alignItems='flex-start' marginTop='18'>
                <Text as='label' weight='bold'>Name</Text>
                {/* <input type='text' name='NFTname' value={inputState.NFTname} onChange={handleInputChange} /> */}
                {/* <Box 
                    as='input' 
                    type='text'
                    name='NFTname' 
                    value={inputState.NFTname} 
                    onChange={handleInputChange} 
                    borderWidth='2'
                    borderColor='defaultBackgroundBorder'
                    borderStyle='solid'
                    borderRadius='10'
                    padding='10'
                    background='defaultBackground'
                    className={touchableStyles({ hoverBorderColor: 'gray', focusBorderColor: 'gray' })}
                /> */}
                <Input 
                    type='text'
                    name='NFTname' 
                    value={inputState.NFTname} 
                    onChange={handleInputChange} 
                    // className={touchableStyles({ hoverBorderColor: 'gray', focusBorderColor: 'gray' })}
                />

                <Text as='label' weight='bold'>Description</Text>
                {/* <input type='text' name='NFTdescription' value={inputState.NFTdescription} onChange={handleInputChange} /> */}
                <Box 
                    as='input' 
                    type='text'
                    name='NFTdescription' 
                    value={inputState.NFTdescription} 
                    onChange={handleInputChange} 
                    borderWidth='2'
                    borderColor='defaultBackgroundBorder'
                    borderStyle='solid'
                    borderRadius='10'
                    padding='10'
                    background='defaultBackground'
                    className={touchableStyles({ hoverBorderColor: 'gray', focusBorderColor: 'gray' })}
                />

                <Text as='label' weight='bold'>Image</Text>
                {/* <input type='file' accept='image/png, image/jpeg' name='NFTimage' multiple={false} onChange={handleInputChange} /> */}
                <Box 
                    as='input' 
                    type='file'
                    accept='image/png, image/jpeg'
                    multiple={false}
                    name='NFTimage' 
                    onChange={handleInputChange} 
                    borderWidth='2'
                    borderColor='defaultBackgroundBorder'
                    borderStyle='solid'
                    borderRadius='10'
                    padding='10'
                    background='defaultBackground'
                    className={touchableStyles({ hoverBorderColor: 'gray', focusBorderColor: 'gray' })}
                />

                <Button
                    label='Create NFT'
                    onClick={() => { !isLoadingDOM && inputState.NFTname 
                        ? ( 
                            addOrder(
                                randomBN().toString(), 
                                inputState.NFTname, 
                                inputState.NFTdescription,
                                inputState.NFTimage,
                                address
                            ), 
                            router.push('/profile') 
                        )
                        : toast('Enter a name') 
                    }}
                />
            </Box>
            </Box>
        </main>
        </React.Fragment>
    )
}

export default Create
