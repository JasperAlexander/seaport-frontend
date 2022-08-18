import { FC } from 'react'
import Link from 'next/link'
import { Box } from '../Box/Box'
import { isMobile } from '../../utils/isMobile'
import { Logo } from '../Icons/Logo'
import { sprinkles } from '../../styles/sprinkles.css'
import { MenuIcon } from '../Icons/MenuIcon'
import { useSidebars } from '../../hooks/useSidebars'
import { CustomConnectButton } from '../Buttons/CustomConnectButton'
import { CloseIcon } from '../Icons/CloseIcon'

export const MenuHeader: FC = () => {
  const { isMenuSidebarOpen, toggleMenuSidebar } = useSidebars()

  return (
    <Box 
      as='header' 
      id='stuckedHeader'
      background='white'
      color='defaultText'
      boxShadow='header'
      position='sticky'
      height='72'
      maxWidth='fullvw'
      top='-1'
      zIndex='400'
    >
      <Box 
        as='nav' 
        display='flex' 
        justifyContent='space-between' 
        alignItems='center'
        gap='18'
        fontWeight='700'
        height='full'
      >
        <Box 
          as='section'
          display='flex'
          textAlign='center'
          paddingX='24'
          flexGrow={isMobile() ? '1' : '0'}
          height='full'
          alignItems='center'
        >
          <Link href='/' passHref={true}>
            <Box
              as='a'
              cursor='pointer'
              fontSize='20'
              display='flex'
              alignItems='center'
            >
              <Logo />
              OpenFish
            </Box>
          </Link>
        </Box>
        <Box 
          as='section'
          display='flex'
          flexWrap='wrap'
          paddingX='10'
          height='full'
        >
          <Box
            display='none'
            className={sprinkles({
              display: {
                wideScreen: 'flex',
                largeScreen: 'flex'
              }
            })}
          >
            <Link href='/faucet' passHref={true}>
              <Box 
                as='a'
                cursor='pointer'
                paddingX='10'
                display='flex'
                alignItems='center'
                height='72'
                className={sprinkles({
                  color: {
                    hover: 'defaultTextHover'
                  }
                })}
              >
                Faucet
              </Box>
            </Link>
            <Link href='/create' passHref={true}>
              <Box 
                as='a'
                cursor='pointer'
                paddingX='10'
                display='flex'
                alignItems='center'
                height='72'
                className={sprinkles({
                  color: {
                    hover: 'defaultTextHover'
                  }
                })}
              >
                Create
              </Box>
            </Link>
            <Link href='/profile' passHref={true}>
              <Box 
                as='a'
                cursor='pointer'
                paddingX='10'
                display='flex'
                alignItems='center'
                height='72'
                className={sprinkles({
                  color: {
                    hover: 'defaultTextHover'
                  }
                })}
              >
                Profile
              </Box>
            </Link>
            <CustomConnectButton />
          </Box>
          <Box
            as='button'
            onClick={() => { toggleMenuSidebar() }}
            display='flex'
            alignItems='center'
            paddingX='10'
            className={sprinkles({
              display: {
                wideScreen: 'none',
                largeScreen: 'none'
              }
            })}
          >
            {isMenuSidebarOpen 
              ? <CloseIcon width='32' />
              : <MenuIcon width='32' />
            }
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
