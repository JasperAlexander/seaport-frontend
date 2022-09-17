// To do: 
// 1. Add posibility to add searchbar inside accordion item

import { FC } from 'react'
import * as Accordion from '@radix-ui/react-accordion'
import { Box } from '../../Box/Box'
import { ChevronIcon } from '../../Icons/ChevronIcon'
import * as styles from './AssetInfoAccordion.css'
import { AssetReadType } from '../../../types/assetTypes'
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
import useTranslation from 'next-translate/useTranslation'

interface Props {
    asset: AssetReadType | undefined // SWRResponse<AssetType, any> | undefined // AssetStateType
}

export const AssetInfoAccordion: FC<Props> = ({
    asset
}) => {
    const { t } = useTranslation('common')

    return (
        <Accordion.Root 
            type='multiple'
            defaultValue={['description']}
        >
            <Accordion.Item 
                value='description'
                key='description'
            >
                <Accordion.Header>
                    <Accordion.Trigger 
                        className={styles.firstTrigger}
                    >
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
                                {t('description')}
                            </Text>
                        </Box>
                        <ChevronIcon />
                    </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content className={styles.content}>
                    <Box className={styles.description}>
                        <Text>
                            {t('by')}
                            <NextLink 
                                href={`/${asset?.creator?.username ? asset.creator.username : asset?.creator?.address}`}
                                fontWeight='600' 
                                marginLeft='4'
                            >
                                {asset?.creator?.username ? asset.creator.username : asset?.creator?.address}
                            </NextLink>
                            </Text>
                        <Text>
                            {asset?.description}
                        </Text>
                    </Box>
                </Accordion.Content>
            </Accordion.Item>

            <Accordion.Item 
                value='properties'
                key='properties'
            >
                <Accordion.Header>
                    <Accordion.Trigger 
                        className={styles.trigger}
                    >
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
                                {t('properties')}
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
                                {t('about')} {asset?.collection?.name}
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
                                href={`/collection/${asset?.collection?.slug}`}
                            >
                                <Box 
                                    as='img' 
                                    src={asset?.collection?.image_url}
                                    className={styles.collectionImg} 
                                    style={{float: 'left'}}
                                />
                            </NextLink>
                            {asset?.collection?.description}
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
                                    href={asset?.collection?.external_url}
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
                                {asset?.collection?.twitter_username &&
                                    <Box 
                                        as='a'
                                        href={`http://twitter.com/${asset.collection.twitter_username}`}
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
                                {asset?.collection?.instagram_username &&
                                    <Box 
                                        as='a'
                                        href={`http://instagram.com/${asset.collection.instagram_username}`}
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
                                {asset?.collection?.medium_username &&
                                    <Box 
                                        as='a'
                                        href={`http://medium.com/${asset.collection.medium_username}`}
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
            >
                <Accordion.Header>
                    <Accordion.Trigger 
                        className={styles.lastTrigger}
                    >
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
                                {t('details')}
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
                                {t('contractAddress')}
                            </Text>
                            <Box 
                                as='a' 
                                href={`https://etherscan.io/address/${asset?.asset_contract?.address}`}
                            >
                                <Text
                                    color='accentColor'
                                    fontWeight='600' 
                                    fontSize='14'
                                >
                                    {asset?.asset_contract?.address ? truncateAddress(asset.asset_contract.address) : ''}
                                </Text>
                            </Box>
                        </Box>
                        <Box className={styles.detailsInfo}>
                            <Text 
                                as='span'
                            >
                                {t('token')} {t('id')}
                            </Text>
                            <Box 
                                as='a' 
                                href={`https://etherscan.io/address/${asset?.asset_contract?.address}`}
                            >
                                <Text
                                    color='accentColor'
                                    fontWeight='600' 
                                    fontSize='14'
                                >
                                    {asset?.token_id}
                                </Text>
                            </Box>
                        </Box>
                        <Box className={styles.detailsInfo}>
                            <Text 
                                as='span'
                            >
                                {t('token')} {t('standard')}
                            </Text>
                            <Text 
                                as='span' 
                                fontWeight='600' 
                                fontSize='14'
                            >
                                {asset?.asset_contract?.schema_name === ContractSchemas.ERC721 && 'ERC-721'}
                                {asset?.asset_contract?.schema_name === ContractSchemas.ERC1155 && 'ERC-1155'}
                            </Text>
                        </Box>
                        <Box className={styles.detailsInfo}>
                            <Text 
                                as='span'
                            >
                                {t('blockchain')}
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
                                {t('creator')} {t('earnings')}
                            </Text>
                            <Text 
                                as='span'
                                fontWeight='600' 
                                fontSize='14'
                            >
                                {asset?.transfer_fee ? asset.transfer_fee / 100 + '%' : '0%'}
                            </Text>
                        </Box>
                    </Box>
                </Accordion.Content>
            </Accordion.Item>
        </Accordion.Root>
    )
}