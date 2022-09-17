import { Component, ErrorInfo, ReactNode } from 'react'
import { Box } from '../Box/Box'
import { MainButton } from '../Buttons/MainButton/MainButton'
import { Text } from '../Text/Text'
import withTranslation from 'next-translate/withTranslation'
import { I18n } from 'next-translate'

interface Props {
  children?: ReactNode
  i18n: I18n
}

interface State {
  hasError: boolean
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  }

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo)
  }

  public render() {
    const { t } = this.props.i18n

    if (this.state.hasError) {
      return (
        <Box
            display='flex'
            flexDirection='column'
            justifyContent='center'
            alignItems='center'
            style={{width: '80%', minHeight: 'calc(100vh - 132px)'}}
            marginY='30'
            marginX='auto'
            textAlign='center'
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

    return this.props.children
  }
}

export default withTranslation(ErrorBoundary, 'common')