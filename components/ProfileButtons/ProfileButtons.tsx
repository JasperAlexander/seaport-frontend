import { FC } from 'react'
import { UserType } from '../../types/userTypes'
import { truncateAddress } from '../../utils/truncateText'
import { Box } from '../Box/Box'
import { RoundButton } from '../Buttons/RoundButton'
import { MoreHorizontalIcon } from '../Icons/MoreHorizontalIcon'
import { ShareIcon } from '../Icons/ShareIcon'
import { Text } from '../Text/Text'

interface Props {
    
}

export const ProfileButtons: FC<Props> = ({ 
    
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
                    {/* Not clear what this is */}
                    {/* <Box>
                        <Box 
                            display='flex'
                            alignItems='center'
                        >
                            <Box 
                                display='flex'
                                gap='4'
                            />
                        </Box>
                    </Box> */}
                    <Box 
                        display='flex'
                        position='relative'
                    >
                        <Box 
                            display='flex'
                            alignItems='center'
                        >
                            {/* Not clear what this is */}
                            {/* <Box 
                                
                            /> */}
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
                            {/* Not clear what this is */}
                            {/* <Box 
                                
                            /> */}
                            <Box 
                                marginRight='4'
                            >
                                <RoundButton>
                                    <MoreHorizontalIcon />
                                </RoundButton>
                            </Box>
                        </Box>
                        {/* <Box 
                            class="sc-1xf18x6-0 sc-1twd32i-0 iQOhGx kKpYwv" 
                            aria-expanded="false"
                        >
                            <button 
                                aria-label="More dropdown" 
                                class="sc-1xf18x6-0 sc-glfma3-0 hiIVBZ ldKPky sc-1f8mrqm-1 cSmTUZ" 
                                type="button"
                            >
                                <span 
                                    class="sc-1xf18x6-0 sc-1w94ul3-2 sc-1f8mrqm-0 htItae dPJMHe jXmopt"
                                >
                                    <i value="more_horiz" size="24" class="sc-1gugx8q-0 sc-11mzylr-1 fTdhIH jOurNM material-icons" color="black">
                                        more_horiz
                                    </i>
                                </span>
                            </button>
                        </div> */}
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}