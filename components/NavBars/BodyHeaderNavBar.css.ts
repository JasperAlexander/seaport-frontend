import { style } from '@vanilla-extract/css'
import { sprinkles } from '../../styles/sprinkles.css'

export const bodyHeaderNavBar = style([sprinkles({
    display: 'flex',
    flexWrap: 'wrap',
    paddingX: '10',
    height: 'full'
})])