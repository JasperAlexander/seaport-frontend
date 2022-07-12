import { Header } from "./Header"

type Props = {
    children: React.ReactNode
}

export const Layout: React.FC<Props> = ({ children }: Props) => {
    return (
        <div>
            <Header />
            { children }
        </div>
    )
}
  