import { style } from '@vanilla-extract/css'
import { sprinkles } from '../../styles/sprinkles.css'

export const dialogTriggerOverlay = style([sprinkles({
    position: 'fixed',
    inset: '0',
    zIndex: '800',
    background: 'defaultBackgroundShadow',
    cursor: 'default'
})])

export const sideDialogTriggerOverlay = style([sprinkles({
    position: 'fixed',
    top: '72',
    left: '0',
    bottom: '0',
    right: '0',
    zIndex: '800',
    background: 'defaultBackgroundShadow'
})])
