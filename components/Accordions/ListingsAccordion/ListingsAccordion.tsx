// To do: 
// 1. Add posibility to add searchbar inside accordion item

import { FC } from 'react'
import * as Accordion from '@radix-ui/react-accordion'
import { Box } from '../../Box/Box'
import { ChevronIcon } from '../../Icons/ChevronIcon'
import * as styles from './ListingsAccordion.css'
import { EventsStateType, EventTypes } from '../../../types/eventTypes'
import { PriceTagIcon } from '../../Icons/PriceTagIcon'
import TimeAgo from 'react-timeago'
import Link from 'next/link'
import { truncateAddress, truncateEns } from '../../../utils/truncateText'
import { VerifiedIcon } from '../../Icons/VerifiedIcon'
import { AccordionItem } from '../AccordionItem/AccordionItem'
import { MainButton } from '../../Buttons/MainButton'

interface Props {
    data: EventsStateType
    open?: boolean
}

export const ListingsAccordion: FC<Props> = ({
    data: { events, ref },
    open = false
}) => {
    const { data, isValidating, size } = events
    const mappedEvents = data ? data.map(({ events }) => events).flat() : []
    const listingEvents = mappedEvents?.filter((event) => {
        return (
            event.type === EventTypes.Created
        )
    })

    const columns = [
        'Price', 'USD Price', 'Expiration', 'From', '' // Last column can include actions
    ]

    return (
        <Accordion.Root type="multiple" defaultValue={open ? ['listings']: []}>
                <AccordionItem value='listings'>
                    <Accordion.Header>
                        <Accordion.Trigger className={styles.trigger}>
                            <Box
                                display='flex'
                                alignItems='center'
                                gap='10'
                            >
                                <PriceTagIcon />
                                <Box
                                    as='span'
                                    fontSize='16'
                                    fontWeight='600'
                                >
                                    Listings
                                </Box>
                            </Box>
                            <ChevronIcon />
                        </Accordion.Trigger>
                    </Accordion.Header>
                    <Accordion.Content
                        className={styles.content}
                    >
                        {listingEvents?.length > 0 ?
                            <Box 
                                as='table'
                                width='full'
                            >
                                <Box as='thead' fontSize='15'>
                                    <Box as='tr'>
                                        {columns.map((column) => (
                                            <Box 
                                                as='th'
                                                fontWeight='400'
                                                key={column} 
                                                paddingX='16'
                                                paddingY='4'
                                            >
                                                {column}
                                            </Box>
                                        ))}
                                    </Box>
                                </Box>
                                <Box as='tbody' background='accordionBackground' fontSize='14'>
                                    {listingEvents?.map((event) => (
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
                                                    {event.total_price}
                                                </Box>
                                            </Box>
                                            <Box
                                                as='td' 
                                                padding='16'
                                            >
                                                {/* To do: make calculator to get USD prices */}
                                                $300
                                            </Box>
                                            <Box
                                                as='td' 
                                                padding='16'
                                            >
                                                <TimeAgo date={event.created_timestamp} formatter={(value, unit) => `${value} ${unit}`} />
                                            </Box>
                                            <Box
                                                as='td' 
                                                padding='16'
                                            >
                                                <Link href={`/${event.from_account?.username ? event.from_account.username : event.from_account?.address}`} passHref={true}>
                                                    <Box as='a' display='flex' alignItems='center' gap='4' color='accentColor'>
                                                        {event.from_account?.username ? truncateEns(event.from_account.username) : event.from_account?.address ? truncateAddress(event.from_account.address) : ''}
                                                        {event.from_account?.config === 'verified' && <VerifiedIcon width='16' fill='accentColor' />}
                                                    </Box>
                                                </Link>
                                            </Box>
                                            <Box
                                                as='td' 
                                                padding='16'
                                            >
                                                {/* Only buy now when listing is not cancelled */}
                                                <MainButton 
                                                    variant='secondary' 
                                                    size='small'
                                                >
                                                    Buy
                                                </MainButton>
                                            </Box>
                                        </Box>
                                    ))}
                                </Box>
                            </Box>
                        :
                            <Box
                                display='flex'
                                alignItems='center'
                                justifyContent='center'
                                padding='20'
                            >
                                No listings yet
                            </Box>
                        }
                    </Accordion.Content>
                </AccordionItem>
        </Accordion.Root>
    )
}