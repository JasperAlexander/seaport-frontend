import { FC, useEffect, useState } from 'react'
import { useEnsAvatar } from 'wagmi'
import useMounted from '../../hooks/useMounted'
import { emojiAvatarForAddress } from '../../utils/emojiAvatar'
import { Box } from '../Box/Box'
import { EditIcon } from '../Icons/EditIcon'
import { ProfileButtonRow } from '../ButtonRows/ProfileButtonRow/ProfileButtonRow'
import { SWRResponse } from 'swr'
import { UserType } from '../../types/userTypes'
import useTranslation from 'next-translate/useTranslation'

interface Props {
    user: SWRResponse<UserType, any> | undefined
    isOwner: boolean
    address?: string
}

export const ProfileImg: FC<Props> = ({ 
    user,
    isOwner,
    address
}) => {
    const { t } = useTranslation('common')
    // const { mounted } = useMounted()
    // const { data: EnsAvatar } = useEnsAvatar({
    //     addressOrName: address,
    //     enabled: false
    // })
    // const [emojiAvatar, setEmojiAvatar] = useState<any>()
    // useEffect(() => {
    //     if (address)
    //         setEmojiAvatar(emojiAvatarForAddress(address))
    // })
    
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
                                aria-label={t('selectField', { fieldName: 'profile image' })}
                                role='button' 
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
                                    type='file' 
                                    accept='image/*' 
                                    display='none'
                                />
                                <Box 
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
                                    alt={t('profileImg')}
                                    src={user?.data?.profile_img_url} 
                                    objectFit='cover'
                                    height='full'
                                    width='full'
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
                    <ProfileButtonRow />
                </Box>
            </Box>
        </Box>
    )
}