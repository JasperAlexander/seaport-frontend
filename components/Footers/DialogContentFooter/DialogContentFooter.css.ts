import { style } from '@vanilla-extract/css'
import { sprinkles } from '../../../styles/sprinkles.css'

export const dialogContentFooter = style([sprinkles({
    padding: '24',
    width: 'full'
})])

export const dialogContentFooterContent = style([sprinkles({
    display: 'flex',
    alignItems: 'center',
    width: 'full',
    gap: '12'
})])
