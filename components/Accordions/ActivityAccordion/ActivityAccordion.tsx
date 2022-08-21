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
import Link from 'next/link'
import { truncateAddress, truncateEns } from '../../../utils/truncateText'
import TimeAgo from 'react-timeago'
import { SaleIcon } from '../../Icons/SaleIcon'
import { TransferIcon } from '../../Icons/TransferIcon'
import { BidWithdrawnIcon } from '../../Icons/BidWithdrawnIcon'
import { CancelIcon } from '../../Icons/CancelIcon'
import { VerifiedIcon } from '../../Icons/VerifiedIcon'
import { AccordionItem } from '../AccordionItem/AccordionItem'
import useUser from '../../../hooks/useUser'
import { useRouter } from 'next/router'
import useUsers from '../../../hooks/useUsers'
import useToken from '../../../hooks/useToken'

interface Props {
    data: EventsStateType
    open?: boolean
}

export const ActivityAccordion: FC<Props> = ({
    data: { events, ref },
    open = false
}) => {
    const router = useRouter()
    
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
                <AccordionItem value='activity'>
                    <Accordion.Header>
                        <Accordion.Trigger className={styles.trigger}>
                            <Box
                                display='flex'
                                alignItems='center'
                                gap='10'
                            >
                                <VerticalSwapIcon />
                                <Box
                                    as='span'
                                    fontSize='16'
                                    fontWeight='600'
                                >
                                    Item Activity
                                </Box>
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
                                                            Created
                                                        </Box>
                                                    }
                                                    {event.type === 'succesfull' &&
                                                        <Box
                                                            display='flex'
                                                            alignItems='center'
                                                            gap='8'
                                                        >
                                                            <SaleIcon />
                                                            Sale
                                                        </Box>
                                                    }
                                                    {event.type === 'cancelled' &&
                                                        <Box
                                                            display='flex'
                                                            alignItems='center'
                                                            gap='8'
                                                        >
                                                            <CancelIcon />
                                                            Cancel
                                                        </Box>
                                                    }
                                                    {event.type === 'bid_entered' &&
                                                        <Box
                                                            display='flex'
                                                            alignItems='center'
                                                            gap='8'
                                                        >
                                                            <OfferIcon width='18' />
                                                            Offer
                                                        </Box>
                                                    }
                                                    {event.type === 'bid_withdrawn' &&
                                                        <Box
                                                            display='flex'
                                                            alignItems='center'
                                                            gap='8'
                                                        >
                                                            <BidWithdrawnIcon />
                                                            Offer Cancel
                                                        </Box>
                                                    }
                                                    {event.type === 'transfer' &&
                                                        <Box
                                                            display='flex'
                                                            alignItems='center'
                                                            gap='8'
                                                        >
                                                            <TransferIcon />
                                                            Transfer
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
                                                    <Link 
                                                        href={`/${event.from_account.username ? event.from_account.username : event.from_account.address}`} 
                                                        passHref={true}
                                                    >
                                                        <Box 
                                                            as='a' 
                                                            display='flex' 
                                                            alignItems='center' 
                                                            gap='4' 
                                                            color='accentColor'
                                                        >
                                                            {event.from_account.username ? truncateEns(event.from_account.username) : event.from_account.address ? truncateAddress(event.from_account.address) : ''}
                                                            {event.from_account.config === 'verified' && <VerifiedIcon width='16' fill='accentColor' />}
                                                        </Box>
                                                    </Link>
                                                }
                                            </Box>
                                            <Box
                                                as='td' 
                                                padding='16'
                                            >
                                                {event.to_account &&
                                                    <Link 
                                                        href={`/${event.to_account.username ? event.to_account.username : event.to_account.address}`} 
                                                        passHref={true}
                                                    >
                                                        <Box 
                                                            as='a' 
                                                            display='flex'
                                                            alignItems='center' 
                                                            gap='4' 
                                                            color='accentColor'
                                                        >
                                                            {event.to_account.username ? truncateEns(event.to_account.username) : event.to_account.address ? truncateAddress(event.to_account.address) : ''}
                                                            {event.to_account.config === 'verified' && <VerifiedIcon width='16' fill='accentColor' />}
                                                        </Box>
                                                    </Link>
                                                }
                                            </Box>
                                            <Box
                                                as='td' 
                                                padding='16'
                                            >
                                                <Box as='a'>
                                                    <TimeAgo 
                                                        date={event.created_timestamp} 
                                                        formatter={(value, unit) => `${value} ${unit} ago`} 
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
                                                Minted
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
                                        {/* <Link href={`/${event.from_account?.username ? event.from_account.username : event.from_account?.address}`} passHref={true}>
                                            <Box as='a' display='flex' alignItems='center' gap='4' color='accentColor'>
                                                {event.from_account?.username ? truncateEns(event.from_account.username) : event.from_account?.address ? truncateAddress(event.from_account.address) : ''}
                                                {event.from_account?.config === 'verified' && <VerifiedIcon width='16' fill='accentColor' />}
                                            </Box>
                                        </Link> */}
                                        Creator
                                    </Box>
                                    <Box
                                        as='td' 
                                        padding='16'
                                    >
                                        {/* <Box as='a'>
                                            <TimeAgo date={event.created_timestamp} formatter={(value, unit) => `${value} ${unit} ago`} />
                                        </Box> */}
                                        Date
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    </Accordion.Content>
                </AccordionItem>
        </Accordion.Root>
    )
}