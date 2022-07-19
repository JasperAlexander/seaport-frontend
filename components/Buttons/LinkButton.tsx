import Link from 'next/link'
import React from 'react'
import { touchableStyles } from '../../styles/touchableStyles'
import { Box } from '../Box/Box'

export function LinkButton({
    children,
    href,
}: {
    children?: React.ReactNode
    href: string
}) {
  return (
    <Box 
        color='alpha900' 
        className={touchableStyles({ 
            hoverColor: 'black', 
        })}
    >
        <Link href={href}>
            <a>{children}</a>
        </Link>
    </Box>
  )
}