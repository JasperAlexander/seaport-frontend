import { FC } from 'react'
import { useEnsName } from 'wagmi'
import { UserType } from '../../types/userTypes'
import { truncateAddress, truncateEns } from '../../utils/truncateText'
import { Box } from '../Box/Box'
import { RoundButton } from '../Buttons/RoundButton'
import { MoreHorizontalIcon } from '../Icons/MoreHorizontalIcon'
import { ShareIcon } from '../Icons/ShareIcon'
import { VerifiedIcon } from '../Icons/VerifiedIcon'
import { ProfileButtons } from '../ProfileButtons/ProfileButtons'
import { Text } from '../Text/Text'

interface Props {
    user?: UserType
}

export const ProfileName: FC<Props> = ({ 
    user
}) => {
    const { data: EnsName } = useEnsName({
        address: user?.address,
        enabled: false
    })
    
    return (
        <Box
            width='full'
            display='flex'
        >
            <Box 
                paddingX='32'
                marginX='auto'
                width='full'
            >
                <Box 
                    display='flex'
                    width='full'
                    alignItems='flex-start'
                >
                    <Box 
                        style={{maxWidth: '60%'}}
                    >
                        <Box 
                            display='flex'
                            gap='4'
                            alignItems='center'
                            style={{wordBreak: 'break-word'}}
                        >
                            {/* <Box 
                                display='none'
                            /> */}
                            <Box 
                                style={{wordBreak: 'break-word'}}
                            >
                                <Text 
                                    as='h1'
                                    fontWeight='600'
                                    fontSize='30'
                                >
                                    {user?.username
                                        ? truncateEns(user.username)
                                        : EnsName
                                            ? truncateEns(EnsName)
                                            : user?.address
                                                ? truncateAddress(user.address)
                                                : 'Unnamed'
                                    }
                                </Text>
                                {user?.config === 'verified' && <VerifiedIcon fill='accentColor' />}
                            </Box>
                        </Box>
                    </Box>
                    <Box
                        display={{
                            wideScreen: 'initial',
                            largeScreen: 'initial',
                            mediumScreen: 'initial',
                            smallScreen: 'initial',
                            base: 'none'
                        }}
                        marginLeft='auto'
                    >
                        <ProfileButtons />
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}