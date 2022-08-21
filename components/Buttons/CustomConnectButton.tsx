import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useState } from 'react'
import { sprinkles } from '../../styles/sprinkles.css'
import { Box } from '../Box/Box'
import { WalletSideDialogTrigger } from '../DialogTriggers/WalletSideDialogTrigger'

export const CustomConnectButton = () => {
  const [walletSideDialogOpen, setWalletSideDialogOpen] = useState<boolean>(false)

  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        mounted,
      }) => {
        return (
          <div
            {...(!mounted && {
              'aria-hidden': true,
              'style': {
                opacity: 0,
                pointerEvents: 'none',
                userSelect: 'none',
              },
            })}
          >
            {(() => {
              if (!mounted || !account || !chain) {
                return (
                  <Box 
                    as='button'
                    cursor='pointer'
                    paddingX='10'
                    display='flex'
                    alignItems='center'
                    fontWeight='600'
                    color='defaultText'
                    height='72'
                    className={sprinkles({
                      color: {
                        hover: 'defaultTextHover'
                      }
                    })}
                    onClick={openConnectModal}
                  >
                    Connect
                  </Box>
                )
              }
              if (chain.unsupported) {
                return (
                  <Box
                    as='button' 
                    cursor='pointer'
                    paddingX='10'
                    display='flex'
                    alignItems='center'
                    fontWeight='600'
                    color='defaultText'
                    height='72'
                    className={sprinkles({
                      color: {
                        hover: 'defaultTextHover'
                      }
                    })}
                    onClick={openChainModal}
                  >
                    Connect
                  </Box>
                )
              }
              return (
                <Box 
                  display='flex'
                  alignItems='center'
                  height='72'
                  className={sprinkles({
                    color: {
                      hover: 'defaultTextHover'
                    }
                  })}
                >
                  <WalletSideDialogTrigger 
                    open={walletSideDialogOpen}
                    setOpen={setWalletSideDialogOpen}
                  >
                    <Box
                      paddingX='10'
                      cursor='pointer'
                    >
                      Wallet
                    </Box>
                  </WalletSideDialogTrigger>
                  {/* <Box
                    as='button'
                    fontWeight='600'
                    color='defaultText'
                    paddingX='10'
                    className={sprinkles({
                      color: {
                        hover: 'defaultTextHover'
                      }
                    })}
                    // onClick={openChainModal}
                    onClick={toggleWalletSidebar}
                    style={{ display: 'flex', alignItems: 'center' }}
                  > */}
                    {/* {chain.hasIcon && (
                      <Box
                        style={{
                          background: chain.iconBackground,
                          width: 12,
                          height: 12,
                          borderRadius: 999,
                          overflow: 'hidden',
                          marginRight: 4,
                        }}
                      >
                        {chain.iconUrl && (
                          <img
                            alt={chain.name ?? 'Chain icon'}
                            src={chain.iconUrl}
                            style={{ width: 12, height: 12 }}
                          />
                        )}
                      </Box>
                    )}
                    {chain.name} */}
                    {/* Wallet
                  </Box> */}
                  {/* <Box 
                    as='button'
                    fontWeight='600'
                    color='defaultText'
                    paddingX='10'
                    className={sprinkles({
                      color: {
                        hover: 'defaultTextHover'
                      }
                    })}
                    onClick={openAccountModal}
                  >
                    {account.displayName}
                    {account.displayBalance
                      ? ` (${account.displayBalance})`
                      : ''}
                  </Box> */}
                </Box>
              )
            })()}
          </div>
        )
      }}
    </ConnectButton.Custom>
  )
}