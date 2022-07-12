import type { NextPage } from 'next'
import Head from 'next/head'
import React from 'react'
import { useStore } from '../hooks/useStore'
import { useRouter } from 'next/router'
import { randomBN } from '../utils/encoding'
import { ethers } from 'ethers'

const Create: NextPage = () => {
    const { addOrder } = useStore()
    const router = useRouter()

    const [signerAddress, setSignerAddress] = React.useState<string | undefined>(undefined)
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
  
    if(typeof window !== 'undefined') {
        (window as any).ethereum.request({ method: 'eth_requestAccounts' });
        const web3provider = new ethers.providers.Web3Provider((window as any).ethereum);
        const signer = web3provider.getSigner()
        signer.getAddress().then((a) => setSignerAddress(a))
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

            <button type='button' onClick={() => { inputState.NFTname 
                ? ( 
                    addOrder(
                        randomBN().toString(), 
                        inputState.NFTname, 
                        inputState.NFTdescription,
                        inputState.NFTimage,
                        signerAddress
                    ), 
                    router.push('/') 
                )
                : console.log('No name found') 
            }}>Create NFT</button>
        </main>
        </React.Fragment>
    )
}

export default Create
