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
import { PriceTagIcon } from '../../Icons/PriceTagIcon'
import useMounted from '../../../hooks/useMounted'
import { Text } from '../../Text/Text'
import { TokensStateType } from '../../../types/tokenTypes'

interface Props {
    asset: AssetType | undefined
    lastListingEvent: any
    tokens: TokensStateType
}

export const AssetPriceAccordion: FC<Props> = ({
    asset,
    lastListingEvent,
    tokens
}) => {
    const [makeOfferDialogOpen, setMakeOfferDialogOpen] = useState<boolean>(false)
    const { mounted } = useMounted()

    const isListed: boolean = lastListingEvent?.type === EventTypes.Created
    const [lastListingFormattedTimeStamp, setLastListingFormattedTimeStamp] = useState<string | undefined>(undefined)
    if (mounted && isListed) {
        const lastListingTimeStamp = new Date(lastListingEvent.created_timestamp)
        const formattedLastListingTimeStamp = new Intl.DateTimeFormat("en-GB", {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            timeZoneName: 'short'
        }).format(lastListingTimeStamp)
        setLastListingFormattedTimeStamp(formattedLastListingTimeStamp)
    }

    if (isListed) {
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
                                    <Text
                                        as='span'
                                    >
                                        Sale ends {lastListingFormattedTimeStamp}
                                    </Text>
                                </Box>
                                {/* <Box>
                                    Countdown when <24 hours
                                </Box> */}
                            </Accordion.Trigger>
                        </Accordion.Header>
                        <Accordion.Content
                            className={styles.content}
                        >
                            {/* {lastListingTimeStamp.getTime() > Date.now() ? */}
                            <Box
                                padding='20'
                                background='accordionBackground'
                            >
                                
                                <Text 
                                    fontSize='15' 
                                    color='boxText'
                                >
                                    Current price
                                </Text>
                                <Box
                                    display='flex'
                                    alignItems='center'
                                    gap='4'
                                    marginBottom='8'
                                    fontSize='30'
                                >
                                    {/* <Box 
                                        as='img'
                                        maxWidth='12'
                                        src={lastListing?.payment_token?.image_url}
                                        marginRight='5'
                                    /> */}
                                    <Box>
                                        1.5
                                        {/* {lastListing?.total_price} */}
                                    </Box>
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
                                        width='50p'
                                    >
                                        <WalletIcon width='22' fill='white' />
                                        Buy now
                                    </MainButton>
                                    <MakeOfferDialogTrigger 
                                        open={makeOfferDialogOpen} 
                                        setOpen={setMakeOfferDialogOpen} 
                                        tokens={tokens}
                                    >
                                        <MainButton
                                            variant='secondary'
                                            width='50p'
                                        >
                                            <PriceTagIcon width='22' fill='accentColor' />
                                            Make offer
                                        </MainButton>
                                    </MakeOfferDialogTrigger>
                                </Box>
                            </Box>
                            {/* : */}
                            <Box
                                padding='20'
                                background='accordionBackground'
                            >
                                <MakeOfferDialogTrigger 
                                    open={makeOfferDialogOpen} 
                                    setOpen={setMakeOfferDialogOpen} 
                                    tokens={tokens}
                                >
                                    <MainButton
                                        variant='secondary'
                                        width='50p'
                                    >
                                        <PriceTagIcon width='22' fill='accentColor' />
                                        Make offer
                                    </MainButton>
                                </MakeOfferDialogTrigger>
                            </Box>
                        </Accordion.Content>
                    </AccordionItem>
            </Accordion.Root>
        )
    } else {
        return (
            <Box 
                margin='20' 
                padding='20' 
                borderWidth='1' 
                borderStyle='solid' 
                borderColor='box' 
                borderRadius='10'
                background='accordionBackground'
            >
                <MakeOfferDialogTrigger 
                    open={makeOfferDialogOpen} 
                    setOpen={setMakeOfferDialogOpen}
                    tokens={tokens}
                >
                    <MainButton
                        variant='secondary'
                    >
                        Make offer
                    </MainButton>
                </MakeOfferDialogTrigger>
            </Box>
        )
    }
}