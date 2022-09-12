import { Component, ErrorInfo, ReactNode } from 'react'
import { Box } from '../Box/Box'
import { MainButton } from '../Buttons/MainButton'
import { Text } from '../Text/Text'

interface Props {
  children?: ReactNode
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

    return this.props.children
  }
}

export default ErrorBoundary