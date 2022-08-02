import React from 'react'
import { sprinkles } from '../../styles/sprinkles.css'
import { Box, BoxProps } from '../Box/Box'
import { Text, TextProps } from '../Text/Text'

type Size = 'small' | 'medium' | 'large'

const sizeVariants: Record<
  Size,
  {
    paddingX: BoxProps['paddingX']
    paddingY: BoxProps['paddingY']
    fontSize: TextProps['size']
    height?: BoxProps['height']
  }
> = {
  large: {
    fontSize: '16',
    paddingX: '24',
    paddingY: '20',
  },
  medium: {
    fontSize: '14',
    height: '28',
    paddingX: '12',
    paddingY: '4',
  },
  small: {
    fontSize: '14',
    paddingX: '10',
    paddingY: '5',
  },
}

export function Button({
  children,
  href,
  label,
  onClick,
  rel = 'noreferrer noopener',
  size = 'large',
  target = '_blank',
  type = 'primary',
}: {
  children?: React.ReactNode
  href?: string
  label?: string
  onClick?: () => void
  rel?: string
  size?: Size
  target?: string
  type?: 'primary' | 'secondary'
}) {
  const isPrimary = type === 'primary'
  const isNotLarge = size !== 'large'
  const background = isPrimary
    ? 'accentColor'
    : isNotLarge
    ? 'actionButtonSecondaryBackground'
    : null
  const { fontSize, height, paddingX, paddingY } = sizeVariants[size]
  return (
    <Box
      {...(href
        ? { as: 'a', href, rel, target }
        : { as: 'button', type: 'button' })}
      onClick={onClick}
      borderRadius='10'
      boxShadow='default'
    className={sprinkles({
        background: {
          hover: 'accentColorHover'
        },
        boxShadow: {
          hover: 'default'
        },
    })}
      display="block"
      paddingX={paddingX}
      paddingY={paddingY}
      style={{ willChange: 'transform', margin: '10px 0px' }}
      textAlign="center"
      transition="default"
      {...(background ? { background } : {})}
      {...(height ? { height } : {})}
    >
      <Text
        color={isPrimary ? 'accentColorText' : 'accentColor'}
        size={fontSize}
        weight="bold"
      >
        {label ? label : children}
      </Text>
    </Box>
  )
}