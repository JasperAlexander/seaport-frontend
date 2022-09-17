// To do: 
// 1. Add posibility to add searchbar inside accordion item

import { FC } from 'react'
import * as Accordion from '@radix-ui/react-accordion'
import { Box } from '../../Box/Box'
import { ChevronIcon } from '../../Icons/ChevronIcon'
import * as styles from './OffersAccordion.css'
import { EventsStateType, EventTypes } from '../../../types/eventTypes'
import { TocIcon } from '../../Icons/TocIcon'
import TimeAgo from 'react-timeago'
import { truncateAddress, truncateEns } from '../../../utils/truncateText'
import { VerifiedIcon } from '../../Icons/VerifiedIcon'
import { Text } from '../../Text/Text'
import { NextLink } from '../../NextLink/NextLink'
import useTranslation from 'next-translate/useTranslation'

interface Props {
    events: EventsStateType
    open?: boolean
}

export const OffersAccordion: FC<Props> = ({
    events: { events, ref },
    open = false
}) => {
    const { t } = useTranslation('common')

    const { data } = events
    const mappedEvents = data ? data.map(({ events }) => events).flat() : []
    const offerEvents = mappedEvents?.filter((event) => {
        return (
            event.type === EventTypes.OfferEntered
        )
    })

    const columns = [
        `${t('price')}`, 
        `${t('fiat')} ${t('price')}`,
        `${t('floorDifference')}`, 
        `${t('expiration')}`, 
        `${t('from')}`, 
        '' // Last column can include actions
    ]

    return (
        <Accordion.Root 
            type="multiple" 
            defaultValue={open ? ['offers']: []}
        >
                <Accordion.Item 
                    value='offers'
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
                                <TocIcon />
                                <Text
                                    as='span'
                                    fontWeight='600'
                                >
                                    {t('offers')}
                                </Text>
                            </Box>
                            <ChevronIcon />
                        </Accordion.Trigger>
                    </Accordion.Header>
                    <Accordion.Content
                        className={styles.content}
                    >
                        {offerEvents?.length > 0 ?
                            <Box 
                                as='table'
                                width='full'
                            >
                                <Box 
                                    as='thead'
                                >
                                    <Box 
                                        as='tr'
                                    >
                                        {columns.map((column) => (
                                            <Box 
                                                as='th'
                                                key={column} 
                                                paddingX='16'
                                                paddingY='4'
                                            >
                                                <Text
                                                    fontSize='15'
                                                >
                                                    {column}
                                                </Text>
                                            </Box>
                                        ))}
                                    </Box>
                                </Box>
                                <Box 
                                    as='tbody' 
                                    background='accordionBackground' 
                                    fontSize='14'
                                >
                                    {offerEvents?.map((event) => (
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
                                                    {/* {event.total_price} */}
                                                </Box>
                                            </Box>
                                            <Box
                                                as='td' 
                                                padding='16'
                                            >
                                                {/* To do: make calculator to get USD prices */}
                                                <Text>
                                                    $300
                                                </Text>
                                            </Box>
                                            <Box
                                                as='td' 
                                                padding='16'
                                            >
                                                {/* To do */}
                                                <Text>
                                                    6% below
                                                </Text>
                                            </Box>
                                            <Box
                                                as='td' 
                                                padding='16'
                                            >
                                                <TimeAgo 
                                                    date={event.created_timestamp} 
                                                    formatter={(value, unit) => `${value} ${unit}${value > 1 ? 's' : ''}`} 
                                                />
                                            </Box>
                                            <Box
                                                as='td' 
                                                padding='16'
                                                display='flex' 
                                                alignItems='center' 
                                                gap='4'
                                            >
                                                <NextLink 
                                                    href={`/${event.from_account?.username ? event.from_account.username : event.from_account?.address}`}
                                                    color='accentColor'
                                                >
                                                    <Text>
                                                        {event.from_account?.username ? truncateEns(event.from_account.username) : event.from_account?.address ? truncateAddress(event.from_account.address) : ''}
                                                        {event.from_account?.config === 'verified' && <VerifiedIcon width='16' fill='accentColor' />}
                                                    </Text>
                                                </NextLink>
                                            </Box>
                                            <Box
                                                as='td' 
                                                padding='16'
                                            >
                                                {/* Action */}
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
                                <Text
                                    as='span'
                                >
                                    {t('noOffersYet')}
                                </Text>
                            </Box>
                        }
                    </Accordion.Content>
                </Accordion.Item>
        </Accordion.Root>
    )
}