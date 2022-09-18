import { FC, JSXElementConstructor, ReactElement } from 'react'
import { Box } from '../Box/Box'
import Tippy from '@tippyjs/react'
import * as styles from './DropdownTrigger.css'

interface Props {
    children: ReactElement<any, string | JSXElementConstructor<any>> | undefined
    content: JSX.Element
    placement?: 'bottom' | 'bottom-start'
    trigger?: 'mouseenter' | 'click'
    offsetDistance?: number
}

/**
 * Triggers Tippy.js dropdown
 * @param children will be the trigger that activates Tippy.js content
 * @param content will be wrapped inside container inside Tippy.js
 * @param placement defaults to bottom-start, location of dropdown
 * @param trigger defaults to click, trigger action
 * @param offsetDistance defaults to 0, distance in px
 */
export const DropdownTrigger: FC<Props> = ({
    children,
    content,
    placement = 'bottom-start',
    trigger = 'click',
    offsetDistance = 0
}) => {
    return (
        <Tippy
            offset={[0, offsetDistance]}
            placement={placement}
            trigger={trigger}

            animation={false}
            delay={[0, 0]}
            duration={0}

            interactive={true}
            allowHTML={true}
            render={attrs => (
                <Box 
                    {...attrs}
                    className={styles.dropdownContentContainer}
                    style={{
                        overflowWrap: 'break-word',
                        minWidth: '220px',
                        maxHeight: 'calc(-72px + 100vh)'
                    }}
                >
                    {content}
                </Box>
            )}
        >
            {children}
        </Tippy>
    )
}