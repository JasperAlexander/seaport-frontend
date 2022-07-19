import { style } from '@vanilla-extract/css'
import { sprinkles } from '../../styles/sprinkles.css'

export const gridLayout = style([
  sprinkles({
    display: 'grid',
    gridTemplateColumns: 'repeat(1, 1fr)'
  }),
  {
    '@media': {
      [`screen and (min-width: 340px)`]: {
        gridTemplateColumns: 'repeat(2, 1fr)'
      },
      [`screen and (min-width: 500px)`]: {
        gridTemplateColumns: 'repeat(3, 1fr)',
      },
      [`screen and (min-width: 800px)`]: {
        gridTemplateColumns: 'repeat(4, 1fr)',
      },
    },
  },
])
