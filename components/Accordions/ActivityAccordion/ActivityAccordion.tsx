// To do: 
// 1. Add posibility to add searchbar inside accordion item

import { FC, Fragment } from 'react'
import * as Accordion from '@radix-ui/react-accordion'
import { Box } from '../../Box/Box'
import { ChevronIcon } from '../../Icons/ChevronIcon'
import * as styles from './ActivityAccordion.css'
import { EventsStateType, EventTypes } from '../../../types/eventTypes'
import { VerticalSwapIcon } from '../../Icons/VerticalSwapIcon'
import { MintedIcon } from '../../Icons/MintedIcon'
import { OfferIcon } from '../../Icons/OfferIcon'
import { PriceTagIcon } from '../../Icons/PriceTagIcon'
import { truncateAddress, truncateEns } from '../../../utils/truncateText'
import TimeAgo from 'react-timeago'
import { SaleIcon } from '../../Icons/SaleIcon'
import { TransferIcon } from '../../Icons/TransferIcon'
import { BidWithdrawnIcon } from '../../Icons/BidWithdrawnIcon'
import { CancelIcon } from '../../Icons/CancelIcon'
import { VerifiedIcon } from '../../Icons/VerifiedIcon'
import { Text } from '../../Text/Text'
import { NextLink } from '../../NextLink/NextLink'
import useTranslation from 'next-translate/useTranslation'

interface Props {
    events: EventsStateType
    open?: boolean
}

export const ActivityAccordion: FC<Props> = ({
    events: { events, ref },
    open = false
}) => {
    const { t } = useTranslation('common')
    
    const { data, isValidating, size } = events
    const mappedEvents = data ? data.map(({ events }) => events).flat() : []
    const mappedSortedEvents = mappedEvents.sort((a, b) => a.created_timestamp < b.created_timestamp ? 1 : -1 )

    const columns = [
        'Event', 'Price', 'From', 'To', 'Date' // Last column can include actions
    ]

    return (
        <Accordion.Root 
            type="multiple" 
            defaultValue={open ? ['activity']: []}
        >
                <Accordion.Item 
                    value='activity'
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
                                <VerticalSwapIcon />
                                <Text
                                    as='span'
                                    fontWeight='600'
                                >
                                    {t('itemActivity')}
                                </Text>
                            </Box>
                            <ChevronIcon />
                        </Accordion.Trigger>
                    </Accordion.Header>
                    <Accordion.Content
                        className={styles.content}
                    >
                        <Box 
                            as='table'
                            width='full'
                        >
                            <Box 
                                as='thead' 
                                fontSize='15'
                            >
                                <Box as='tr'>
                                    {columns.map((column, columnIndex) => (
                                        <Box 
                                            as='th'
                                            fontWeight='400'
                                            key={columnIndex} 
                                            paddingX='16'
                                            paddingY='4'
                                        >
                                            {column}
                                        </Box>
                                    ))}
                                </Box>
                            </Box>
                            <Box 
                                as='tbody' 
                                background='accordionBackground' 
                                fontSize='15'
                            >
                                {mappedSortedEvents?.map((event) => (
                                    <Fragment>
                                        <Box 
                                            as='tr'
                                            key={event.created_timestamp}
                                            borderTopWidth='1'
                                            borderStyle='solid'
                                            borderColor='box'
                                        > 
                                            <Box
                                                as='td' 
                                                padding='16'
                                            >
                                                <Box>
                                                    {event.type === 'created' &&
                                                        <Box
                                                            display='flex'
                                                            alignItems='center'
                                                            gap='8'
                                                        >
                                                            <PriceTagIcon />
                                                            {t('created')}
                                                        </Box>
                                                    }
                                                    {event.type === 'succesfull' &&
                                                        <Box
                                                            display='flex'
                                                            alignItems='center'
                                                            gap='8'
                                                        >
                                                            <SaleIcon />
                                                            {t('sale')}
                                                        </Box>
                                                    }
                                                    {event.type === 'cancelled' &&
                                                        <Box
                                                            display='flex'
                                                            alignItems='center'
                                                            gap='8'
                                                        >
                                                            <CancelIcon />
                                                            {t('cancel')}
                                                        </Box>
                                                    }
                                                    {event.type === 'bid_entered' &&
                                                        <Box
                                                            display='flex'
                                                            alignItems='center'
                                                            gap='8'
                                                        >
                                                            <OfferIcon width='18' />
                                                            {t('offer')}
                                                        </Box>
                                                    }
                                                    {event.type === 'bid_withdrawn' &&
                                                        <Box
                                                            display='flex'
                                                            alignItems='center'
                                                            gap='8'
                                                        >
                                                            <BidWithdrawnIcon />
                                                            {t('offer')} {t('cancel')}
                                                        </Box>
                                                    }
                                                    {event.type === 'transfer' &&
                                                        <Box
                                                            display='flex'
                                                            alignItems='center'
                                                            gap='8'
                                                        >
                                                            <TransferIcon />
                                                            {t('transfer')}
                                                        </Box>
                                                    }
                                                    {/* Unknown event types
                                                    {event.type === 'offer_entered' &&
                                                        <Box
                                                            display='flex'
                                                            alignItems='center'
                                                            gap='8'
                                                        >
                                                            <TransferIcon />
                                                            Offer
                                                        </Box>
                                                    }
                                                    {event.type === 'approve' &&
                                                        <Box
                                                            display='flex'
                                                            alignItems='center'
                                                            gap='8'
                                                        >
                                                            <TransferIcon />
                                                            Approve
                                                        </Box>
                                                    } */}
                                                </Box>
                                            </Box>
                                            <Box
                                                as='td' 
                                                padding='16'
                                            >
                                                {event.payment_token &&
                                                    <Box
                                                        display='flex'
                                                        alignItems='center'
                                                        gap='8'
                                                    >
                                                        <Box 
                                                            as='img'
                                                            maxWidth='12'
                                                            src={event.payment_token.image_url}
                                                        />
                                                        {/* Should be a calculation based on start amount, end and start time */}
                                                        {event.end_amount}
                                                    </Box>
                                                }
                                            </Box>
                                            <Box
                                                as='td' 
                                                padding='16'
                                            >
                                                {event.from_account &&
                                                    <NextLink 
                                                        href={`/${event.from_account.username ? event.from_account.username : event.from_account.address}`} 
                                                        display='flex' 
                                                        alignItems='center' 
                                                        gap='4' 
                                                        color='accentColor'
                                                    >
                                                        {event.from_account.username ? truncateEns(event.from_account.username) : event.from_account.address ? truncateAddress(event.from_account.address) : ''}
                                                        {event.from_account.config === 'verified' && <VerifiedIcon width='16' fill='accentColor' />}
                                                    </NextLink>
                                                }
                                            </Box>
                                            <Box
                                                as='td' 
                                                padding='16'
                                            >
                                                {event.to_account &&
                                                    <NextLink 
                                                        href={`/${event.to_account.username ? event.to_account.username : event.to_account.address}`} 
                                                        display='flex'
                                                        alignItems='center' 
                                                        gap='4' 
                                                        color='accentColor'
                                                    >
                                                        {event.to_account.username ? truncateEns(event.to_account.username) : event.to_account.address ? truncateAddress(event.to_account.address) : ''}
                                                        {event.to_account.config === 'verified' && <VerifiedIcon width='16' fill='accentColor' />}
                                                    </NextLink>
                                                }
                                            </Box>
                                            <Box
                                                as='td' 
                                                padding='16'
                                            >
                                                <Box as='a'>
                                                    <TimeAgo 
                                                        date={event.created_timestamp} 
                                                        formatter={(value, unit) => `${value} ${unit}${value > 1 ? 's' : ''} ago`} 
                                                    />
                                                </Box>
                                            </Box>
                                        </Box>
                                    </Fragment>
                                ))}
                                {/* Making an event at asset creation is not needed when using the row below */}
                                <Box 
                                    as='tr'
                                    borderTopWidth='1'
                                    borderStyle='solid'
                                    borderColor='box'
                                    fontSize='15'
                                > 
                                    <Box
                                        as='td' 
                                        padding='16'
                                    >
                                        <Box>
                                            <Box
                                                display='flex'
                                                alignItems='center'
                                                gap='8'
                                            >
                                                <MintedIcon />
                                                {t('minted')}
                                            </Box>
                                        </Box>
                                    </Box>
                                    <Box
                                        as='td' 
                                        padding='16'
                                    />
                                    <Box
                                        as='td' 
                                        padding='16'
                                    />
                                    <Box
                                        as='td' 
                                        padding='16'
                                    >
                                        {/* <NextLink href={`/${event.from_account?.username ? event.from_account.username : event.from_account?.address}`}
                                            display='flex' alignItems='center' gap='4' color='accentColor'>
                                                {event.from_account?.username ? truncateEns(event.from_account.username) : event.from_account?.address ? truncateAddress(event.from_account.address) : ''}
                                                {event.from_account?.config === 'verified' && <VerifiedIcon width='16' fill='accentColor' />}
                                        </NextLink> */}
                                        {t('creator')}
                                    </Box>
                                    <Box
                                        as='td' 
                                        padding='16'
                                    >
                                        {/* <Box as='a'>
                                            <TimeAgo 
                                                date={event.created_timestamp} 
                                                formatter={(value, unit) => `${value} ${unit}${value > 1 ? 's' : ''} ago`} 
                                            />
                                        </Box> */}
                                        {t('date')}
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    </Accordion.Content>
                </Accordion.Item>
        </Accordion.Root>
    )
}