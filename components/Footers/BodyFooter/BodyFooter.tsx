import { FC } from 'react'
import { Box } from '../../Box/Box'
import { Text } from '../../Text/Text'
import { NextLink } from '../../NextLink/NextLink'
import { TwitterIcon } from '../../Icons/TwitterIcon'
import { Logo } from '../../Icons/Logo'
import { MailingListForm } from '../../Forms/MailingListForm'
import { GitHubIcon } from '../../Icons/GitHubIcon'
import * as styles from './BodyFooter.css'
import { TikTokIcon } from '../../Icons/TikTokIcon'
import { YoutubeIcon } from '../../Icons/YoutubeIcon'
import { RedditIcon } from '../../Icons/RedditIcon'
import { DiscordIcon } from '../../Icons/DiscordIcon'
import { InstagramIcon } from '../../Icons/InstagramIcon'

const TWITTER_URL = process.env.NEXT_PUBLIC_TWITTER_URL
const GITHUB_URL = process.env.NEXT_PUBLIC_GITHUB_URL
const INSTAGRAM_URL = process.env.NEXT_PUBLIC_INSTAGRAM_URL
const DISCORD_URL = process.env.NEXT_PUBLIC_DISCORD_URL
const REDDIT_URL = process.env.NEXT_PUBLIC_REDDIT_URL
const YOUTUBE_URL = process.env.NEXT_PUBLIC_YOUTUBE_URL
const TIKTOK_URL = process.env.NEXT_PUBLIC_TIKTOK_URL

export const BodyFooter: FC = () => {
    return (
        <Box
            position='relative'
            display='flex'
            justifyContent='center'
            height='auto'
            width='full'
            background='accentColor'
        >
            <Box 
                style={{width: '82.5%'}}
            >
                <Box 
                    display='flex'
                    flexWrap='wrap'
                    paddingBottom='40'
                    marginBottom='20'
                    borderBottomWidth='1'
                    borderStyle='solid'
                    style={{borderColor: 'rgba(229, 232, 235, 0.25)'}}
                >
                    <Box 
                        display='flex'
                        flexDirection='column'
                        marginTop='20'
                        alignItems={{
                            wideScreen: 'flex-start'
                        }}
                        textAlign={{
                            wideScreen: 'left',
                            base: 'center'
                        }}
                        paddingTop={{
                            wideScreen: '40'
                        }}
                        paddingRight={{
                            wideScreen: '64'
                        }}
                        width={{
                            wideScreen: '50p'
                        }}
                    >
                        <Box 
                            marginY='8'
                            textAlign={{
                                wideScreen: 'left',
                                base: 'center'
                            }}
                        >
                            <Text
                                fontSize='20'
                                fontWeight='600'
                                color='white'
                            >
                                Stay in the loop
                            </Text>
                        </Box>
                        <Text
                            color='white'
                        >
                            Join our mailing list to stay in the loop with our newest feature releases, NFT drops, and tips and tricks for navigating OpenFish.
                        </Text>
                        <MailingListForm />
                    </Box>
                    <Box 
                        display='flex'
                        flexDirection='column'
                        alignItems={{
                            wideScreen: 'flex-start'
                        }}
                        textAlign={{
                            wideScreen: 'left'
                        }}
                        paddingTop={{
                            wideScreen: '40',
                            base: '20'
                        }}
                        paddingLeft={{
                            wideScreen: '64'
                        }}
                        width={{
                            wideScreen: '50p',
                            base: 'full'
                        }}
                    >
                        <Box 
                            marginY='8'
                            textAlign={{
                                wideScreen: 'left',
                                base: 'center'
                            }}
                        >
                            <Text
                                fontSize='20'
                                color='white'
                            >
                                Join the community
                            </Text>
                        </Box>
                        <Box 
                            display='flex'
                            flexWrap='wrap'
                            justifyContent='center'
                            textAlign='left'
                        >
                            {TWITTER_URL &&
                                <NextLink
                                    href={TWITTER_URL}
                                    style={{width: '54px', height: '54px'}}
                                    className={styles.footerSocialButton}
                                >
                                    <Box 
                                        display='flex'
                                    >
                                        <TwitterIcon 
                                            fill='white'
                                        />
                                    </Box>
                                </NextLink>
                            }
                            {GITHUB_URL &&
                                <NextLink
                                    href={GITHUB_URL}
                                    style={{width: '54px', height: '54px'}}
                                    className={styles.footerSocialButton}
                                >
                                    <Box 
                                        display='flex'
                                    >
                                        <GitHubIcon 
                                            fill='white'
                                        />
                                    </Box>
                                </NextLink>
                            }
                            {INSTAGRAM_URL &&
                                <NextLink
                                    href={INSTAGRAM_URL}
                                    style={{width: '54px', height: '54px'}}
                                    className={styles.footerSocialButton}
                                >
                                    <Box 
                                        display='flex'
                                    >
                                        <InstagramIcon 
                                            fill='white'
                                        />
                                    </Box>
                                </NextLink>
                            }
                            {DISCORD_URL &&
                                <NextLink
                                    href={DISCORD_URL}
                                    style={{width: '54px', height: '54px'}}
                                    className={styles.footerSocialButton}
                                >
                                    <Box 
                                        display='flex'
                                    >
                                        <DiscordIcon 
                                            fill='white'
                                        />
                                    </Box>
                                </NextLink>
                            }
                            {REDDIT_URL &&
                                <NextLink
                                    href={REDDIT_URL}
                                    style={{width: '54px', height: '54px'}}
                                    className={styles.footerSocialButton}
                                >
                                    <Box 
                                        display='flex'
                                    >
                                        <RedditIcon 
                                            fill='white'
                                        />
                                    </Box>
                                </NextLink>
                            }
                            {YOUTUBE_URL &&
                                <NextLink
                                    href={YOUTUBE_URL}
                                    style={{width: '54px', height: '54px'}}
                                    className={styles.footerSocialButton}
                                >
                                    <Box 
                                        display='flex'
                                    >
                                        <YoutubeIcon 
                                            fill='white'
                                        />
                                    </Box>
                                </NextLink>
                            }
                            {TIKTOK_URL &&
                                <NextLink
                                    href={TIKTOK_URL}
                                    style={{width: '54px', height: '54px'}}
                                    className={styles.footerSocialButton}
                                >
                                    <Box 
                                        display='flex'
                                    >
                                        <TikTokIcon 
                                            fill='white'
                                        />
                                    </Box>
                                </NextLink>
                            }
                        </Box>
                    </Box>
                </Box>
                <Box 
                    display='flex'
                    flexWrap='wrap'
                    paddingBottom='40'
                    marginBottom='20'
                    borderBottomWidth='1'
                    borderStyle='solid'
                    style={{borderColor: 'rgba(229, 232, 235, 0.25)'}}
                >
                    <Box 
                        width={{
                            largeScreen: '25p',
                            wideScreen: '25p',
                            base: 'full'
                        }}
                        paddingTop={{
                            largeScreen: '40',
                            wideScreen: '40',
                            base: '20'
                        }}
                        alignItems={{
                            largeScreen: 'flex-start',
                            wideScreen: 'flex-start',
                            base: 'center'
                        }}
                        textAlign={{
                            largeScreen: 'left',
                            wideScreen: 'left',
                            base: 'center'
                        }}
                        display='flex'
                        flexDirection='column'
                    >
                        <Box 
                            display='flex'
                            alignItems='center'
                            justifyContent='center'
                            position='relative'
                            borderRadius='10'
                            maxHeight='full'
                            maxWidth='full'
                            cursor='default'
                        >
                            <Logo 
                                variant='secondary'
                            />
                        </Box>
                        <NextLink
                            href='/'
                            fontSize='20'
                            fontWeight='600'
                            marginY='8'
                            color='white'
                        >
                            OpenFish
                        </NextLink>
                        <Text 
                            color='white'
                        >
                            OpenFish is an example implementation of the Seaport marketplace protocol for educational purpose.
                        </Text>
                    </Box>
                    <Box 
                        width={{
                            largeScreen: '75p',
                            wideScreen: '75p',
                            base: 'full'
                        }}
                        paddingTop={{
                            largeScreen: '40',
                            wideScreen: '40',
                            base: '20'
                        }}
                        alignItems={{
                            largeScreen: 'flex-start',
                            wideScreen: 'flex-start'
                        }}
                        paddingLeft={{
                            largeScreen: '72',
                            wideScreen: '72'
                        }}
                        style={{height: 'fit-content'}}
                        flexWrap='wrap'
                        justifyContent='space-around'
                        display='flex'
                    >
                        <Box 
                            width={{
                                wideScreen: '20p',
                                largeScreen: '20p',
                                mediumScreen: '20p',
                                base: '50p'
                            }}
                            alignItems={{
                                wideScreen: 'flex-start',
                                largeScreen: 'flex-start',
                                mediumScreen: 'flex-start'
                            }}
                            display='flex'
                            flexDirection='column'
                            height={{
                                wideScreen: 'full',
                                largeScreen: 'full',
                                mediumScreen: 'full',
                                base: '50p'
                            }}
                            marginBottom='16'
                        >
                            <Box
                                marginY='16'
                                textAlign={{
                                    wideScreen: 'left',
                                    largeScreen: 'left',
                                    mediumScreen: 'left',
                                    base: 'center'
                                }}
                            >
                                <Text
                                    as='h3'
                                    fontWeight='600'
                                    color='white'
                                >
                                    Marketplace
                                </Text>
                            </Box>
                            <Box
                                as='ul' 
                            >
                                <Box
                                    as='li' 
                                    marginTop='12'
                                >
                                    <NextLink
                                        href='/assets'
                                        textAlign={{
                                            wideScreen: 'left',
                                            largeScreen: 'left',
                                            mediumScreen: 'left',
                                            base: 'center'
                                        }}
                                    >
                                        <Text
                                            color='white'
                                            fontSize='14'
                                            fontWeight={{
                                                hover: '500',
                                                active: '500'
                                            }}
                                        >
                                            All Assets
                                        </Text>
                                    </NextLink>
                                </Box>
                                <Box
                                    as='li' 
                                    marginTop='12'
                                >
                                    <NextLink
                                        href='/category/art'
                                        textAlign={{
                                            wideScreen: 'left',
                                            largeScreen: 'left',
                                            mediumScreen: 'left',
                                            base: 'center'
                                        }}
                                    >
                                        <Text
                                            color='white'
                                            fontSize='14'
                                            fontWeight={{
                                                hover: '500',
                                                active: '500'
                                            }}
                                        >
                                            Art
                                        </Text>
                                    </NextLink>
                                </Box>
                                <Box
                                    as='li' 
                                    marginTop='12'
                                >
                                    <NextLink
                                        href='/category/collectibles'
                                        textAlign={{
                                            wideScreen: 'left',
                                            largeScreen: 'left',
                                            mediumScreen: 'left',
                                            base: 'center'
                                        }}
                                    >
                                        <Text
                                            color='white'
                                            fontSize='14'
                                            fontWeight={{
                                                hover: '500',
                                                active: '500'
                                            }}
                                        >
                                            Collectibles
                                        </Text>
                                    </NextLink>
                                </Box>
                                <Box
                                    as='li' 
                                    marginTop='12'
                                >
                                    <NextLink
                                        href='/category/domain-names'
                                        textAlign={{
                                            wideScreen: 'left',
                                            largeScreen: 'left',
                                            mediumScreen: 'left',
                                            base: 'center'
                                        }}
                                    >
                                        <Text
                                            color='white'
                                            fontSize='14'
                                            fontWeight={{
                                                hover: '500',
                                                active: '500'
                                            }}
                                        >
                                            Domain Names
                                        </Text>
                                    </NextLink>
                                </Box>
                                <Box
                                    as='li' 
                                    marginTop='12'
                                >
                                    <NextLink
                                        href='/category/music'
                                        textAlign={{
                                            wideScreen: 'left',
                                            largeScreen: 'left',
                                            mediumScreen: 'left',
                                            base: 'center'
                                        }}
                                    >
                                        <Text
                                            color='white'
                                            fontSize='14'
                                            fontWeight={{
                                                hover: '500',
                                                active: '500'
                                            }}
                                        >
                                            Music
                                        </Text>
                                    </NextLink>
                                </Box>
                                <Box
                                    as='li' 
                                    marginTop='12'
                                >
                                    <NextLink
                                        href='/category/photography'
                                        textAlign={{
                                            wideScreen: 'left',
                                            largeScreen: 'left',
                                            mediumScreen: 'left',
                                            base: 'center'
                                        }}
                                    >
                                        <Text
                                            color='white'
                                            fontSize='14'
                                            fontWeight={{
                                                hover: '500',
                                                active: '500'
                                            }}
                                        >
                                            Photography
                                        </Text>
                                    </NextLink>
                                </Box>
                                <Box
                                    as='li' 
                                    marginTop='12'
                                >
                                    <NextLink
                                        href='/category/sports'
                                        textAlign={{
                                            wideScreen: 'left',
                                            largeScreen: 'left',
                                            mediumScreen: 'left',
                                            base: 'center'
                                        }}
                                    >
                                        <Text
                                            color='white'
                                            fontSize='14'
                                            fontWeight={{
                                                hover: '500',
                                                active: '500'
                                            }}
                                        >
                                            Sports
                                        </Text>
                                    </NextLink>
                                </Box>
                            </Box>
                        </Box>
                        <Box 
                            display='flex'
                            flexDirection='column'
                            width={{
                                wideScreen: '20p',
                                largeScreen: '20p',
                                mediumScreen: '20p',
                                base: '50p'
                            }}
                            alignItems={{
                                wideScreen: 'flex-start',
                                largeScreen: 'flex-start',
                                mediumScreen: 'flex-start'
                            }}
                            height={{
                                wideScreen: 'full',
                                largeScreen: 'full',
                                mediumScreen: 'full',
                                base: '50p'
                            }}
                            marginBottom='16'
                        >
                            <Box
                                marginY='16'
                                textAlign={{
                                    wideScreen: 'left',
                                    largeScreen: 'left',
                                    mediumScreen: 'left',
                                    base: 'center'
                                }}
                            >
                                <Text
                                    as='h3'
                                    fontWeight='600'
                                    color='white'
                                >
                                    My Account
                                </Text>
                            </Box>
                            <Box
                                as='ul' 
                                marginBottom='16'
                            >
                                <Box
                                    as='li' 
                                    marginTop='12'
                                >
                                    <NextLink
                                        href='/account'
                                        textAlign={{
                                            wideScreen: 'left',
                                            largeScreen: 'left',
                                            mediumScreen: 'left',
                                            base: 'center'
                                        }}
                                    >
                                        <Text
                                            color='white'
                                            fontSize='14'
                                            fontWeight={{
                                                hover: '500',
                                                active: '500'
                                            }}
                                        >
                                            Profile
                                        </Text>
                                    </NextLink>
                                </Box>
                                <Box
                                    as='li' 
                                    marginTop='12'
                                >
                                    <NextLink
                                        href='/account?tab=favorites'
                                        textAlign={{
                                            wideScreen: 'left',
                                            largeScreen: 'left',
                                            mediumScreen: 'left',
                                            base: 'center'
                                        }}
                                    >
                                        <Text
                                            color='white'
                                            fontSize='14'
                                            fontWeight={{
                                                hover: '500',
                                                active: '500'
                                            }}
                                        >
                                            Favorites
                                        </Text>
                                    </NextLink>
                                </Box>
                                <Box
                                    as='li' 
                                    marginTop='12'
                                >
                                    <NextLink
                                        href='/collections'
                                        textAlign={{
                                            wideScreen: 'left',
                                            largeScreen: 'left',
                                            mediumScreen: 'left',
                                            base: 'center'
                                        }}
                                    >
                                        <Text
                                            color='white'
                                            fontSize='14'
                                            fontWeight={{
                                                hover: '500',
                                                active: '500'
                                            }}
                                        >
                                            My Collections
                                        </Text>
                                    </NextLink>
                                </Box>
                                <Box
                                    as='li' 
                                    marginTop='12'
                                >
                                    <NextLink
                                        href='/account/settings'
                                        textAlign={{
                                            wideScreen: 'left',
                                            largeScreen: 'left',
                                            mediumScreen: 'left',
                                            base: 'center'
                                        }}
                                    >
                                        <Text
                                            color='white'
                                            fontSize='14'
                                            fontWeight={{
                                                hover: '500',
                                                active: '500'
                                            }}
                                        >
                                            Settings
                                        </Text>
                                    </NextLink>
                                </Box>
                            </Box>
                            <Box
                                marginBottom='16'
                                marginTop='48'
                                textAlign={{
                                    wideScreen: 'left',
                                    largeScreen: 'left',
                                    mediumScreen: 'left',
                                    base: 'center'
                                }}
                            >
                                <Text
                                    as='h3'
                                    fontWeight='600'
                                    color='white'
                                >
                                    Stats
                                </Text>
                            </Box>
                            <Box
                                as='ul' 
                            >
                                <Box
                                    as='li' 
                                    marginTop='12'
                                >
                                    <NextLink
                                        href='/rankings'
                                        textAlign={{
                                            wideScreen: 'left',
                                            largeScreen: 'left',
                                            mediumScreen: 'left',
                                            base: 'center'
                                        }}
                                    >
                                        <Text
                                            color='white'
                                            fontSize='14'
                                            fontWeight={{
                                                hover: '500',
                                                active: '500'
                                            }}
                                        >
                                            Rankings
                                        </Text>
                                    </NextLink>
                                </Box>
                            </Box>
                        </Box>
                        <Box 
                            display='flex'
                            flexDirection='column'
                            width={{
                                wideScreen: '20p',
                                largeScreen: '20p',
                                mediumScreen: '20p',
                                base: '50p'
                            }}
                            alignItems={{
                                wideScreen: 'flex-start',
                                largeScreen: 'flex-start',
                                mediumScreen: 'flex-start'
                            }}
                            height={{
                                wideScreen: 'full',
                                largeScreen: 'full',
                                mediumScreen: 'full',
                                base: '50p'
                            }}
                            marginBottom='16'
                        >
                            <Box
                                marginY='16'
                                textAlign={{
                                    wideScreen: 'left',
                                    largeScreen: 'left',
                                    mediumScreen: 'left',
                                    base: 'center'
                                }}
                            >
                                <Text
                                    as='h3'
                                    fontWeight='600'
                                    color='white'
                                >
                                    Resources
                                </Text>
                            </Box>
                            <Box
                                as='ul' 
                            >
                                <Box
                                    as='li' 
                                    marginTop='12'
                                >
                                    <NextLink
                                        href='https://github.com/JasperAlexander/seaport-frontend/discussions'
                                        textAlign={{
                                            wideScreen: 'left',
                                            largeScreen: 'left',
                                            mediumScreen: 'left',
                                            base: 'center'
                                        }}
                                    >
                                        <Text
                                            color='white'
                                            fontSize='14'
                                            fontWeight={{
                                                hover: '500',
                                                active: '500'
                                            }}
                                        >
                                            Help Center
                                        </Text>
                                    </NextLink>
                                </Box>
                            </Box>
                        </Box>
                        <Box 
                            display='flex'
                            flexDirection='column'
                            width={{
                                wideScreen: '20p',
                                largeScreen: '20p',
                                mediumScreen: '20p',
                                base: '50p'
                            }}
                            alignItems={{
                                wideScreen: 'flex-start',
                                largeScreen: 'flex-start',
                                mediumScreen: 'flex-start'
                            }}
                            height={{
                                wideScreen: 'full',
                                largeScreen: 'full',
                                mediumScreen: 'full',
                                base: '50p'
                            }}
                            marginBottom='16'
                        >
                            <Box
                                marginY='16'
                                textAlign={{
                                    wideScreen: 'left',
                                    largeScreen: 'left',
                                    mediumScreen: 'left',
                                    base: 'center'
                                }}
                            >
                                <Text
                                    as='h3'
                                    fontWeight='600'
                                    color='white'
                                >
                                    Company
                                </Text>
                            </Box>
                            <Box
                                as='ul' 
                            >
                                <Box
                                    as='li' 
                                    marginTop='12'
                                >
                                    <NextLink
                                        href='https://github.com/JasperAlexander/seaport-frontend'
                                        textAlign={{
                                            wideScreen: 'left',
                                            largeScreen: 'left',
                                            mediumScreen: 'left',
                                            base: 'center'
                                        }}
                                    >
                                        <Text
                                            color='white'
                                            fontSize='14'
                                            fontWeight={{
                                                hover: '500',
                                                active: '500'
                                            }}
                                        >
                                            About
                                        </Text>
                                    </NextLink>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Box>
                <Box 
                    display='flex'
                    alignItems='center'
                    justifyContent='space-between'
                    marginY='20'
                    flexWrap='wrap'
                >
                    <Box 
                        width={{
                            wideScreen: '75p',
                            largeScreen: '75p',
                            mediumScreen: '75p',
                            base: 'full'
                        }}
                        display='flex'
                        justifyContent={{
                            wideScreen: 'flex-start',
                            largeScreen: 'flex-start',
                            mediumScreen: 'flex-start',
                            base: 'center'
                        }}
                        marginY='12'
                    >
                        <Text
                            as='p'
                            fontSize='12'
                            color='white'
                        >
                            © 2022 - 2022 OpenFish
                        </Text>
                    </Box>
                    <Box 
                        justifyContent={{
                            wideScreen: 'flex-end',
                            largeScreen: 'flex-end',
                            mediumScreen: 'flex-end',
                            base: 'center'
                        }}
                        display='flex'
                        width={{
                            wideScreen: '25p',
                            largeScreen: '25p',
                            mediumScreen: '25p',
                            base: 'full'
                        }}
                        textAlign={{
                            wideScreen: 'left',
                            largeScreen: 'left',
                            mediumScreen: 'left',
                            base: 'center'
                        }}
                    >
                        <NextLink
                            href='/privacy'
                        >
                            <Text
                                fontSize='12'
                                color='white'
                                fontWeight={{
                                    hover: '500',
                                    active: '500'
                                }}
                            >
                                Privacy Policy
                            </Text>
                        </NextLink>
                        <NextLink
                            href='/tos'
                            marginLeft='12'
                        >
                            <Text
                                fontSize='12'
                                color='white'
                                fontWeight={{
                                    hover: '500',
                                    active: '500'
                                }}
                            >
                                Terms of Service
                            </Text>
                        </NextLink>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}