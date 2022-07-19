import type { NextPage } from 'next'
import Head from 'next/head'
import React, { useState, useEffect } from 'react'
import { mintERC20 /* , mintERC721 */ } from '../utils/minting'
import { useAccount, useSigner } from 'wagmi'
import { toast } from 'react-hot-toast'
import { Button } from '../components/Buttons/Button'
import { Text } from '../components/Text/Text'
import { Box } from '../components/Box/Box'
import { touchableStyles } from '../styles/touchableStyles'
import { Input } from '../components/Input/Input'

const Faucet: NextPage = () => {
    const { address } = useAccount()
    const { data: signer } = useSigner()

    const [inputState, setInputState] = useState({
        ERC20mintAmount: '',
        // ERC721nftID: ''
    })

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputState({
            ...inputState,
            [e.target.name]: e.target.value
        })
    }

    const [isLoadingDOM, setIsLoadingDOM] = useState(true)

    useEffect(() => {
        setIsLoadingDOM(false)
    }, [])
    
    return (
        <React.Fragment>
        <Head>
            <title>Faucet | Seaport implementation</title>
            <meta name="description" content="An example of how to implement the Seaport marketplace protocol." />
            <link rel="icon" href="/favicon.ico" />
        </Head>

        <main>
            <Box display='flex' flexDirection='column' alignItems='flex-start' padding='44'>
                <Text as='h1' color='black' weight='bold' size='32'>Faucet</Text>
                <Box marginTop='18' display='flex' flexDirection='column' gap='12'>
                    <Text as='p' color='black' weight='bold'>ERC20 token amount to be minted</Text>
                    <Input 
                        type='number'
                        name='ERC20mintAmount' 
                        value={inputState.ERC20mintAmount} 
                        onChange={handleInputChange} 
                        className={touchableStyles({ hoverBorderColor: 'gray', focusBorderColor: 'gray' })}
                    />
                    <Button
                        label='Mint ERC20'
                        onClick={() => { 
                            if(inputState.ERC20mintAmount === '') {
                                toast('Enter an amount')
                            } else if (
                                !isLoadingDOM &&
                                inputState.ERC20mintAmount !== ''  && 
                                typeof address !== 'undefined' && 
                                typeof signer !== 'undefined' && 
                                signer !== null
                            ) {
                                mintERC20(signer, address, inputState.ERC20mintAmount)
                            }
                        }}
                    />
                </Box>
            </Box>
           
            {/* <label>ERC721 NFT ID to be minted</label>
            <input type='number' name='ERC721nftID' value={inputState.ERC721nftID} onChange={handleInputChange} />
            <button type='button' onClick={() => mintERC721(inputState.ERC721nftID)}>Mint ERC721</button> */}
        </main>
        </React.Fragment>
    )
}

export default Faucet
