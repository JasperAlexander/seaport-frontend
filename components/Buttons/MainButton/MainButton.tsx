import Link from 'next/link'
import { forwardRef, Fragment, ReactNode, Ref } from 'react'
import { Box, BoxProps } from '../../Box/Box'
import { Text } from '../../Text/Text'
import * as styles from './MainButton.css'

const sizeVariants: Record<
    'small' | 'medium' | 'large',
    {
        fontSize: BoxProps['fontSize']
        paddingX: BoxProps['paddingX']
        paddingY: BoxProps['paddingY']
    }
> = {
    large: {
        fontSize: '16',
        paddingX: '48',
        paddingY: '16'
    },
    medium: {
        fontSize: '16',
        paddingX: '24',
        paddingY: '16'
    },
    small: {
        fontSize: '14',
        paddingX: '20',
        paddingY: '10'
    }
}

const typeVariants: Record<
    'primary' | 'secondary',
    {
        background: BoxProps['background']
        borderColor: BoxProps['borderColor']
        color: BoxProps['color']
    }
> = {
    primary: {
        background: {
            base: 'accentColor',
            hover: 'accentColorHover',
            // active: 'accentColorHover'
        },
        borderColor: {
            base: 'accentColor',
            hover: 'accentColorHover',
            // active: 'accentColorHover'
        },
        color: 'defaultBackground'
    },
    secondary: {
        background: {
            base: 'defaultBackground',
            active: 'buttonBackgroundActive'
        },
        borderColor: 'box',
        color: 'accentColor'
    }
}

interface Props {
    children: ReactNode
    onClick?: () => void
    href?: string
    type?: 'button' | 'submit'
    disabled?: boolean
    size?: 'small' | 'medium' | 'large'
    variant?: 'primary' | 'secondary'
    width?: BoxProps['width']
    onlyText?: boolean
}

/**
 * Main button component, has a default padding of 12px, 
 * boxShadow and background will change on hover
 * @param children will be wrapped inside HTML span element which is wrapped inside HTML button or link element
 * @param onClick defaults null
 * @param href if this param is passed, button will be a link, wrapped inside a Next.js Link component
 * @param type defaults to button
 * @param disabled defaults to false
 * @param size defaults to medium
 * @param variant defaults to primary which has accentColor as background in contrast to secondary which has defaultBackground as background
 * @param width defaults to initial
 * @param onlyText defaults to true, won't wrap children inside HTML span element if true
 */
export const MainButton = forwardRef (
    (
        {
            children,
            onClick = () => { return null },
            href,
            type = 'button',
            disabled = false,
            size = 'medium',
            variant = 'primary',
            width = 'initial',
            onlyText = true,
            ...props
        }: Props,
        ref: Ref<HTMLElement>
    ) => {
        const { fontSize, paddingX, paddingY } = sizeVariants[size]
        const { background, borderColor, color } = typeVariants[variant]

        const ConditionalLink = ({
            condition,
            wrapper,
            children
        }: {
            condition: any
            wrapper: any
            children: ReactNode
        }) => condition ? wrapper(children) : children

        return (
            <ConditionalLink 
                condition={href}
                wrapper={(children: ReactNode) => 
                    <Link 
                        href={`${href}`} 
                        passHref={true}
                    >
                        {children}
                    </Link>
                }
            >
                <Box
                    as={href ? 'a' : 'button'}
                    type={type}
                    onClick={onClick}
                    disabled={disabled}
                    ref={ref}
                    {...props}
                    
                    className={styles.mainButton}
                    width={width}
                    background={background}
                    borderColor={borderColor}

                    paddingX={paddingX}
                    paddingY={paddingY}
                >
                    {onlyText 
                        ?
                            <Text
                                as='span'
                                fontSize={fontSize}
                                fontWeight='600'
                                color={color}
                            >
                                {children}
                            </Text>
                        :
                            <Fragment>
                                {children}
                            </Fragment>
                    }
                </Box>
            </ConditionalLink>
        )
    }
)