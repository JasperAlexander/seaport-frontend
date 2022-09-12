import { Dispatch, FC, SetStateAction, useState } from 'react'
import { Box } from '../Box/Box'
import * as Dialog from '@radix-ui/react-dialog'
import * as styles from './DialogContent.css'
import { ChevronHorIcon } from '../Icons/ChevronHorIcon'
import { Text } from '../Text/Text'
import { ExploreIcon } from '../Icons/ExploreIcon'
import { NextLink } from '../NextLink/NextLink'
import { PersonOutlinedIcon } from '../Icons/PersonOutlinedIcon'
import { NightModeToggle } from '../Toggles/NightModeToggle'
import { ModeNightIcon } from '../Icons/ModeNightIcon'
import { WalletSideDialogTrigger } from '../DialogTriggers/WalletSideDialogTrigger'
import { WalletOutlinedIcon } from '../Icons/WalletOutlinedIcon'
import { BarChartIcon } from '../Icons/BarChartIcon'
import { BooksOutlinedIcon } from '../Icons/BooksOutlinedIcon'
import { TwitterIcon } from '../Icons/TwitterIcon'
import { GitHubIcon } from '../Icons/GitHubIcon'
import { InstagramIcon } from '../Icons/InstagramIcon'
import { TikTokIcon } from '../Icons/TikTokIcon'
import { YoutubeIcon } from '../Icons/YoutubeIcon'
import { RedditIcon } from '../Icons/RedditIcon'
import { DiscordIcon } from '../Icons/DiscordIcon'

const TWITTER_URL = process.env.NEXT_PUBLIC_TWITTER_URL
const GITHUB_URL = process.env.NEXT_PUBLIC_GITHUB_URL
const INSTAGRAM_URL = process.env.NEXT_PUBLIC_INSTAGRAM_URL
const DISCORD_URL = process.env.NEXT_PUBLIC_DISCORD_URL
const REDDIT_URL = process.env.NEXT_PUBLIC_REDDIT_URL
const YOUTUBE_URL = process.env.NEXT_PUBLIC_YOUTUBE_URL
const TIKTOK_URL = process.env.NEXT_PUBLIC_TIKTOK_URL

interface Props {
    open: boolean
    setOpen: Dispatch<SetStateAction<boolean>>
}

export const MenuSideDialogContent: FC<Props> = ({
    open,
    setOpen
}) => {
    const [walletSideDialogOpen, setWalletSideDialogOpen] = useState<boolean>(false)
    
    return (
        <Dialog.Content 
            asChild={true}
        >
            <Box
                as='aside'
                className={styles.sideDialogContentContainer}
                style={{height: 'calc(100% - 72px)'}}
            >
                <Box
                    display='flex'
                    flexDirection='column'
                    height='full'
                >
                    <Box
                        display='flex'
                        flexDirection='column'
                        flexGrow='1'
                        flexShrink='0'
                        flexBasis='0'
                        // height='full'
                        paddingX='10'
                        overflowY='auto'
                    >
                        <Box
                            as='button' 
                            onClick={() => setOpen(false)}
                            className={styles.sideDialogMenuItem}
                        >
                            <Box
                                display='flex'
                                alignItems='center'
                                gap='8'
                            >
                                <ExploreIcon 
                                    width='32' 
                                />
                                <Text
                                    hoverColor='defaultTextHover'
                                    fontWeight='600'
                                >
                                    Explore
                                </Text>
                            </Box>
                            <ChevronHorIcon />
                        </Box>
                        <Box
                            as='button' 
                            onClick={() => setOpen(false)}
                            className={styles.sideDialogMenuItem}
                        >
                            <Box
                                display='flex'
                                alignItems='center'
                                gap='8'
                            >
                                <BarChartIcon 
                                    width='32'
                                />
                                <Text
                                    hoverColor='defaultTextHover'
                                    fontWeight='600'
                                >
                                    Stats
                                </Text>
                            </Box>
                            <ChevronHorIcon />
                        </Box>
                        <Box
                            as='button' 
                            onClick={() => setOpen(false)}
                            className={styles.sideDialogMenuItem}
                        >
                            <Box
                                display='flex'
                                alignItems='center'
                                gap='8'
                            >
                                <BooksOutlinedIcon 
                                    width='32'
                                />
                                <Text
                                    hoverColor='defaultTextHover'
                                    fontWeight='600'
                                >
                                    Resources
                                </Text>
                            </Box>
                            <ChevronHorIcon />
                        </Box>
                        <Box
                            as='button' 
                            onClick={() => setOpen(false)}
                            className={styles.sideDialogMenuItem}
                        >
                            <Box
                                display='flex'
                                alignItems='center'
                                gap='8'
                            >
                                <PersonOutlinedIcon
                                    width='32'
                                />
                                <Text
                                    hoverColor='defaultTextHover'
                                    fontWeight='600'
                                >
                                    Account
                                </Text>
                            </Box>
                            <ChevronHorIcon />
                        </Box>
                        <WalletSideDialogTrigger
                            open={walletSideDialogOpen}
                            setOpen={setWalletSideDialogOpen}
                        >
                            <Box
                                as='button' 
                                // onClick={() => setOpen(false)}
                                className={styles.sideDialogMenuItem}
                            >
                                <Box
                                    display='flex'
                                    alignItems='center'
                                    gap='8'
                                >
                                    <WalletOutlinedIcon 
                                        width='32'
                                    />
                                    <Text
                                        hoverColor='defaultTextHover'
                                        fontWeight='600'
                                    >
                                        My Wallet
                                    </Text>
                                </Box>
                            </Box>
                        </WalletSideDialogTrigger>
                        <Box
                            as='button' 
                            // onClick={() => setOpen(false)}
                            className={styles.sideDialogMenuItem}
                        >
                            <Box
                                display='flex'
                                alignItems='center'
                                gap='8'
                            >
                                <ModeNightIcon 
                                    width='32'
                                />
                                <Text
                                    hoverColor='defaultTextHover'
                                    fontWeight='600'
                                >
                                    Night mode
                                </Text>
                            </Box>
                            <NightModeToggle />
                        </Box>
                    </Box>
                    <Box
                        height='80'
                        width='full'
                        borderTopWidth='1'
                        borderColor='box'
                        borderStyle='solid'
                        display='flex'
                        alignItems='center'
                        justifyContent='center'
                        bottom='0'
                        background='defaultBackground'
                        flexShrink='0'
                    >
                        <Box
                            display='flex'
                            justifyContent='space-between'
                            alignItems='center'
                            height='30'
                            gap='20'
                        >
                            {TWITTER_URL &&
                                <NextLink
                                    href={TWITTER_URL}
                                >
                                    <TwitterIcon 
                                        width='20'
                                        fill='boxText'
                                    />
                                </NextLink>
                            }
                            {GITHUB_URL &&
                                <NextLink
                                    href={GITHUB_URL}
                                >
                                    <GitHubIcon 
                                        width='20'
                                        fill='boxText'
                                    />
                                </NextLink>
                            }
                            {INSTAGRAM_URL &&
                                <NextLink
                                    href={INSTAGRAM_URL}
                                >
                                    <InstagramIcon 
                                        width='20'
                                        fill='boxText'
                                    />
                                </NextLink>
                            }
                            {DISCORD_URL &&
                                <NextLink
                                    href={DISCORD_URL}
                                >
                                    <DiscordIcon 
                                        width='20'
                                        fill='boxText'
                                    />
                                </NextLink>
                            }
                            {REDDIT_URL &&
                                <NextLink
                                    href={REDDIT_URL}
                                >
                                    <RedditIcon 
                                        width='20'
                                        fill='boxText'
                                    />
                                </NextLink>
                            }
                            {YOUTUBE_URL &&
                                <NextLink
                                    href={YOUTUBE_URL}
                                >
                                    <YoutubeIcon 
                                        width='20'
                                        fill='boxText'
                                    />
                                </NextLink>
                            }
                            {TIKTOK_URL &&
                                <NextLink
                                    href={TIKTOK_URL}
                                >
                                    <TikTokIcon 
                                        width='20'
                                        fill='boxText'
                                    />
                                </NextLink>
                            }
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Dialog.Content>
    )
}