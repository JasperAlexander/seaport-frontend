import type { NextPage } from 'next'
import Head from 'next/head'
import { ChangeEvent, Fragment, useState } from 'react'
import { mintERC20 , mintERC721 } from '../utils/minting'
import { useAccount, useSigner } from 'wagmi'
import { toast } from 'react-hot-toast'
import { Box } from '../components/Box/Box'
import { Input } from '../components/Input/Input'
import useMounted from '../hooks/useMounted'
import { MainLayout } from '../components/Layouts/MainLayout'
import { MainButton } from '../components/Buttons/MainButton'

const FaucetPage: NextPage = () => {
    const { address } = useAccount()
    const { data: signer } = useSigner()

    const [inputState, setInputState] = useState({
        ERC20mintAmount: '',
        ERC721nftID: ''
    })

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInputState({
            ...inputState,
            [e.target.name]: e.target.value
        })
    }

    const { mounted } = useMounted()
    
    return (
        <Fragment>
            <Head>
                <title>Faucet | Seaport implementation</title>
                <meta name="description" content="An example of how to implement the Seaport marketplace protocol." />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <MainLayout>
                <Box display='flex' flexDirection='column' alignItems='flex-start' padding='44'>
                    <Box as='h1' color='black' fontWeight='700' fontSize='32'>Faucet</Box>
                    <Box marginTop='18' display='flex' flexDirection='column' gap='12'>
                        <Box as='p' color='black' fontWeight='700'>ERC20 token amount to be minted</Box>
                        <Input 
                            type='number'
                            name='ERC20mintAmount' 
                            value={inputState.ERC20mintAmount} 
                            onChange={handleInputChange} 
                        />
                        <MainButton
                            onClick={() => { 
                                if(inputState.ERC20mintAmount === '') {
                                    toast('Enter an amount')
                                } else if (
                                    mounted &&
                                    inputState.ERC20mintAmount !== ''  && 
                                    typeof address !== 'undefined' && 
                                    typeof signer !== 'undefined' && 
                                    signer !== null
                                ) {
                                    mintERC20(signer, address, inputState.ERC20mintAmount)
                                }
                            }}
                        >
                            Mint ERC20
                        </MainButton>
                    </Box>
                </Box>

                <label>ERC721 NFT ID to be minted</label>
                <input type='number' name='ERC721nftID' value={inputState.ERC721nftID} onChange={handleInputChange} />
                <button type='button' onClick={() => {
                    if(typeof signer !== 'undefined' && signer !== null && typeof address !== 'undefined')
                        mintERC721(signer, address, inputState.ERC721nftID)
                }}>Mint ERC721</button>
            </MainLayout>
        </Fragment>
    )
}

export default FaucetPage
