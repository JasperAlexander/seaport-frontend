import Link from 'next/link'
import { FC, ReactNode } from 'react'
import { Box, BoxProps } from '../Box/Box'


const sizeVariants: Record<
    'small' | 'medium' | 'large',
    {
        fontSize: BoxProps['fontSize']
        paddingX: BoxProps['paddingX']
        paddingY: BoxProps['paddingY']
    }
> = {
    large: {
        fontSize: '20',
        paddingX: '28',
        paddingY: '20'
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
    onClick: () => void
    href?: string
    disabled?: boolean
    size?: 'small' | 'medium' | 'large'
    variant?: 'primary' | 'secondary'
    width?: BoxProps['width']
}

export const MainButton: FC<Props> = ({ 
    children,
    onClick,
    href,
    disabled = false,
    size = 'medium',
    variant = 'primary',
    width = 'initial'
}) => {
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
            wrapper={(children: ReactNode) => <Link href={`${href}`} passHref={true}>{children}</Link>}
        >
            <Box
                as={href ? 'a' : 'button'}
                onClick={onClick}
                disabled={disabled}

                display='inline-flex'
                gap='8'
                alignItems='center'
                justifyContent='center'

                width={width}

                boxShadow={{ hover: 'subHeader' }}
                background={background}
                opacity={{ disabled: 'disabled' }}
                cursor={{ disabled: 'default' }}

                borderRadius='10'
                borderWidth='2'
                borderStyle='solid'
                borderColor={borderColor}

                fontSize={fontSize}
                fontWeight='600'
                color={color}

                paddingX={paddingX}
                paddingY={paddingY}
            >
                {children}
            </Box>
        </ConditionalLink>
    )
}