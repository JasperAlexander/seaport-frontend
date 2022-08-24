import { style } from '@vanilla-extract/css'
import { sprinkles } from '../../../styles/sprinkles.css'

export const dialogContentHeader = style([sprinkles({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    padding: '24',
    width: 'full'
})])

export const dialogContentHeaderText = style([sprinkles({
    fontSize: '20',
    fontWeight: '600'
})])