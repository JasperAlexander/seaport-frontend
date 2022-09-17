import { FC, useEffect, useState } from 'react'
import { UserType } from '../../types/userTypes'
import { truncateAddress } from '../../utils/truncateText'
import { Box } from '../Box/Box'
import { Text } from '../Text/Text'
import useTranslation from 'next-translate/useTranslation'

interface Props {
    user?: UserType
}

export const ProfileDescription: FC<Props> = ({ 
    user
}) => {
    const { t } = useTranslation('common')

    const [joinedDate, setJoinedDate] = useState<string>('')
    useEffect(() => {
        if (user?.created_timestamp) {
            const formattedDate =  new Intl.DateTimeFormat(
                'en-US', { 
                    month: 'long',
                    year: 'numeric'
                }).format(new Date(user.created_timestamp))
            setJoinedDate(formattedDate)
        }
    }, [user?.created_timestamp])

    return (
        <Box>
            <Box 
                paddingX='32'
                marginTop={{
                    wideScreen: '-6',
                    largeScreen: '-6',
                    mediumScreen: '-6',
                    smallScreen: '-6'
                }}
                marginX='auto'
                width='full'
            >
                <Box 
                    display='flex'
                    flexDirection='column'
                >
                    <Box 
                        display='flex'
                        alignItems='center'
                    >
                        <Box>
                            <Box 
                                display='flex'
                                alignItems='center'
                            >
                                <Box 
                                    display={{
                                        wideScreen: 'flex',
                                        largeScreen: 'flex',
                                        mediumScreen: 'flex',
                                        smallScreen: 'flex',
                                        base: 'none'
                                    }}
                                    marginRight='6'
                                >
                                    <Box>
                                        <Box 
                                            display='inline-flex'
                                            justifyContent='center'
                                            alignItems='center'
                                            paddingY='4'
                                            paddingRight='8'
                                            gap='2'
                                            height='32'
                                            borderRadius='10'
                                        >
                                            <Box 
                                                display='flex'
                                                marginRight='4'
                                            >
                                                <Box 
                                                    size={16}
                                                    overflow='hidden'
                                                    alignItems='center'
                                                    justifyContent='center'
                                                    flexDirection='column'
                                                    display='flex'
                                                    height='16'
                                                    width='16'
                                                >
                                                    {/* To do */}
                                                    <Box
                                                        as='img' 
                                                        objectFit='contain'
                                                        src='https://static.opensea.io/general/ETH.svg' 
                                                        size={16}
                                                        width='16'
                                                        height='16'
                                                    />
                                                </Box>
                                            </Box>
                                            <Box 
                                                as='button'
                                                type='button'
                                                display='inline-flex'
                                                alignItems='center'
                                            >
                                                <Box 
                                                    marginRight='8'
                                                >
                                                    {user?.address && truncateAddress(user.address)}
                                                </Box>
                                            </Box>
                                        </Box>
                                    </Box>
                                </Box>
                                <Box>
                                    <Text 
                                        color='boxText'
                                    >
                                        {user?.created_timestamp &&
                                            (t('joined') + 
                                                new Intl.DateTimeFormat(
                                                    'en-US', 
                                                    { 
                                                        month: 'long',
                                                        year: 'numeric'
                                                    }
                                                ).format(
                                                    new Date(user.created_timestamp)
                                                )
                                            )
                                        }
                                    </Text>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}