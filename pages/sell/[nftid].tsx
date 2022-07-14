import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import Head from 'next/head'
import React from 'react'
import { useStore } from '../../hooks/useStore'
import { Seaport } from '@opensea/seaport-js'
import { ethers } from 'ethers'
import { parseEther } from 'ethers/lib/utils'
import { ItemType } from '../../types/orderTypes'
import { mintERC721 , ownerOfERC721 } from '../../utils/minting'
import { useAccount, useSigner } from 'wagmi'
import toast from 'react-hot-toast'

const contractAddresses = require('../../utils/contractAddresses.json')

const Sell: NextPage = () => {
    const { updateOrder, seaport, setSeaport } = useStore()
    const { address, isConnected } = useAccount()
    const { data: signer } = useSigner()

    const router = useRouter()
    const { nftid } = router.query

    const [inputState, setInputState] = React.useState({
        price: ''
    })

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputState({
            ...inputState,
            [e.target.name]: e.target.value
        })
    }

    if(typeof window !== 'undefined' && typeof seaport === 'undefined') {
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
        if(inputState.price === '') {
            toast('Enter a price')
        } else if(
            typeof seaport !== 'undefined' && 
            typeof nftid === 'string' && 
            typeof signer !== 'undefined' &&
            typeof address !== 'undefined' &&
            inputState.price !== '' &&
            signer !== null
        ) {
            const owner = await ownerOfERC721(signer, nftid)
            let nftID
            if(typeof owner === 'undefined') {
                nftID = await mintERC721(signer, address, nftid)
            } else {
                nftID = nftid
            }

            if(typeof nftID !== 'undefined' && typeof address !== 'undefined') {
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
                        recipient: address
                    }
                    ]
                })

                const executedOrder = await executeAllActions()
                updateOrder(nftID, executedOrder)
                router.push('/profile')
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
            <input type='number' min='0' name='price' value={inputState.price} onChange={handleInputChange} />
            
            <button type='button' onClick={() => sell()}>Sell</button>
        </main>
        </React.Fragment>
    )
}

export default Sell
