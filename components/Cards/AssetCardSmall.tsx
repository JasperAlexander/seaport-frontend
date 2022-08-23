import Link from 'next/link'
import useSeaport from '../../hooks/useSeaport'
import { EthIcon } from '../Icons/EthIcon'
import { FC, useState } from 'react'
import { Box } from '../Box/Box'
import { AssetType } from '../../types/assetTypes'
import { sprinkles } from '../../styles/sprinkles.css'
import { CardButton } from '../Buttons/CardButton'
import LoadingCard from './LoadingCard'
import { LoginSideDialogTrigger } from '../DialogTriggers/LoginSideDialogTrigger'
import { useAccount } from 'wagmi'
import useMounted from '../../hooks/useMounted'
import { CompletePurchaseDialogTrigger } from '../DialogTriggers/CompletePurchaseDialogTrigger'
import { CancelListingDialogTrigger } from '../DialogTriggers/CancelListingDialogTrigger'
import { Text } from '../Text/Text'

interface Props {
    asset: AssetType
    mutate: () => void
    isOwner?: boolean
}

export const AssetCardSmall: FC<Props> = ({
    asset,
    mutate,
    isOwner
}) => {
    const { mounted } = useMounted()
    const { seaport } = useSeaport()
    const { isConnected, address } = useAccount()

    const [loginSideDialogOpen, setLoginSideDialogOpen] = useState<boolean>(false)
    const [completePurchaseDialogOpen, setCompletePurchaseDialogOpen] = useState<boolean>(false)
    const [cancelListingDialogOpen, setCancelListingDialogOpen] = useState<boolean>(false)

    if (!isOwner && mounted)
        isOwner = address === asset.owner.address

    return (
        <Box
            id='assetCard'
            position='relative'
            display='flex'
            flexDirection='column'
            background='orderBackground'
            height='auto'
            overflow='hidden'
            borderRadius='10'
            borderWidth='1'
            boxShadow='box'
            className={sprinkles({
                boxShadow: {
                    hover: 'boxHover'
                }
            })}
            transition='default'
            cursor='pointer'
        >
            <Box>
                <Link href={`/assets/${asset.asset_contract.address}/${asset.token_id}`} passHref={true}>
                    <Box
                        as='a' 
                        display='flex'
                        flexDirection='column'
                        zIndex='100'
                        position='relative'
                    >
                        <Box
                            aspectRatio='square'
                            overflow='hidden'
                        >
                            {asset.image_url
                                ? 
                                    <Box
                                        as='img' 
                                        id='assetCardImg'
                                        src={asset.image_url}
                                        dimension='full'
                                        transition='assetCardImage'
                                        // Added hover effect here for readability, effect is also defined in globals.css
                                        className={sprinkles({
                                            scale: {
                                                hover: 'growLg'
                                            }
                                        })} 
                                    />
                                : <LoadingCard />
                            }
                        </Box>

                        <Box 
                            paddingY='12' 
                            paddingX='16' 
                            display='flex' 
                            flexDirection='column' 
                            gap='8'
                            style={{zIndex: '200'}}
                        >
                            <Box display='flex' flexDirection='column'>
                                <Text 
                                    as='span' 
                                    fontSize='12' 
                                    fontWeight='600'
                                >
                                    {asset.name}
                                </Text>
                                <Box 
                                    height='18'
                                >
                                    <Text 
                                        as='span' 
                                        fontSize='12'
                                        whiteSpace='nowrap'
                                    >
                                        {asset.description}
                                    </Text>
                                </Box>
                            </Box>
                            <Box>
                                <Text 
                                    as='span' 
                                    fontSize='12' 
                                    fontWeight='600'
                                >
                                    Price
                                </Text>
                                <Box 
                                    display='flex' 
                                    alignItems='center' 
                                    height='20' 
                                    gap='5'
                                >
                                    <EthIcon width='16' />
                                    <Text 
                                        as='span' 
                                        fontWeight='600'
                                    >
                                        0,01
                                    </Text>
                                </Box>
                            </Box>
                            
                        </Box>
                    </Box>
                </Link>
                <Box 
                    paddingY='12' 
                    paddingX='16' 
                    display='flex' 
                    flexDirection='column' 
                    gap='8'
                    style={{zIndex: '200'}}
                >
                    <Box
                        display='flex'
                        alignItems='center'
                        height='20'
                        width='full'
                        marginTop='4'
                        fontWeight='500'
                        fontSize='12'
                        color='boxText'
                    >
                        <Box
                            id='assetCardText'
                            // Added hover effect here for readability, effect is also defined in globals.css
                            opacity={{
                                base: '1',
                                hover: '0'
                            }}
                            transition='opacity'
                            marginRight='8'
                        >
                            Ends in ...
                        </Box>
                        {mounted && !isConnected &&
                            <LoginSideDialogTrigger 
                                open={loginSideDialogOpen}
                                setOpen={setLoginSideDialogOpen}
                            >
                                <CardButton 
                                    onClick={() => {return null}}
                                >
                                    Buy now
                                </CardButton>
                            </LoginSideDialogTrigger>
                        }
                        {mounted && isConnected && !isOwner &&
                            <CompletePurchaseDialogTrigger
                                open={completePurchaseDialogOpen}
                                setOpen={setCompletePurchaseDialogOpen}
                                data={asset}
                            >    
                                <CardButton 
                                    onClick={() => {return null}}
                                >
                                    Buy now
                                </CardButton>
                            </CompletePurchaseDialogTrigger>
                        }
                        {mounted && isConnected && isOwner &&
                            <CancelListingDialogTrigger
                                open={cancelListingDialogOpen}
                                setOpen={setCancelListingDialogOpen}
                                data={asset}
                            >    
                                <CardButton 
                                    onClick={() => {return null}}
                                >
                                    Cancel listing
                                </CardButton>
                            </CancelListingDialogTrigger>
                        }
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}
