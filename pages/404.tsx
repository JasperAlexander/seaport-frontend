import { Box } from '../components/Box/Box'
import { MainButton } from '../components/Buttons/MainButton/MainButton'
import { Text } from '../components/Text/Text'
import useTranslation from 'next-translate/useTranslation'

export default function Custom404() {
    const { t } = useTranslation('common')

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
                {t('404Title')}
            </Text>
            <Box
                textAlign='center'
                marginY='24'
            >
                <Text
                    fontSize='24'
                    color='boxText'
                >
                    {t('404Description')}
                </Text>
            </Box>
            <MainButton
                href='/'
            >
                {t('backToHome')}
            </MainButton>
        </Box>

    )
}