import { useRouter } from 'next/router'
import { Box } from '../components/Box/Box'
import { MainButton } from '../components/Buttons/MainButton'

export default function Custom404() {
    const router = useRouter()

    return (
        <Box
            display='flex'
            flexDirection='column'
            justifyContent='center'
            alignItems='center'
            style={{width: '80%'}}
            marginY='30'
            marginX='auto'
        >
            <Box
                as='h1'
                fontWeight='600'
                fontSize='40'
            >
                Oops, something went wrong
            </Box>
            <Box
                fontWeight='400'
                fontSize='24'
                color='boxText'
                textAlign='center'
                marginY='24'
            >
                Yikes, looks like something went wrong on our end. If the issue persists, please shoot us a note so we can help out.
            </Box>
            <MainButton
                href='/'
            >
                Try going back to homepage
            </MainButton>
        </Box>

    )
}