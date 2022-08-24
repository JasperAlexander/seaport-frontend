import { FC } from 'react'
import { AssetType } from '../../types/assetTypes'
import { truncateAddress, truncateEns } from '../../utils/truncateText'
import { Box } from '../Box/Box'
import { NextLink } from '../NextLink/NextLink'
import { Text } from '../Text/Text'

interface Props {
    asset: AssetType
}

export const FeaturedCard: FC<Props> = ({
    asset
}) => {
    return (
        <Box
            as='article'
            marginRight='30'
            background='defaultBackground'
            display='flex'
            flexDirection='column'
            overflow='hidden'
            borderRadius='10'
            width='full'
            boxShadow={{
                base: 'featuredCard',
                hover: 'featuredCardHover'
            }}
            transition='boxShadow'
            style={{
                maxWidth: '480px'
            }}
        >
            <NextLink 
                href={`/assets/${asset?.asset_contract?.address}/${asset?.token_id}`}
            >
                <Box 
                    overflow='hidden'
                    position='relative'
                    margin='0'
                    maxWidth='full'
                    style={{
                        display: 'inline-block'
                    }}
                >
                    <Box 
                        display='block'
                        maxWidth='full'
                    >
                        <Box
                            as='img' 
                            display='block'
                            padding='0'
                            margin='0'
                            maxWidth='full'
                            aria-hidden={true} 
                            src={asset?.image_url}
                        />
                    </Box>
                    <Box 
                        as='img'
                        position='absolute'
                        padding='0'
                        inset='0'
                        margin='auto'
                        display='block'
                        width='0'
                        height='0'
                        minWidth='full'
                        minHeight='full'
                        maxWidth='full'
                        maxHeight='full'
                        src={asset?.image_url}
                    />
                </Box>
                <Box
                    as='footer'
                    display='flex'
                    width='full'
                    padding='16'
                    textAlign='left'
                >
                    <Box
                        display='flex'
                        alignSelf='center'
                        overflow='hidden'
                        justifyContent='center'
                        alignItems='center'
                        width='38'
                        height='38'
                        padding='0'
                        borderRadius='50p'
                        flexShrink='0'
                        marginRight='16'
                        borderWidth='1'
                        borderStyle='solid'
                        borderColor='box'
                    >
                        <Box
                            as='img'
                            width='38' 
                            height='38'
                            style={{
                                objectFit: 'cover'
                            }}
                            alt="Featured creator" 
                            src={asset?.image_url} 
                        />
                    </Box>
                    <Box
                        display='flex'
                        alignItems='flex-start'
                        justifyContent='center'
                        marginRight='16'
                        overflow='hidden'
                        fontSize='16'
                        flexGrow='1'
                        flexShrink='1'
                        flexBasis='auto'
                        flexDirection='column'
                        flexWrap='nowrap'
                        alignSelf='stretch'
                        style={{
                            marginLeft: '-3px'
                        }}
                    >
                        <Text 
                            as='span'
                            fontSize='14'
                            fontWeight='600'
                        >
                            {asset?.collection.name}
                        </Text>
                        <Box 
                            display='flex' 
                            alignItems='center'
                            gap='4'
                        >
                            <Text
                                fontSize='14' 
                            >
                                by
                            </Text>
                            <Text
                                fontSize='14' 
                                fontWeight='500'
                            >
                                {asset?.creator?.username 
                                    ? truncateEns(asset.creator.username)
                                    : asset?.creator?.address ? truncateAddress(asset.creator.address) : ''
                                }
                            </Text>
                        </Box>
                    </Box>
                </Box>
            </NextLink>
        </Box>
    )
}