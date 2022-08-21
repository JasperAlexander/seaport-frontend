import { style } from '@vanilla-extract/css'
import { sprinkles } from '../../styles/sprinkles.css'

export const dialogContentContainer = style([sprinkles({
    background: 'defaultBackground',
    zIndex: '900',
    position: 'fixed',
    top: '50p',
    left: '50p',
    borderRadius: '16',
    maxWidth: 'full',
    maxHeight: 'full'
})])

export const sideDialogContentContainer = style([sprinkles({
    background: 'defaultBackground',
    zIndex: '900',
    position: 'fixed',
    top: '72',
    right: '0',
    overflowY: 'scroll'
})])

export const dialogContentHeader = style([sprinkles({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    padding: '24',
    fontWeight: '600',
    color: 'defaultText',
    width: 'full',
    fontSize: '20'
})])