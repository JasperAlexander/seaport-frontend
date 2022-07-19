import Link from 'next/link'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { Box } from '../Box/Box'
import { isMobile } from '../../utils/isMobile'
import { Logo } from '../Icons/Logo'

export const Header: React.FC = () => {
  const mobile = isMobile()

  return (
    <Box 
      as='header' 
      background='white'
      boxShadow='defaultSmall'
      position='relative'
    >
      <Box 
        as='nav' 
        display='flex' 
        justifyContent='space-between' 
        alignItems='center'
        flexWrap='wrap'
        gap='18'
        fontWeight='bold'
      >
        <Box 
          as='section'
          display='flex'
          justifyContent='center'
          textAlign='center'
          paddingY='20'
          paddingX='28'
          flexGrow={isMobile() ? '1' : '0'}
        >
          <Link href='/'>
            <a style={{fontSize: '20px', display: 'flex', alignItems: 'center'}}>
              <Logo />
              Seaport implementation
            </a>
          </Link>
        </Box>
        <Box 
          as='section'
          display='flex'
          alignItems='center'
          flexWrap='wrap'
          justifyContent='center'
          gap='24'
          paddingY='20'
          paddingX='28'
        >
          {/* Using LinkButton is not working, don't know why */}
          <Link href='/faucet'>
            <a>Faucet</a>
          </Link>
          <Link href='/create'>
            <a>Create NFT</a>
          </Link>
          <Link href='/profile'>
              <a>Profile</a>
          </Link>
          <ConnectButton />
        </Box>
      </Box>
    </Box>
    // <header>
    //   <nav>
    //     <section>
    //         <Link href='/'>
    //             <a>Seaport implementation</a>
    //         </Link>
    //     </section>
    //     <section>
    //         <Link href='/faucet'>
    //             <a>Faucet</a>
    //         </Link>
    //         <Link href='/create'>
    //             <a>Create NFT</a>
    //         </Link>
    //         <Link href='/profile'>
    //             <a>Profile</a>
    //         </Link>
    //         <ConnectButton />
    //     </section>
    //   </nav>
    // </header>
  )
}
