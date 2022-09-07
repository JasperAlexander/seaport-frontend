import { FC, useEffect, useState } from 'react'
import { useEnsAvatar } from 'wagmi'
import useMounted from '../../hooks/useMounted'
import { emojiAvatarForAddress } from '../../utils/emojiAvatar'
import { Box } from '../Box/Box'
import { EditIcon } from '../Icons/EditIcon'
import { ProfileButtons } from '../ProfileButtons/ProfileButtons'

interface Props {
    isOwner: boolean
    address?: string
}

export const ProfileImg: FC<Props> = ({ 
    isOwner,
    address
}) => {
    const { mounted } = useMounted()
    const { data: EnsAvatar } = useEnsAvatar({
        addressOrName: address,
        enabled: false
    })
    const [emojiAvatar, setEmojiAvatar] = useState<any>()
    useEffect(() => {
        if (address)
            setEmojiAvatar(emojiAvatarForAddress(address))
    })
    
    return (
        <Box
            paddingX='32'
            marginX='auto'
            width='full'
        >
            <Box 
                display='flex'
                alignItems='center'
            >
                <Box 
                    marginTop={{
                        wideScreen: '-156',
                        largeScreen: '-156',
                        mediumScreen: '-86',
                        smallScreen: '-86',
                        base: '-36'
                    }}
                    marginBottom='16'
                >
                    <Box 
                        borderWidth='6'
                        borderStyle='solid'
                        borderColor='white'
                        borderRadius='50p'
                        position='relative'
                        background='white'
                        style={{boxShadow: 'rgba(0, 0, 0, 0.08) 0px 5px 20px 0px'}}
                        width={{
                            wideScreen: '180',
                            largeScreen: '180',
                            mediumScreen: '120',
                            smallScreen: '120',
                            base: '90'
                        }}
                        height={{
                            wideScreen: '180',
                            largeScreen: '180',
                            mediumScreen: '120',
                            smallScreen: '120',
                            base: '90'
                        }}
                    >
                        <Box 
                            width='full'
                            height='full'
                            position='relative'
                        >
                            <Box 
                                aria-label="Select a profile image" 
                                role="button" 
                                // tabindex="0" 
                                // shape="round" 
                                padding='4'
                                cursor='pointer'
                                position='absolute'
                                inset='0'
                                borderRadius='50p'
                                alignItems='center'
                                flexDirection='column'
                                justifyContent='center'
                                display={isOwner ? 'flex' : 'none'}
                            >
                                <Box
                                    as='input' 
                                    type="file" 
                                    accept="image/*" 
                                    display='none'
                                    // tabindex="-1"
                                />
                                <Box 
                                    // aria-hidden="true" 
                                    position='absolute'
                                    inset='0'
                                    opacity={{
                                        base: '0',
                                        hover: '1',
                                        active: '1'
                                    }}
                                    zIndex='300'
                                    // height={{
                                    //     base: '0',
                                    //     hover: 'initial'
                                    // }}
                                    borderRadius='50p'
                                    style={{backgroundColor: 'rgba(0, 0, 0, 0.15)'}}
                                >
                                    <Box 
                                        display='flex'
                                        flexDirection='column'
                                        justifyContent='center'
                                        alignItems='center'
                                        height='full'
                                    >
                                        <EditIcon 
                                            fill='white'
                                        />
                                    </Box>
                                </Box>
                            </Box>
                            <Box 
                                style={{
                                    height: '168px',
                                    width: '168px'
                                }}
                                display='flex'
                                justifyContent='center'
                                alignItems='center'
                                overflow='hidden'
                                position='relative'
                                borderRadius='50p'
                                maxHeight='full'
                                maxWidth='full'
                                cursor='pointer'
                            >
                                <Box
                                    as='img' 
                                    alt="User Profile Image" 
                                    src="https://storage.googleapis.com/opensea-static/opensea-profile/19.png" 
                                    objectFit='cover'
                                    height='full'
                                    width='full'
                                    style={{transition: 'opacity 400ms ease 0s'}}
                                />
                            </Box>
                        </Box>
                    </Box>
                    {/* <Box 
                        marginLeft='auto'
                    >
                        <Box
                            display={{
                                wideScreen: 'none',
                                largeScreen: 'none',
                                mediumScreen: 'none',
                                smallScreen: 'none',
                                base: 'initial'
                            }}
                        >
                            <Box
                                display='flex'
                                gap='4'
                            >

                            </Box>
                        </Box>
                    </Box> */}
                </Box>
                <Box
                    display={{
                        wideScreen: 'none',
                        largeScreen: 'none',
                        mediumScreen: 'none',
                        smallScreen: 'none',
                        base: 'initial'
                    }}
                    marginLeft='auto'
                >
                    <ProfileButtons />
                </Box>
            </Box>
        </Box>
    )
}