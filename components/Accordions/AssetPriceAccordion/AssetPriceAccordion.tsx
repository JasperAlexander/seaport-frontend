import { FC, useEffect, useState } from 'react'
import { AssetReadType } from '../../../types/assetTypes'
import { EventTypes } from '../../../types/eventTypes'
import * as Accordion from '@radix-ui/react-accordion'
import * as styles from './AssetPriceAccordion.css'
import { Box } from '../../Box/Box'
import { ScheduleIcon } from '../../Icons/ScheduleIcon'
import { WalletIcon } from '../../Icons/WalletIcon'
import { MainButton } from '../../Buttons/MainButton/MainButton'
import { MakeOfferDialogTrigger } from '../../DialogTriggers/MakeOfferDialogTrigger'
import { PriceTagIcon } from '../../Icons/PriceTagIcon'
import useMounted from '../../../hooks/useMounted'
import { Text } from '../../Text/Text'
import { TokensStateType } from '../../../types/tokenTypes'
import { OrderType } from '../../../types/orderTypes'
import { CompletePurchaseDialogTrigger } from '../../DialogTriggers/CompletePurchaseDialogTrigger'
import useTranslation from 'next-translate/useTranslation'

interface Props {
    asset: AssetReadType | undefined
    lastListing: OrderType | undefined
    tokens: TokensStateType
}

export const AssetPriceAccordion: FC<Props> = ({
    asset,
    lastListing,
    tokens
}) => {
    const { t } = useTranslation('common')
    const { mounted } = useMounted()

    const [makeOfferDialogOpen, setMakeOfferDialogOpen] = useState<boolean>(false)
    const [completePurchaseDialogOpen, setCompletePurchaseDialogOpen] = useState<boolean>(false)
    const [lastListingFormattedTimeStamp, setLastListingFormattedTimeStamp] = useState<string | undefined>(undefined)

    useEffect(() => {
        if (mounted && lastListing) {
            const formattedLastListingTimeStamp = new Intl.DateTimeFormat("en-GB", {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                timeZoneName: 'short'
            }).format(Number(lastListing.expiration_time) * 1000)
            setLastListingFormattedTimeStamp(formattedLastListingTimeStamp)
        }
    })

    if (lastListing) {
        return (
            <Accordion.Root 
                type="single" 
                defaultValue={'pricecontainer'}
            >
                    <Accordion.Item 
                        value='pricecontainer'
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
                                    <ScheduleIcon fill='boxText' />
                                    <Text
                                        as='span'
                                    >
                                        {t('sale')} {t('ends')} {lastListingFormattedTimeStamp}
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
                                    {t('currentPrice')}
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
                                    {asset &&
                                        <CompletePurchaseDialogTrigger
                                            open={completePurchaseDialogOpen}
                                            setOpen={setCompletePurchaseDialogOpen}
                                            asset={asset}
                                            order={lastListing}
                                        >
                                            <MainButton
                                                width='50p'
                                                onlyText={false}
                                            >
                                                <WalletIcon 
                                                    width='22' 
                                                    fill='white' 
                                                />
                                                <Text
                                                    color='white'
                                                >
                                                    {t('buyNow')}
                                                </Text>
                                            </MainButton>
                                        </CompletePurchaseDialogTrigger>
                                    }
                                    <MakeOfferDialogTrigger 
                                        open={makeOfferDialogOpen} 
                                        setOpen={setMakeOfferDialogOpen} 
                                        tokens={tokens}
                                    >
                                        <MainButton
                                            variant='secondary'
                                            width='50p'
                                            onlyText={false}
                                        >
                                            <PriceTagIcon width='22' fill='accentColor' />
                                            <Text
                                                color='accentColor'
                                            >
                                                {t('makeOffer')}
                                            </Text>
                                        </MainButton>
                                    </MakeOfferDialogTrigger>
                                </Box>
                            </Box>
                            {/* : */}
                            {/* <Box
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
                            </Box> */}
                        </Accordion.Content>
                    </Accordion.Item>
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
                        {t('makeOffer')}
                    </MainButton>
                </MakeOfferDialogTrigger>
            </Box>
        )
    }
}