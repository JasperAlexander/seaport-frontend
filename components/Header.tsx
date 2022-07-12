import Link from 'next/link'

export const Header: React.FC = () => {
  return (
    <header>
      <nav>
        <section>
            <Link href='/'>
                <a>Seaport implementation</a>
            </Link>
        </section>
        <section>
            <Link href='/faucet'>
                <a>Faucet</a>
            </Link>
            <Link href='/create'>
                <a>Create NFT</a>
            </Link>
        </section>
      </nav>
    </header>
  )
}
