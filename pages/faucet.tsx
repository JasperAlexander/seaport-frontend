import type { NextPage } from 'next'
import Head from 'next/head'
import React from 'react'
import { mintERC20 /* , mintERC721 */ } from '../utils/minting'

const Faucet: NextPage = () => {
    const [inputState, setInputState] = React.useState({
        ERC20mintAmount: '',
        // ERC721nftID: ''
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
            <title>Faucet | Seaport implementation</title>
            <meta name="description" content="An example of how to implement the Seaport marketplace protocol." />
            <link rel="icon" href="/favicon.ico" />
        </Head>

        <main>
            <h1>Faucet</h1>

            <label>ERC20 token amount to be minted</label>
            <input type='number' name='ERC20mintAmount' value={inputState.ERC20mintAmount} onChange={handleInputChange} />
            <button type='button' onClick={() => { 
                inputState.ERC20mintAmount !== '' 
                ? mintERC20(inputState.ERC20mintAmount) 
                : console.log('No mint amount specified') 
            }}>Mint ERC20</button>
           
            {/* <label>ERC721 NFT ID to be minted</label>
            <input type='number' name='ERC721nftID' value={inputState.ERC721nftID} onChange={handleInputChange} />
            <button type='button' onClick={() => mintERC721(inputState.ERC721nftID)}>Mint ERC721</button> */}
        </main>
        </React.Fragment>
    )
}

export default Faucet
