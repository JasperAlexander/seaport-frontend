import { FC, forwardRef, Ref } from 'react'
import Tippy from '@tippyjs/react'
import { Box } from '../Box/Box'
import { NextLink } from '../NextLink/NextLink'
import { Text } from '../Text/Text'

export const BodyHeaderNavBarExploreItem: FC = () => {
    const ExploreLink = forwardRef((props, ref: Ref<HTMLElement>) => (
        <NextLink 
            href='/assets' 
            ref={ref}
            paddingX='10'
            display='flex'
            alignItems='center'
            height='72'
        >
        <Text
            fontWeight='600'
        >
            Explore
        </Text>
        </NextLink>
    ))

    return (
        <Tippy
            interactive={true}
            offset={[0, 0]}
            trigger='mouseenter'
            animation={false}
            delay={[0, 0]}
            duration={0}
            allowHTML={true}
            render={attrs => (
                <Box 
                {...attrs}
                background='defaultBackground'
                position='relative'
                borderBottomLeftRadius='10'
                borderBottomRightRadius='10'
                fontSize='14'
                fontWeight='600'
                style={{
                    overflowWrap: 'break-word',
                    minWidth: '220px',
                    maxHeight: 'calc(-72px + 100vh)',
                    boxShadow: 'rgba(0, 0, 0, 0.16) 0px 4px 16px',

                }}
                >
                <Box
                    borderBottomWidth='1'
                    borderStyle='solid'
                    borderColor='box'
                    borderBottomLeftRadius={{
                        lastchild: '10'
                    }}
                    borderBottomRightRadius={{
                        lastchild: '10'
                    }}
                    width='full'
                >
                    <NextLink 
                    href='/assets'
                    overflow='hidden'
                    display='flex'
                    alignItems='center'
                    padding='16'
                    gap='16'
                    width='full'
                    boxShadow={{
                        hover: 'header'
                    }}
                    background={{
                        hover: 'accordionBackground'
                    }}
                    style={{transition: 'all 0.2s ease 0s'}}
                    >
                    <Text
                        fontWeight='600'
                    >
                        All assets
                    </Text>
                    </NextLink>
                </Box>
                <Box
                    borderBottomWidth='1'
                    borderStyle='solid'
                    borderColor='box'
                    borderBottomLeftRadius='10'
                    borderBottomRightRadius='10'
                    overflow='hidden'
                    width='full'
                >
                    <NextLink 
                    href='/'
                    overflow='hidden'
                    display='flex'
                    alignItems='center'
                    padding='16'
                    gap='16'
                    width='full'
                    boxShadow={{
                        hover: 'header'
                    }}
                    background={{
                        hover: 'accordionBackground'
                    }}
                    style={{transition: 'all 0.2s ease 0s'}}
                    >
                    <Text
                        fontWeight='600'
                    >
                        All collections
                    </Text>
                    </NextLink>
                </Box>
                </Box>
            )}
            >
            <ExploreLink />
        </Tippy>
    )
}