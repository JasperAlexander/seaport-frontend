import { style } from '@vanilla-extract/css'
import { sprinkles } from '../../../styles/sprinkles.css'

export const assetGridHeaderSmall = style([sprinkles({
    height: '66',
    top: '71',
    alignItems: 'center',
    paddingX: '16',
    background: 'defaultBackground',
    zIndex: '200',
    display: {
        base: 'flex',
        largeScreen: 'none',
        wideScreen: 'none'
    }
})])

export const assetGridHeaderLarge = style([sprinkles({
    
})])

export const assetGridHeaderButton = style([sprinkles({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '50p',
    borderRadius: '10',
    borderStyle: 'solid',
    borderWidth: '2',
    borderColor: 'box',
    paddingY: '12',
    fontWeight: '600',
    gap: '8',
    boxShadow: {
        hover: 'subHeader'
    },
    background: {
        active: 'buttonBackgroundActive'
    }
})])