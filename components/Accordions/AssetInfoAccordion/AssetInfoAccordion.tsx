// To do: 
// 1. Add posibility to add searchbar inside accordion item

import { FC } from 'react'
import * as Accordion from '@radix-ui/react-accordion'
import { Box } from '../../Box/Box'
import { ChevronIcon } from '../../Icons/ChevronIcon'
import * as styles from './AssetInfoAccordion.css'
import { AssetType } from '../../../types/assetTypes'
import { EarthIcon } from '../../Icons/EarthIcon'
import { truncateAddress } from '../../../utils/truncateText'
import { SubjectIcon } from '../../Icons/SubjectIcon'
import { LabelIcon } from '../../Icons/LabelIcon'
import { VerticalSplitIcon } from '../../Icons/VerticalSplitIcon'
import { BallotIcon } from '../../Icons/BallotIcon'
import { ContractSchemas } from '../../../types/contractTypes'
import { TwitterIcon } from '../../Icons/TwitterIcon'
import { InstagramIcon } from '../../Icons/InstagramIcon'
import { MediumIcon } from '../../Icons/MediumIcon'
import { Text } from '../../Text/Text'
import { NextLink } from '../../NextLink/NextLink'

interface Props {
    data: AssetType | undefined // SWRResponse<AssetType, any> | undefined // AssetStateType
}

export const AssetInfoAccordion: FC<Props> = ({
    data
}) => {
    // const { data: assetData, isValidating } = data
    
    return (
        <Accordion.Root type="multiple" defaultValue={['description']}>
                <Accordion.Item 
                    value='description'
                    key='description'
                    className={styles.item}
                >
                    <Accordion.Header>
                        <Accordion.Trigger className={styles.firstTrigger}>
                            <Box
                                display='flex'
                                alignItems='center'
                                gap='10'
                            >
                                <SubjectIcon />
                                <Text
                                    as='span'
                                    fontWeight='600'
                                >
                                    Description
                                </Text>
                            </Box>
                            <ChevronIcon />
                        </Accordion.Trigger>
                    </Accordion.Header>
                    <Accordion.Content className={styles.content}>
                        <Box className={styles.description}>
                            <Text>
                                By 
                                <NextLink 
                                    href={`/${data?.creator?.username ? data.creator.username : data?.creator?.address}`}
                                    fontWeight='600' 
                                    marginLeft='4'
                                >
                                    {data?.creator?.username ? data.creator.username : data?.creator?.address}
                                </NextLink>
                                </Text>
                            <Text>
                                {data?.description}
                            </Text>
                        </Box>
                    </Accordion.Content>
                </Accordion.Item>

                <Accordion.Item 
                    value='properties'
                    key='properties'
                    className={styles.item}
                >
                    <Accordion.Header>
                        <Accordion.Trigger className={styles.trigger}>
                            <Box
                                display='flex'
                                alignItems='center'
                                gap='10'
                            >
                                <LabelIcon />
                                <Text
                                    as='span'
                                    fontWeight='600'
                                >
                                    Properties
                                </Text>
                            </Box>
                            <ChevronIcon />
                        </Accordion.Trigger>
                    </Accordion.Header>
                    <Accordion.Content
                        className={styles.content}
                    >
                        <Box padding='5'>
                            Properties not yet in DB
                        </Box>
                    </Accordion.Content>
                </Accordion.Item>

                <Accordion.Item 
                    value='about'
                    key='about'
                    className={styles.item}
                >
                    <Accordion.Header>
                        <Accordion.Trigger className={styles.trigger}>
                            <Box
                                display='flex'
                                alignItems='center'
                                gap='10'
                            >
                                <VerticalSplitIcon />
                                <Text
                                    as='span'
                                    fontWeight='600'
                                >
                                    About {data?.collection?.name}
                                </Text>
                            </Box>
                            <ChevronIcon />
                        </Accordion.Trigger>
                    </Accordion.Header>
                    <Accordion.Content
                        className={styles.content}
                    >
                        <Box 
                            className={styles.collection}
                        >
                            <Text
                                fontSize='14'
                            >
                                <NextLink 
                                    href={`/collection/${data?.collection?.slug}`}
                                >
                                    <Box 
                                        as='img' 
                                        src={data?.collection?.image_url}
                                        className={styles.collectionImg} 
                                        style={{float: 'left'}}
                                    />
                                </NextLink>
                                {data?.collection?.description}
                            </Text>
                            <Box 
                                display='flex'
                                // alignItems='center'
                            >
                                <Box
                                    display='flex'
                                    justifyContent='flex-end'
                                    borderWidth='2' 
                                    borderStyle='solid' 
                                    borderRadius='10'
                                    borderColor='box'
                                >
                                    <Box 
                                        as='a'
                                        href={data?.collection?.external_url}
                                        display='flex'
                                        alignItems='center'
                                        background='defaultBackground'
                                        padding='16' 
                                        borderTopLeftRadius={{firstchild: '10'}}
                                        borderBottomLeftRadius={{firstchild: '10'}}
                                        borderTopRightRadius={{lastchild: '10'}}
                                        borderBottomRightRadius={{lastchild: '10'}}
                                        borderLeftWidth={{notfirstchild: '2'}}
                                        borderStyle='solid' 
                                        borderColor='box'
                                        boxShadow={{hover: 'subHeader'}}
                                    >
                                        <EarthIcon width='20' />
                                    </Box>
                                    {data?.collection?.twitter_username &&
                                        <Box 
                                            as='a'
                                            href={`http://twitter.com/${data.collection.twitter_username}`}
                                            display='flex'
                                            alignItems='center'
                                            background='defaultBackground'
                                            padding='16' 
                                            borderTopLeftRadius={{firstchild: '10'}}
                                            borderBottomLeftRadius={{firstchild: '10'}}
                                            borderTopRightRadius={{lastchild: '10'}}
                                            borderBottomRightRadius={{lastchild: '10'}}
                                            borderLeftWidth={{notfirstchild: '2'}}
                                            borderStyle='solid' 
                                            borderColor='box'
                                            boxShadow={{hover: 'subHeader'}}
                                        >
                                            <TwitterIcon width='20' />
                                        </Box>
                                    }
                                    {data?.collection?.instagram_username &&
                                        <Box 
                                            as='a'
                                            href={`http://instagram.com/${data.collection.instagram_username}`}
                                            display='flex'
                                            alignItems='center'
                                            background='defaultBackground'
                                            padding='16' 
                                            borderTopLeftRadius={{firstchild: '10'}}
                                            borderBottomLeftRadius={{firstchild: '10'}}
                                            borderTopRightRadius={{lastchild: '10'}}
                                            borderBottomRightRadius={{lastchild: '10'}}
                                            borderLeftWidth={{notfirstchild: '2'}}
                                            borderStyle='solid' 
                                            borderColor='box'
                                            boxShadow={{hover: 'subHeader'}}
                                        >
                                            <InstagramIcon width='20' />
                                        </Box>
                                    }
                                    {data?.collection?.medium_username &&
                                        <Box 
                                            as='a'
                                            href={`http://medium.com/${data.collection.medium_username}`}
                                            display='flex'
                                            alignItems='center'
                                            background='defaultBackground'
                                            padding='16' 
                                            borderTopLeftRadius={{firstchild: '10'}}
                                            borderBottomLeftRadius={{firstchild: '10'}}
                                            borderTopRightRadius={{lastchild: '10'}}
                                            borderBottomRightRadius={{lastchild: '10'}}
                                            borderLeftWidth={{notfirstchild: '2'}}
                                            borderStyle='solid' 
                                            borderColor='box'
                                            boxShadow={{hover: 'subHeader'}}
                                        >
                                            <MediumIcon width='20' />
                                        </Box>
                                    }
                                </Box>
                            </Box>
                        </Box>
                    </Accordion.Content>
                </Accordion.Item>

                <Accordion.Item 
                    value='details'
                    key='details'
                    className={styles.item}
                >
                    <Accordion.Header>
                        <Accordion.Trigger className={styles.lastTrigger}>
                            <Box
                                display='flex'
                                alignItems='center'
                                gap='10'
                            >
                                <BallotIcon />
                                <Text
                                    as='span'
                                    fontWeight='600'
                                >
                                    Details
                                </Text>
                            </Box>
                            <ChevronIcon />
                        </Accordion.Trigger>
                    </Accordion.Header>
                    <Accordion.Content className={styles.lastContent}>
                        <Box className={styles.details}>
                            <Box className={styles.detailsInfo}>
                                <Text 
                                    as='span'
                                >
                                    Contract address
                                </Text>
                                <Box 
                                    as='a' 
                                    href={`https://etherscan.io/address/${data?.asset_contract?.address}`}
                                >
                                    <Text
                                        color='accentColor'
                                        fontWeight='600' 
                                        fontSize='14'
                                    >
                                        {data?.asset_contract?.address ? truncateAddress(data.asset_contract.address) : ''}
                                    </Text>
                                </Box>
                            </Box>
                            <Box className={styles.detailsInfo}>
                                <Text 
                                    as='span'
                                >
                                    Token ID
                                </Text>
                                <Box 
                                    as='a' 
                                    href={`https://etherscan.io/address/${data?.asset_contract?.address}`}
                                >
                                    <Text
                                        color='accentColor'
                                        fontWeight='600' 
                                        fontSize='14'
                                    >
                                        {data?.token_id}
                                    </Text>
                                </Box>
                            </Box>
                            <Box className={styles.detailsInfo}>
                                <Text 
                                    as='span'
                                >
                                    Token Standard
                                </Text>
                                <Text 
                                    as='span' 
                                    fontWeight='600' 
                                    fontSize='14'
                                >
                                    {data?.asset_contract?.schema_name === ContractSchemas.ERC721 && 'ERC-721'}
                                    {data?.asset_contract?.schema_name === ContractSchemas.ERC1155 && 'ERC-1155'}
                                </Text>
                            </Box>
                            <Box className={styles.detailsInfo}>
                                <Text 
                                    as='span'
                                >
                                    Blockchain
                                </Text>
                                <Text 
                                    as='span' 
                                    fontWeight='600' 
                                    fontSize='14'
                                >
                                    {/* To do: find out where this is should be stored */}
                                    Hardhat
                                </Text>
                            </Box>
                            <Box className={styles.detailsInfo}>
                                <Text 
                                    as='span'
                                >
                                    Creator Earnings
                                </Text>
                                <Text 
                                    as='span'
                                    fontWeight='600' 
                                    fontSize='14'
                                >
                                    {data?.transfer_fee ? data.transfer_fee / 100 + '%' : '0%'}
                                </Text>
                            </Box>
                        </Box>
                    </Accordion.Content>
                </Accordion.Item>
        </Accordion.Root>
    )
}