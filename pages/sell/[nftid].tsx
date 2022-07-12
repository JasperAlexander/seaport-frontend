import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import Head from 'next/head'
import React from 'react'
import { useStore } from '../../hooks/useStore'
import { Seaport } from '@opensea/seaport-js'
import { ethers } from 'ethers'
import { parseEther } from 'ethers/lib/utils'
import { ItemType } from '../../types/orderTypes'
import { mintERC721 } from '../../utils/minting'

const contractAddresses = require('../../utils/contractAddresses.json')

const Sell: NextPage = () => {
    const { updateOrder, seaport, setSeaport } = useStore()

    const router = useRouter()
    const { nftid } = router.query

    const [inputState, setInputState] = React.useState({
        price: undefined
    })

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputState({
            ...inputState,
            [e.target.name]: e.target.value
        })
    }

    if(typeof window !== 'undefined' && typeof seaport === 'undefined') {
        (window as any).ethereum.request({ method: 'eth_requestAccounts' });
        const provider = new ethers.providers.Web3Provider((window as any).ethereum);
        const newSeaport = new Seaport(
            provider, {
                overrides: {
                    contractAddress: contractAddresses.Seaport
                }
            }
        )
        setSeaport(newSeaport)
        console.log('Seaport initialised')
    }

    const sell = async() => {
        if(
            typeof seaport !== 'undefined' && 
            typeof nftid === 'string' && 
            typeof inputState.price !== 'undefined'
        ) {
            await (window as any).ethereum.request({ method: 'eth_requestAccounts' });
            const web3provider = new ethers.providers.Web3Provider((window as any).ethereum);
            const signer = web3provider.getSigner()
            const signerAddress = await signer.getAddress()
            
            const nftID = await mintERC721(nftid)

            if(typeof nftID !== 'undefined') {
                const { executeAllActions } = await seaport.createOrder({
                    offer: [
                    {
                        itemType: ItemType.ERC721,
                        token: contractAddresses.TestERC721,
                        identifier: nftID
                    }
                    ],
                    consideration: [
                    {
                        amount: parseEther(inputState.price).toString(),
                        token: contractAddresses.TestERC20,
                        recipient: signerAddress
                    }
                    ]
                })

                const executedOrder = await executeAllActions()
                updateOrder(nftid, executedOrder)
                router.push('/')
            }
        }
    }
    
    return (
        <React.Fragment>
        <Head>
            <title>List NFT | Seaport implementation</title>
            <meta name="description" content="An example of how to implement the Seaport marketplace protocol." />
            <link rel="icon" href="/favicon.ico" />
        </Head>

        <main>
            <h1>List NFT for sale</h1>

            <label>Price</label>
            <input type='text' name='price' value={inputState.price} onChange={handleInputChange} />
            
            <button type='button' onClick={() => sell()}>Sell</button>
        </main>
        </React.Fragment>
    )
}

export default Sell
