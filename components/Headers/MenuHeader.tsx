import Link from 'next/link'
import { Box } from '../Box/Box'
import { isMobile } from '../../utils/isMobile'
import { Logo } from '../Icons/Logo'
import { sprinkles } from '../../styles/sprinkles.css'
import { Menu } from '../Icons/Menu'
import { useSidebars } from '../../hooks/useSidebars'
import { CloseMenu } from '../Icons/CloseMenu'
import { CustomConnectButton } from '../Buttons/CustomConnectButton'

export const MenuHeader: React.FC = () => {
  const { isMenuSidebarOpen, toggleMenuSidebar, closeWalletSidebar } = useSidebars()

  return (
    <Box 
      as='header' 
      background='white'
      color='defaultText'
      boxShadow='header'
      position='sticky'
      height='72'
      maxWidth='fullvw'
      top='0'
      style={{zIndex: '3'}}
    >
      <Box 
        as='nav' 
        display='flex' 
        justifyContent='space-between' 
        alignItems='center'
        gap='18'
        fontWeight='bold'
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
          <Link href='/'>
            <Box
              as='a'
              cursor='pointer'
              fontSize='20'
              display='flex'
              alignItems='center'
            >
              <Logo />
              Seaport implementation
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
                largeScreen: 'flex'
              }
            })}
          >
            <Link href='/faucet'>
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
            <Link href='/create'>
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
            <Link href='/profile'>
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
            onClick={() => { toggleMenuSidebar(), closeWalletSidebar() }}
            display='flex'
            alignItems='center'
            paddingX='10'
            className={sprinkles({
              display: {
                largeScreen: 'none'
              }
            })}
          >
            {isMenuSidebarOpen 
              ? <CloseMenu width='32' color='black' /> 
              : <Menu width='32' color='black' />
            }
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
