import { keyframes, style } from '@vanilla-extract/css'
import { sprinkles } from '../../styles/sprinkles.css'

const slideUp = keyframes({
  '0%': { transform: 'translateY(100%)' },
  '100%': { transform: 'translateY(0)' },
})

const fadeIn = keyframes({
  '0%': { opacity: 0 },
  '100%': { opacity: 1 },
})

const bleed = 0
export const overlay = style([
  sprinkles({
    backdropFilter: 'modal',
    background: 'modalBackdrop',
    display: 'flex',
    justifyContent: 'center',
    position: 'fixed',
  }),
  {
    animation: `${fadeIn} 150ms ease`,
    bottom: -bleed,
    left: -bleed,
    padding: bleed,
    right: -bleed,
    // top: -bleed,
    top: '72px',
    transform: 'translateZ(0)', // This is required for content to render under the URL bar on iOS
    zIndex: '200'
  },
])

export const content = style([
  sprinkles({
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
  }),
  {
    // animation: `${slideUp} 350ms cubic-bezier(.15,1.15,0.6,1.00), ${fadeIn} 150ms ease`,
    maxWidth: '100vw',
  },
])