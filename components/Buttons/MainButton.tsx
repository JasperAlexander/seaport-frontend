import Link from 'next/link'
import { forwardRef, ReactNode, Ref } from 'react'
import { Box, BoxProps } from '../Box/Box'
import { Text } from '../Text/Text'

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
    disabled?: boolean
    size?: 'small' | 'medium' | 'large'
    variant?: 'primary' | 'secondary'
    width?: BoxProps['width']
}

/**
 * Main button component, has a default padding of 12px, 
 * boxShadow and background will change on hover
 * @param children will be wrapped inside HTML span element which is wrapped inside HTML button or link element
 * @param onClick defaults null
 * @param href if this param is passed, button will be a link, wrapped inside a Next.js Link component
 * @param disabled defaults to false
 * @param size defaults to medium
 * @param variant defaults to primary which has accentColor as background in contrast to secondary which has defaultBackground as background
 * @param width defaults to initial
 */
export const MainButton = forwardRef (
    (
        {
            children,
            onClick = () => { return null },
            href,
            disabled = false,
            size = 'medium',
            variant = 'primary',
            width = 'initial',
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
                    type='button'
                    onClick={onClick}
                    disabled={disabled}
                    ref={ref}
                    {...props}

                    display='inline-flex'
                    gap='8'
                    alignItems='center'
                    justifyContent='center'
                    textAlign='center'

                    width={width}

                    boxShadow={{ hover: 'subHeader' }}
                    background={background}
                    opacity={{ disabled: 'disabled' }}
                    cursor={{ base: 'pointer', disabled: 'default' }}

                    borderRadius='10'
                    borderWidth='2'
                    borderStyle='solid'
                    borderColor={borderColor}

                    paddingX={paddingX}
                    paddingY={paddingY}
                >
                    <Text
                        as='span'
                        fontSize={fontSize}
                        fontWeight='600'
                        color={color}
                    >
                        {children}
                    </Text>
                </Box>
            </ConditionalLink>
        )
    }
)