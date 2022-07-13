import type { NextPage } from 'next'
import Head from 'next/head'
import React from 'react'
import { useStore } from '../hooks/useStore'
import { useRouter } from 'next/router'
import { randomBN } from '../utils/encoding'
import { useAccount } from 'wagmi'
import toast from 'react-hot-toast'

const Create: NextPage = () => {
    const { addOrder } = useStore()
    const router = useRouter()
    const { address, isConnected } = useAccount()

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
    
    return (
        <React.Fragment>
        <Head>
            <title>Create NFT | Seaport implementation</title>
            <meta name="description" content="An example of how to implement the Seaport marketplace protocol." />
            <link rel="icon" href="/favicon.ico" />
        </Head>

        <main>
            <h1>Create NFT</h1>

            <label>Name</label>
            <input type='text' name='NFTname' value={inputState.NFTname} onChange={handleInputChange} />
            
            <label>Description</label>
            <input type='text' name='NFTdescription' value={inputState.NFTdescription} onChange={handleInputChange} />

            <label>Image</label>
            <input type='file' accept='image/png, image/jpeg' name='NFTimage' multiple={false} onChange={handleInputChange} />

            <button type='button' onClick={() => { isConnected && inputState.NFTname 
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
            }}>Create NFT</button>
        </main>
        </React.Fragment>
    )
}

export default Create
