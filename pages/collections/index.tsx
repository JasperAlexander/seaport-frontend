import type { NextPage } from 'next'
import { Fragment } from 'react'
import { Box } from '../../components/Box/Box'
import { MainButton } from '../../components/Buttons/MainButton'
import { Text } from '../../components/Text/Text'
import { TitleAndMetaTags } from '../../components/TitleAndMetaTags/TitleAndMetaTags'

const CollectionsPage: NextPage = () => {
    return (
        <Fragment>
            <TitleAndMetaTags 
                title={'My Collections | OpenFish'}
            />

            <Box
                as='main'
                display='flex'
                flexDirection='column'
                padding='24'
                gap='16'
            >
                <Box
                    marginTop='24'
                >
                    <Text
                        as='h1'
                        fontSize='40'
                        fontWeight='600'
                    >
                        My collections
                    </Text>
                </Box>
                <Text
                    as='p'
                >
                    Create, curate, and manage collections of unique NFTs to share and sell.
                </Text>
                <Box>
                    <MainButton 
                        href='/collection/create'
                    >
                        Create a collection
                    </MainButton>
                </Box>
            </Box>
        </Fragment>
    )
}

export default CollectionsPage
