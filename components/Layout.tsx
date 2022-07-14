import { Toaster } from 'react-hot-toast'
import { Header } from './Header'

type Props = {
    children: React.ReactNode
}

export const Layout: React.FC<Props> = ({ children }: Props) => {
    return (
        <div>
            <Toaster 
                position='bottom-right'
            />
            <Header />
            { children }
        </div>
    )
}
  