import { FC, useEffect, useState } from 'react'
import { AssetType } from '../../../types/assetTypes'
import { EventsStateType, EventTypes } from '../../../types/eventTypes'
import * as Accordion from '@radix-ui/react-accordion'
import * as styles from './AssetPriceAccordion.css'
import { Box } from '../../Box/Box'
import { ScheduleIcon } from '../../Icons/ScheduleIcon'
import { WalletIcon } from '../../Icons/WalletIcon'
import { AccordionItem } from '../AccordionItem/AccordionItem'
import { MainButton } from '../../Buttons/MainButton'
import { MakeOfferDialogTrigger } from '../../DialogTriggers/MakeOfferDialogTrigger'
import { useAccount } from 'wagmi'

interface Props {
    asset: AssetType | undefined
    events: EventsStateType
}

export const AssetPriceAccordion: FC<Props> = ({
    asset,
    events: { events }
}) => {
    const [makeOfferDialogOpen, setMakeOfferDialogOpen] = useState<boolean>(false)

    const { data, isValidating, size } = events
    const mappedEvents = data ? data.map(({ events }) => events).flat() : []

    const lastListing = mappedEvents.filter((e) => (
            e.type === EventTypes.Created
    )).reduce((a, b) => (
            a.created_timestamp > b.created_timestamp ? a : b
    ))

    const lastListingTimeStamp = new Date(lastListing.created_timestamp)
    const [lastListingDateTime, setLastListingDateTime] = useState<string | undefined>(undefined)
    useEffect(() => {
        const newLastListingDateTime = new Intl.DateTimeFormat("en-GB", {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            timeZoneName: 'short'
        }).format(lastListingTimeStamp)
        setLastListingDateTime(newLastListingDateTime)
    })

    // if (lastListingTimeStamp.getTime() > Date.now()) {
        return (
            <Accordion.Root type="single" defaultValue={'pricecontainer'}>
                    <AccordionItem value='pricecontainer'>
                        <Accordion.Header>
                            <Accordion.Trigger className={styles.trigger}>
                                <Box
                                    display='flex'
                                    alignItems='center'
                                    gap='10'
                                >
                                    <ScheduleIcon fill='boxText' />
                                    <Box
                                        as='span'
                                        fontSize='16'
                                        fontWeight='400'
                                        color='defaultText'
                                    >
                                        Sale ends {lastListingDateTime ? lastListingDateTime : 'soon'}
                                    </Box>
                                </Box>
                                {/* <Box>
                                    Countdown when <24 hours
                                </Box> */}
                            </Accordion.Trigger>
                        </Accordion.Header>
                        <Accordion.Content
                            className={styles.content}
                        >
                            {lastListingTimeStamp.getTime() > Date.now() ?
                            <Box
                                padding='20'
                                background='accordionBackground'
                            >
                                
                                <Box fontSize='15' color='boxText'>
                                    Current price
                                </Box>
                                <Box
                                    display='flex'
                                    alignItems='center'
                                    gap='4'
                                    marginBottom='8'
                                    fontSize='30'
                                >
                                    <Box 
                                        as='img'
                                        maxWidth='12'
                                        src={lastListing?.payment_token?.image_url}
                                        marginRight='5'
                                    />
                                    <Box>{lastListing?.total_price}</Box>
                                    <Box 
                                        display='flex' 
                                        marginTop='10' 
                                        fontSize='15'
                                        color='boxText'
                                    >
                                        {/* To do: make token to USD calculator */}
                                            ($50,30)
                                    </Box>
                                </Box>
                                <Box
                                    display='flex'
                                    maxWidth='420'
                                    gap='8'
                                >
                                    <MainButton
                                        onClick={() => { return null }}
                                        width='50p'
                                    >
                                        <WalletIcon width='22' fill='white' />
                                        Buy now
                                    </MainButton>
                                    <MakeOfferDialogTrigger open={makeOfferDialogOpen} setOpen={setMakeOfferDialogOpen} />
                                </Box>
                            </Box>
                            :
                            <Box
                                padding='20'
                                background='accordionBackground'
                            >
                                <MakeOfferDialogTrigger open={makeOfferDialogOpen} setOpen={setMakeOfferDialogOpen} />
                            </Box>
}
                        </Accordion.Content>
                    </AccordionItem>
            </Accordion.Root>
        )
    // } else {
    //     return (
    //         <Box 
    //             margin='20' 
    //             padding='20' 
    //             borderWidth='1' 
    //             borderStyle='solid' 
    //             borderColor='box' 
    //             borderRadius='10'
    //             background='accordionBackground'
    //         >
    //             <MakeOfferDialogTrigger open={makeOfferDialogOpen} setOpen={setMakeOfferDialogOpen} />
    //         </Box>
    //     )
    // }
}