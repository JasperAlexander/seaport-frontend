import { FC, JSXElementConstructor, ReactElement } from 'react'
import Tippy from '@tippyjs/react'
import { Box } from '../Box/Box'
import { ExploreDropdownContent } from '../DropdownContents/ExploreDropdownContent'

interface Props {
    children: ReactElement<any, string | JSXElementConstructor<any>> | undefined
}

export const ExploreDropdownTrigger: FC<Props> = ({
    children
}) => {
    return (
        <Tippy
            offset={[0, 0]}
            placement='bottom'
            trigger='mouseenter'

            animation={false}
            delay={[0, 0]}
            duration={0}

            interactive={true}
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
                        boxShadow: 'rgba(0, 0, 0, 0.16) 0px 4px 16px'
                    }}
                >
                    <ExploreDropdownContent />
                </Box>
            )}
        >
            {children}
        </Tippy>
    )
}