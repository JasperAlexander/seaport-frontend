import { FC } from 'react'
import { Box } from '../Box/Box'
import { EditIcon } from '../Icons/EditIcon'

interface Props {
    isOwner: boolean
}

export const ProfileBanner: FC<Props> = ({ 
    isOwner
}) => {
    

    return (
        <Box
            position='relative'
            style={{maxHeight: '320px'}}
            overflow='hidden'
        >
            <Box 
                height='0'
                style={{paddingBottom: '25%', backgroundColor: 'rgba(229, 232, 235, 0.314)'}}
            >
                <Box 
                    aria-label='Select a profile banner image' 
                    role='button' 
                    // tabindex='0' 
                    // shape='square' 
                    padding='4'
                    position='absolute'
                    cursor='pointer'
                    inset='0'
                    borderRadius='10'
                    alignItems='center'
                    justifyContent='center'
                    display={isOwner ? 'flex' : 'none'}
                >
                    <Box
                        as='input' 
                        type='file' 
                        accept='image/*' 
                        // tabindex='-1'
                        display='none'
                    />
                    <Box 
                        aria-hidden='true' 
                        position='absolute'
                        inset='0'
                        opacity={{
                            base: '0',
                            hover: '1',
                            active: '1'
                        }}
                        style={{backgroundColor: 'rgba(0, 0, 0, 0.15)'}}
                        // height={{
                        //     base: '0',
                        //     hover: 'initial'
                        // }}
                    >
                        <Box 
                            display='flex'
                            alignItems='center'
                            justifyContent='center'
                            flexDirection='column'
                            height='full'
                        >
                            <EditIcon 
                                fill='white'
                            />
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}