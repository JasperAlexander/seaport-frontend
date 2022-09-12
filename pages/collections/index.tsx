import type { NextPage } from 'next'
import { Fragment } from 'react'
import { Box } from '../../components/Box/Box'
import { MainButton } from '../../components/Buttons/MainButton'
import { MoreHorizontalIcon } from '../../components/Icons/MoreHorizontalIcon'
import { Text } from '../../components/Text/Text'
import { TitleAndMetaTags } from '../../components/TitleAndMetaTags/TitleAndMetaTags'

const CollectionsPage: NextPage = () => {
    return (
        <Fragment>
            <TitleAndMetaTags 
                title='My Collections | OpenFish'
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
                <Box
                    display='flex'
                    gap='16'
                >
                    <MainButton 
                        href='/collection/create'
                    >
                        Create a collection
                    </MainButton>
                    {/* Should be a dropdown */}
                    <MainButton
                        variant='secondary'
                        size='small'
                    >
                        <MoreHorizontalIcon />
                    </MainButton>
                </Box>
            </Box>
        </Fragment>
    )
}

export default CollectionsPage
