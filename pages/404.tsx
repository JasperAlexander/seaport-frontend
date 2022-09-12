import { Box } from '../components/Box/Box'
import { MainButton } from '../components/Buttons/MainButton'
import { Text } from '../components/Text/Text'

export default function Custom404() {
    return (
        <Box
            display='flex'
            flexDirection='column'
            justifyContent='center'
            alignItems='center'
            textAlign='center'
            style={{width: '80%', minHeight: 'calc(100vh - 132px)'}}
            marginY='30'
            marginX='auto'
        >
            <Text
                as='h1'
                fontWeight='600'
                fontSize='40'
            >
                Oops, something went wrong
            </Text>
            <Box
                textAlign='center'
                marginY='24'
            >
                <Text
                    fontSize='24'
                    color='boxText'
                >
                    Yikes, looks like something went wrong on our end. If the issue persists, please shoot us a note so we can help out.
                </Text>
            </Box>
            <MainButton
                href='/'
            >
                Try going back to the homepage
            </MainButton>
        </Box>

    )
}