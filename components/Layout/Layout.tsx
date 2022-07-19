import { Toaster } from 'react-hot-toast'
import { Header } from '../Header/Header'

type Props = {
    children: React.ReactNode
}

export const Layout: React.FC<Props> = ({ children }: Props) => {
    return (
        <div>
            <Toaster 
                position='bottom-right'
                toastOptions={{
                    style: {
                        zIndex: '21474836471'
                    }
                }}
            />
            <Header />
            { children }
        </div>
    )
}
  