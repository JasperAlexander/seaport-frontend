import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useState } from 'react'
import { sprinkles } from '../../styles/sprinkles.css'
import { Box } from '../Box/Box'
import { WalletSideDialogTrigger } from '../DialogTriggers/WalletSideDialogTrigger'
import { WalletOutlinedIcon } from '../Icons/WalletOutlinedIcon'

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
                    justifyContent='center'
                    height='72'
                    onClick={openConnectModal}
                  >
                    <WalletOutlinedIcon 
                      width='32' 
                    />
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
                    justifyContent='center'
                    height='72'
                    onClick={openChainModal}
                  >
                    <WalletOutlinedIcon 
                      width='32' 
                    />
                  </Box>
                )
              }
              return (
                <Box 
                  display='flex'
                  alignItems='center'
                  height='72'
                >
                  <WalletSideDialogTrigger 
                    open={walletSideDialogOpen}
                    setOpen={setWalletSideDialogOpen}
                  >
                    <Box
                      display='flex'
                      alignItems='center'
                      justifyContent='center'
                      paddingX='10'
                      cursor='pointer'
                    >
                      <WalletOutlinedIcon 
                        width='32' 
                      />
                    </Box>
                  </WalletSideDialogTrigger>
                </Box>
              )
            })()}
          </div>
        )
      }}
    </ConnectButton.Custom>
  )
}