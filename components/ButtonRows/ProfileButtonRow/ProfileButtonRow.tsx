import { FC } from 'react'
import { Box } from '../../Box/Box'
import { RoundButton } from '../../Buttons/RoundButton'
import { MoreHorizontalIcon } from '../../Icons/MoreHorizontalIcon'
import { ShareIcon } from '../../Icons/ShareIcon'

interface Props {
    
}

export const ProfileButtonRow: FC<Props> = ({ 
    
}) => {
    return (
        <Box 
            marginLeft='auto'
        >
            <Box>
                <Box 
                    display='flex'
                    alignItems='center'
                >
                    <Box 
                        display='flex'
                        position='relative'
                    >
                        <Box 
                            display='flex'
                            alignItems='center'
                        >
                            <Box 
                                marginRight='4'
                            >
                                <RoundButton>
                                    <ShareIcon width='20' />
                                </RoundButton>
                            </Box>
                        </Box>
                        <Box 
                            display='flex'
                            alignItems='center'
                        >
                            <Box 
                                marginRight='4'
                            >
                                <RoundButton>
                                    <MoreHorizontalIcon />
                                </RoundButton>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}