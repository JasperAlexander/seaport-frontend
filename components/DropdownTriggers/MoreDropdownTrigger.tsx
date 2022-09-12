import { FC, JSXElementConstructor, ReactElement } from 'react'
import Tippy from '@tippyjs/react'
import { Box } from '../Box/Box'
import { MoreDropdownContent } from '../DropdownContents/MoreDropdownContent'

interface Props {
    children: ReactElement<any, string | JSXElementConstructor<any>> | undefined
}

export const MoreDropdownTrigger: FC<Props> = ({
    children
}) => {
    return (
        <Tippy
            offset={[0, 10]}
            placement='bottom-start'
            trigger='click'
            zIndex={1}

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
                    borderRadius='10'
                    fontSize='14'
                    fontWeight='600'
                    boxShadow='dropdown'
                    style={{
                        overflowWrap: 'break-word',
                        minWidth: '220px',
                        maxHeight: 'calc(-72px + 100vh)'
                    }}
                >
                    <MoreDropdownContent />
                </Box>
            )}
        >
            {children}
        </Tippy>
    )
}