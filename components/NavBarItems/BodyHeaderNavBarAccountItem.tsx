import { FC, forwardRef, Ref } from 'react'
import Tippy from '@tippyjs/react'
import { Box } from '../Box/Box'
import { NextLink } from '../NextLink/NextLink'
import { Text } from '../Text/Text'
import { PersonIcon } from '../Icons/PersonIcon'
import { GridIcon } from '../Icons/GridIcon'
import { LogoutIcon } from '../Icons/LogoutIcon'
import { PersonOutlinedIcon } from '../Icons/PersonOutlinedIcon'
import useMounted from '../../hooks/useMounted'
import { useAccount, useDisconnect } from 'wagmi'
import { ModeNightIcon } from '../Icons/ModeNightIcon'
import { NightModeToggle } from '../Toggles/NightModeToggle'

export const BodyHeaderNavBarAccountItem: FC = () => {
    const { mounted } = useMounted()
    const { disconnect } = useDisconnect()
    const { isConnected } = useAccount()

    const AccountLink = forwardRef((props, ref: Ref<HTMLElement>) => (
        <NextLink 
            href='/account' 
            ref={ref}
            paddingX='10'
            display='flex'
            alignItems='center'
            height='72'
        >
        <PersonOutlinedIcon 
            width='32'
        />
        </NextLink>
    ))
    
    return (
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
                        <NextLink 
                        href='/account' 
                        overflow='hidden'
                        display='flex'
                        alignItems='center'
                        padding='16'
                        gap='16'
                        width='full'
                        boxShadow={{
                            hover: 'header'
                        }}
                        background={{
                            hover: 'accordionBackground'
                        }}
                        style={{
                            transition: 'all 0.2s ease 0s'
                        }}
                        >
                        <PersonIcon 
                            fill='defaultText' 
                        />

                        <Text
                            fontWeight='600'
                        >
                            Profile
                        </Text>
                        </NextLink>
                    </Box>
                    <Box
                        borderBottomWidth='1'
                        borderStyle='solid'
                        borderColor='box'
                        width='full'
                    >
                        <NextLink 
                            href='/collections' 
                            display='flex'
                            gap='16'
                            alignItems='center'
                            padding='16'
                            width='full'
                            boxShadow={{
                                hover: 'header'
                            }}
                            background={{
                                hover: 'accordionBackground'
                            }}
                            style={{transition: 'all 0.2s ease 0s'}}
                            >
                            <GridIcon 
                                fill='defaultText' 
                            />
                            <Text
                                fontWeight='600'
                            >
                                My collections
                            </Text>
                        </NextLink>
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
                                style={{
                                transition: 'all 0.2s ease 0s'
                                }}
                            >
                                <LogoutIcon 
                                    fill='defaultText' 
                                />
                                <Text
                                    fontWeight='600'
                                >
                                    Log Out
                                </Text>
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
                            style={{
                                transition: 'all 0.2s ease 0s'
                            }}
                        >
                        <ModeNightIcon 
                            fill='defaultText' 
                        />
                        <Text
                            fontWeight='600'
                        >
                            Night mode
                        </Text>
                        <NightModeToggle />
                        </Box>
                    </Box>
                </Box>
            )}
        >
            <AccountLink />
        </Tippy>
    )
}