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
    maxHeight: 'full',
    transform: 'center'
})])

export const smallDialogContentContainer = style([
    dialogContentContainer,
    sprinkles({
        height: 'dialogHeightSmall',
        width: 'dialogWidthSmall'
    })
])

export const largeDialogContentContainer = style([
    dialogContentContainer,
    sprinkles({
        height: 'dialogHeightLarge',
        width: 'dialogWidthLarge'
    })
])

export const sideDialogContentContainer = style([sprinkles({
    background: 'defaultBackground',
    zIndex: '900',
    position: 'fixed',
    top: '72',
    right: '0',
    overflowY: 'scroll',
    borderStyle: 'solid',
    borderWidth: '1',
    borderColor: 'box',
    height: 'fullmain',
    width: {
        base: 'full',
        largeScreen: '420',
        wideScreen: '420'
    }
})])

export const sideDialogMenuItem = style([sprinkles({
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '72',
    minHeight: '72',
    paddingX: '10'
})])