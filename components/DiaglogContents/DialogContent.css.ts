import { style } from '@vanilla-extract/css'
import { sprinkles } from '../../styles/sprinkles.css'

export const dialogContentHeader = style([sprinkles({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    padding: '24',
    fontWeight: '600',
    width: 'full',
    fontSize: '20'
})])