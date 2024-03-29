// To do: 
// 1. Add posibility to add searchbar inside accordion item

import { FC, useState } from 'react'
import * as Accordion from '@radix-ui/react-accordion'
import { Box } from '../../Box/Box'
import { ChevronIcon } from '../../Icons/ChevronIcon'
import * as styles from './ListingsAccordion.css'
import { PriceTagIcon } from '../../Icons/PriceTagIcon'
import TimeAgo from 'react-timeago'
import { MainButton } from '../../Buttons/MainButton/MainButton'
import { OrdersStateType } from '../../../types/orderTypes'
import { AssetReadType } from '../../../types/assetTypes'
import useTranslation from 'next-translate/useTranslation'
import { DialogTrigger } from '../../DialogTrigger/DialogTrigger'
import { CancelListingDialogContent } from '../../DiaglogContents/CancelListingDialogContent'

interface Props {
    orders: OrdersStateType
    asset: AssetReadType | undefined
    open?: boolean
    isOwner: boolean
}

export const ListingsAccordion: FC<Props> = ({
    orders: { orders, ref },
    asset,
    open = false,
    isOwner
}) => {
    const { t } = useTranslation('common')

    const [cancelListingDialogOpen, setCancelListingDialogOpen] = useState<boolean>(false)

    const { data } = orders
    const mappedOrders = data ? data.map(({ orders }) => orders).flat() : []
    const currentListings = mappedOrders?.filter((order) => {
        return (
            Number(order?.parameters.endTime) < Date.now()
        )
    })

    const columns = [
        'Price', 'USD Price', 'Expiration', 'From', '' // Last column can include actions
    ]

    return (
        <Accordion.Root 
            type="multiple" 
            defaultValue={open ? ['listings']: []}
        >
            <Accordion.Item 
                value='listings'
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
                            <PriceTagIcon />
                            <Box
                                as='span'
                                fontSize='16'
                                fontWeight='600'
                            >
                                {t('listings')}
                            </Box>
                        </Box>
                        <ChevronIcon />
                    </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content
                    className={styles.content}
                >
                    {currentListings?.length > 0 ?
                        <Box 
                            as='table'
                            width='full'
                        >
                            <Box 
                                as='thead' 
                                fontSize='15'
                            >
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
                            <Box 
                                as='tbody' 
                                background='accordionBackground' 
                                fontSize='14'
                            >
                                {currentListings?.map((listing) => { 
                                    const expiration = new Date(Number(listing?.parameters.endTime) * 1000)

                                    return (
                                        <Box 
                                            as='tr'
                                            key={listing.parameters.salt}
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
                                                    {/* <Box 
                                                        as='img'
                                                        maxWidth='12'
                                                        src={event.payment_token.image_url}
                                                    /> */}
                                                    {listing.parameters.offer[0].startAmount}
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
                                                <TimeAgo 
                                                    date={expiration} 
                                                    formatter={(value, unit) => `${value} ${unit}${value > 1 ? 's' : ''}`} 
                                                />
                                            </Box>
                                            <Box
                                                as='td' 
                                                padding='16'
                                            >
                                                {/* <NextLink href={`/${event.from_account?.username ? event.from_account.username : event.from_account?.address}`}
                                                    display='flex' alignItems='center' gap='4' color='accentColor'>
                                                        {event.from_account?.username ? truncateEns(event.from_account.username) : event.from_account?.address ? truncateAddress(event.from_account.address) : ''}
                                                        {event.from_account?.config === 'verified' && <VerifiedIcon width='16' fill='accentColor' />}
                                                </NextLink> */}
                                            </Box>
                                            <Box
                                                as='td' 
                                                padding='16'
                                            >
                                                {/* Only buy now when listing is not cancelled */}
                                                {!isOwner
                                                    ?
                                                        <MainButton 
                                                            variant='secondary' 
                                                            size='small'
                                                        >
                                                            {t('buy')}
                                                        </MainButton>
                                                    :
                                                        asset &&
                                                        <DialogTrigger
                                                            content={
                                                                <CancelListingDialogContent 
                                                                    open={cancelListingDialogOpen} 
                                                                    setOpen={setCancelListingDialogOpen} 
                                                                    asset={asset}
                                                                    order={listing}
                                                                />
                                                            }
                                                            open={cancelListingDialogOpen}
                                                            setOpen={setCancelListingDialogOpen}
                                                        >
                                                            <MainButton 
                                                                variant='secondary' 
                                                                size='small'
                                                            >
                                                                {t('cancel')}
                                                            </MainButton>
                                                        </DialogTrigger>
                                                }
                                            </Box>
                                        </Box>
                                    )
                                })}
                            </Box>
                        </Box>
                    :
                        <Box
                            display='flex'
                            alignItems='center'
                            justifyContent='center'
                            padding='20'
                        >
                            {t('noListingsYet')}
                        </Box>
                    }
                </Accordion.Content>
            </Accordion.Item>
        </Accordion.Root>
    )
}