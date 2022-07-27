import type { NextPage } from 'next'
import Head from 'next/head'
import { useState, Fragment, useRef } from 'react'
import { Text } from '../components/Text/Text'
import { Box } from '../components/Box/Box'
import { Input } from '../components/Input/Input'
import { CreateAssetButton } from '../components/Buttons/CreateAssetButton'
import { ImageIcon } from '../components/Icons/Image'
import { CloseMenu } from '../components/Icons/CloseMenu'
import { sprinkles } from '../styles/sprinkles.css'

export type AssetContractType = {
    address: string
    name: string
    symbol: string
    image_url: string
    description: string
    external_link: string
}

export type AssetInputState = {
    image_url: File | undefined,
    background_color: string,
    name: string,
    description: string,
    external_link: string,
    asset_contract: AssetContractType,
    owner: string,
}

const CreateAsset: NextPage = () => {
    const [inputState, setInputState] = useState<AssetInputState>({
        image_url: undefined,
        background_color: '',
        name: '',
        description: '',
        external_link: '',
        asset_contract: {
            address: '',
            name: '',
            symbol: '',
            image_url: '',
            description: '',
            external_link: ''
        },
        owner: ''
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

    const hiddenFileInput = useRef<HTMLInputElement>(null)
    const handleClick = () => {
        if (hiddenFileInput && hiddenFileInput.current)
            hiddenFileInput.current.click()
    }
    
    return (
        <Fragment>
            <Head>
                <title>Create Asset | Seaport implementation</title>
                <meta name="description" content="An example of how to implement the Seaport marketplace protocol." />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Box
                as='main'
            >
                <Box 
                    display='flex'
                    flexDirection='column'
                    padding='44'
                    alignItems='center'
                >
                    <Box 
                        display='flex' 
                        flexDirection='column' 
                        width='full'
                        gap='18' 
                        marginTop='18'
                        maxWidth='772'
                    >
                        <Box
                            as='h1'
                            fontSize='40'
                            fontWeight='semibold'
                            marginBottom='10'
                        >
                            Create Asset
                        </Box>
                        <Text as='label' weight='bold'>Image</Text>
                        <Box 
                            cursor='pointer'
                            borderWidth='3'
                            borderStyle='dashed'
                            borderColor='box'
                            padding='4'
                            borderRadius='10'
                            width='330'
                            height='330'
                            display='flex'
                            alignItems='center'
                            justifyContent='center'
                            onClick={handleClick}
                            
                        >
                            <Box
                                display='flex'
                                alignItems='center'
                                justifyContent='center'
                                position='relative'
                                width='full'
                                height='full'
                                style={{
                                    backgroundImage: inputState.image_url 
                                        ? `url(${URL.createObjectURL(inputState.image_url)}` 
                                        : '',
                                    backgroundSize: 'cover'
                                }}
                            >
                                <Box
                                    as='button'
                                    onClick={() => setInputState({...inputState, image_url: undefined})}
                                    display={inputState.image_url ? 'flex' : 'none'}
                                    position='absolute'
                                    right='20'
                                    top='20'
                                    zIndex='1'
                                >
                                    <CloseMenu width='24' color='rgb(229, 232, 235)' />
                                </Box>
                                <Box
                                    display='flex'
                                    opacity={inputState.image_url ? '0' : '1'}
                                    width='full'
                                    height='full'
                                    alignItems='center'
                                    justifyContent='center'
                                    className={sprinkles({
                                        opacity: {
                                            hover: '1'
                                        }
                                    })}
                                >
                                    <ImageIcon width='120' color='rgb(229, 232, 235)' />
                                </Box>
                            </Box>
                            <Box
                                as='input' 
                                ref={hiddenFileInput}
                                display='none'
                                type='file'
                                name='image_url' 
                                onChange={handleInputChange} 
                            />
                        </Box>
                        
                        <Text as='label' weight='bold'>Name</Text>
                        <Input 
                            type='text'
                            name='name' 
                            placeholder='Asset name'
                            value={inputState.name} 
                            onChange={handleInputChange} 
                        />

                        <Text as='label' weight='bold'>Description</Text>
                        <Input 
                            type='text'
                            name='description' 
                            placeholder='Provide a detailed description of your item.'
                            value={inputState.description} 
                            onChange={handleInputChange} 
                        />

                        <Text as='label' weight='bold'>URL</Text>
                        <Input 
                            type='text'
                            name='external_link' 
                            placeholder='https://yoursite.io/item/123'
                            value={inputState.external_link} 
                            onChange={handleInputChange} 
                        />


                        <CreateAssetButton inputState={inputState} />
                    </Box>
                </Box>
            </Box>
        </Fragment>
    )
}

export default CreateAsset
