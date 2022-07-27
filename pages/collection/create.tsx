import type { NextPage } from 'next'
import Head from 'next/head'
import { useState, Fragment } from 'react'
import { Text } from '../../components/Text/Text'
import { Box } from '../../components/Box/Box'
import { Input } from '../../components/Input/Input'
import { CreateCollectionButton } from '../../components/Buttons/CreateCollectionButton'

export type CollectionInputState = {
    name: string,
    external_link: string,
    description: string,
    slug: string,
    image_url: string,
    banner_image_url: string,
    dev_seller_fee_basis_points: string,
    safelist_request_status: string,
    payout_address: string,
    primary_asset_contracts: string,
    payment_tokens: string,
    editors: string,
    stats: string
}

const CreateCollection: NextPage = () => {
    const [inputState, setInputState] = useState<CollectionInputState>({
        name: '',
        external_link: '',
        description: '',
        slug: '',
        image_url: '',
        banner_image_url: '',
        dev_seller_fee_basis_points: '',
        safelist_request_status: '',
        payout_address: '',
        primary_asset_contracts: '',
        payment_tokens: '',
        editors: '',
        stats: ''
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
                <Box padding='44'>
                    <Text as='h1' size='32' weight='bold'>Create Collection</Text>

                    <Box display='flex' flexDirection='column' gap='12' alignItems='flex-start' marginTop='18'>
                        <Text as='label' weight='bold'>Name</Text>
                        <Input 
                            type='text'
                            name='name' 
                            value={inputState.name} 
                            onChange={handleInputChange} 
                        />

                        <Text as='label' weight='bold'>URL</Text>
                        <Input 
                            type='text'
                            name='external_link' 
                            value={inputState.external_link} 
                            onChange={handleInputChange} 
                        />

                        <Text as='label' weight='bold'>Description</Text>
                        <Input 
                            type='text'
                            name='description' 
                            value={inputState.description} 
                            onChange={handleInputChange} 
                        />

                        <CreateCollectionButton inputState={inputState} />
                    </Box>
                </Box>
            </Box>
        </Fragment>
    )
}

export default CreateCollection
