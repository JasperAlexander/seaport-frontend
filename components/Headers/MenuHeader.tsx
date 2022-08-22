import { FC, forwardRef, Ref } from 'react'
import Link from 'next/link'
import { Box } from '../Box/Box'
import { isMobile } from '../../utils/isMobile'
import { Logo } from '../Icons/Logo'
import { sprinkles } from '../../styles/sprinkles.css'
import { MenuIcon } from '../Icons/MenuIcon'
import { useSidebars } from '../../hooks/useSidebars'
import { CustomConnectButton } from '../Buttons/CustomConnectButton'
import { CloseIcon } from '../Icons/CloseIcon'
import Tippy from '@tippyjs/react'
import { GridIcon } from '../Icons/GridIcon'
import { PersonIcon } from '../Icons/PersonIcon'
import { LogoutIcon } from '../Icons/LogoutIcon'
import { useAccount, useDisconnect } from 'wagmi'
import useMounted from '../../hooks/useMounted'
import { ModeNightIcon } from '../Icons/ModeNightIcon'
import { NightModeToggle } from '../Toggles/NightModeToggle'

export const MenuHeader: FC = () => {
  const { isMenuSidebarOpen, toggleMenuSidebar } = useSidebars()
  const { mounted } = useMounted()
  const { disconnect } = useDisconnect()
  const { isConnected } = useAccount()

  const ExploreLink = forwardRef((props, ref: Ref<HTMLElement>) => (
    <Link href='/assets' passHref={true}>
      <Box 
        as='a'
        ref={ref}
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
        Explore
      </Box>
    </Link>
  ))

  const AccountLink = forwardRef((props, ref: Ref<HTMLElement>) => (
    <Link href='/profile' passHref={true}>
      <Box 
        as='a'
        ref={ref}
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
        Account
      </Box>
    </Link>
  ))

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
            alignItems='center'
            className={sprinkles({
              display: {
                wideScreen: 'flex',
                largeScreen: 'flex'
              }
            })}
          >
            <Tippy
              interactive={true}
              offset={[0, 0]}
              trigger='mouseenter'
              animation={false}
              delay={[0, 0]}
              duration={0}
              allowHTML={true}
              render={attrs => (
                <Box 
                  {...attrs}
                  background='defaultBackground'
                  position='relative'
                  borderBottomLeftRadius='10'
                  borderBottomRightRadius='10'
                  fontSize='14'
                  fontWeight='600'
                  style={{
                    overflowWrap: 'break-word',
                    minWidth: '220px',
                    maxHeight: 'calc(-72px + 100vh)',
                    boxShadow: 'rgba(0, 0, 0, 0.16) 0px 4px 16px',

                  }}
                >
                  <Box
                    borderBottomWidth='1'
                    borderStyle='solid'
                    borderColor='box'
                    borderBottomLeftRadius={{
                      lastchild: '10'
                    }}
                    borderBottomRightRadius={{
                      lastchild: '10'
                    }}
                    width='full'
                  >
                    <Link href='/assets' passHref={true}>
                      <Box
                        as='a'
                        overflow='hidden'
                        display='flex'
                        alignItems='center'
                        padding='16'
                        gap='16'
                        fontSize='16'
                        fontWeight='600'
                        cursor='pointer'
                        width='full'
                        boxShadow={{
                          hover: 'header'
                        }}
                        background={{
                          hover: 'accordionBackground'
                        }}
                        style={{transition: 'all 0.2s ease 0s'}}
                      >
                        All assets
                      </Box>
                    </Link>
                  </Box>
                  <Box
                    borderBottomWidth='1'
                    borderStyle='solid'
                    borderColor='box'
                    borderBottomLeftRadius='10'
                    borderBottomRightRadius='10'
                    overflow='hidden'
                    width='full'
                  >
                    <Link href='/' passHref={true}>
                      <Box
                        as='a'
                        overflow='hidden'
                        display='flex'
                        alignItems='center'
                        padding='16'
                        gap='16'
                        fontSize='16'
                        fontWeight='600'
                        cursor='pointer'
                        width='full'
                        boxShadow={{
                          hover: 'header'
                        }}
                        background={{
                          hover: 'accordionBackground'
                        }}
                        style={{transition: 'all 0.2s ease 0s'}}
                      >
                        All collections
                      </Box>
                    </Link>
                  </Box>
                </Box>
              )}
            >
              <ExploreLink />
            </Tippy>
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
            <Tippy
              interactive={true}
              offset={[0, 0]}
              trigger='mouseenter'
              animation={false}
              delay={[0, 0]}
              duration={0}
              allowHTML={true}
              render={attrs => (
                <Box 
                  {...attrs}
                  background='defaultBackground'
                  position='relative'
                  borderBottomLeftRadius='10'
                  borderBottomRightRadius='10'
                  fontSize='14'
                  fontWeight='600'
                  style={{
                    overflowWrap: 'break-word',
                    minWidth: '220px',
                    maxHeight: 'calc(-72px + 100vh)',
                    boxShadow: 'rgba(0, 0, 0, 0.16) 0px 4px 16px',

                  }}
                >
                  <Box
                    borderBottomWidth='1'
                    borderStyle='solid'
                    borderColor='box'
                    borderBottomLeftRadius={{
                      lastchild: '10'
                    }}
                    borderBottomRightRadius={{
                      lastchild: '10'
                    }}
                    width='full'
                  >
                    <Link href='/profile' passHref={true}>
                      <Box
                        as='a'
                        overflow='hidden'
                        display='flex'
                        alignItems='center'
                        padding='16'
                        gap='16'
                        fontSize='16'
                        fontWeight='600'
                        cursor='pointer'
                        width='full'
                        boxShadow={{
                          hover: 'header'
                        }}
                        background={{
                          hover: 'accordionBackground'
                        }}
                        style={{transition: 'all 0.2s ease 0s'}}
                      >
                        <PersonIcon fill='defaultText' />
                        Profile
                      </Box>
                    </Link>
                  </Box>
                  <Box
                    borderBottomWidth='1'
                    borderStyle='solid'
                    borderColor='box'
                    width='full'
                  >
                    <Link href='/collections' passHref={true}>
                      <Box
                        as='a'
                        display='flex'
                        gap='16'
                        fontSize='16'
                        fontWeight='600'
                        alignItems='center'
                        padding='16'
                        cursor='pointer'
                        width='full'
                        boxShadow={{
                          hover: 'header'
                        }}
                        background={{
                          hover: 'accordionBackground'
                        }}
                        style={{transition: 'all 0.2s ease 0s'}}
                      >
                        <GridIcon fill='defaultText' />
                        My collections
                      </Box>
                    </Link>
                  </Box>
                  {mounted && isConnected &&
                    <Box
                      borderBottomWidth='1'
                      borderStyle='solid'
                      borderColor='box'
                      width='full'
                    >
                      <Box
                        as='button'
                        type='button'
                        onClick={() => disconnect()}
                        display='flex'
                        gap='16'
                        fontSize='16'
                        fontWeight='600'
                        alignItems='center'
                        padding='16'
                        cursor='pointer'
                        width='full'
                        boxShadow={{
                          hover: 'header'
                        }}
                        background={{
                          hover: 'accordionBackground'
                        }}
                        style={{transition: 'all 0.2s ease 0s'}}
                      >
                        <LogoutIcon fill='defaultText' />
                        Log Out
                      </Box>
                    </Box>
                  }
                  <Box
                    borderBottomWidth='1'
                    borderStyle='solid'
                    borderColor='box'
                    borderBottomLeftRadius='10'
                    borderBottomRightRadius='10'
                    width='full'
                  >
                    <Box
                      as='button'
                      type='button'
                      onClick={() => { return null }}
                      display='flex'
                      gap='16'
                      fontSize='16'
                      fontWeight='600'
                      alignItems='center'
                      borderBottomLeftRadius='10'
                      borderBottomRightRadius='10'
                      padding='16'
                      cursor='pointer'
                      width='full'
                      boxShadow={{
                        hover: 'header'
                      }}
                      background={{
                        hover: 'accordionBackground'
                      }}
                      style={{transition: 'all 0.2s ease 0s'}}
                    >
                      <ModeNightIcon fill='defaultText' />
                      Night mode
                      <NightModeToggle />
                    </Box>
                  </Box>
                </Box>
              )}
            >
              <AccountLink />
            </Tippy>
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
