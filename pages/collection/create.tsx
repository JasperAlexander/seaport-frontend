import type { NextPage } from 'next'
import Head from 'next/head'
import { useState, Fragment } from 'react'
import { Box } from '../../components/Box/Box'
import { Input } from '../../components/Input/Input'
import { CreateCollectionButton } from '../../components/Buttons/CreateCollectionButton'
import { CollectionInputType } from '../../types/collectionTypes'

const CreateCollectionPage: NextPage = () => {
    const [inputState, setInputState] = useState<CollectionInputType>({
        name: '',
        description: '',
        slug: '',
        banner_image_url: '',
        image_url: '',
        external_url: '',
        twitter_username: '',
        instagram_username: '',
        medium_username: '',
        is_nsfw: false,
        payment_tokens: null
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
        <Fragment>
            <Head>
                <title>Create Collection | Seaport implementation</title>
                <meta name="description" content="An example of how to implement the Seaport marketplace protocol." />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Box
                as='main'
            >
                test
                {/* <Box padding='44'>
                    <Box as='h1' size='32' weight='700'>Create Collection</Text>

                    <Box display='flex' flexDirection='column' gap='12' alignItems='flex-start' marginTop='18'>
                        <Text as='label' weight='700'>Name</Text>
                        <Input 
                            type='text'
                            name='name' 
                            value={inputState.name} 
                            onChange={handleInputChange} 
                        />

                        <Text as='label' weight='700'>URL</Text>
                        <Input 
                            type='text'
                            name='external_url' 
                            value={inputState.external_url} 
                            onChange={handleInputChange} 
                        />

                        <Text as='label' weight='700'>Description</Text>
                        <Input 
                            type='text'
                            name='description' 
                            value={inputState.description} 
                            onChange={handleInputChange} 
                        />

                        <CreateCollectionButton inputState={inputState} />
                    </Box>
                </Box> */}
            </Box>
        </Fragment>
    )
}

export default CreateCollectionPage
