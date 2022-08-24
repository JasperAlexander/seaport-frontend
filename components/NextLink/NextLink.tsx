import Link from 'next/link'
import { FC, forwardRef, ReactNode, Ref } from 'react'
import { Box, BoxProps } from '../Box/Box'

interface Props extends BoxProps {
    children: ReactNode
    href: string
}

/**
 * Wraps HTML link element inside Next.js Link component
 * @param children will be wrapped inside HTML link element
 * @param href path or URL to navigate to
 * @param props props passed to HTML link element
 * @param ref will be forwarded to HTML link element
 */
export const NextLink = forwardRef(
    (
        { 
            children,
            href,
            ...props
        }: Props,
        ref: Ref<HTMLElement>
    ) => {
        return (
            <Link
                href={href}
                passHref={true}
            >
                <Box
                    as='a'
                    ref={ref}
                    {...props}
                >
                    {children}
                </Box>
            </Link>
        )
    }
)