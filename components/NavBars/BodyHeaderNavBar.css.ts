import { style } from '@vanilla-extract/css'
import { sprinkles } from '../../styles/sprinkles.css'

export const bodyHeaderNavBar = style([sprinkles({
    display: 'flex',
    flexWrap: 'wrap',
    paddingX: '10',
    height: 'full'
})])

export const bodyHeaderNavBarContainer = style([sprinkles({
    display: {
        base: 'none',
        largeScreen: 'flex',
        wideScreen: 'flex'
    },
    alignItems: 'center'
})])

export const bodyHeaderNavBarItem = style([sprinkles({
    paddingX: '16',
    display: 'flex',
    alignItems: 'center',
    height: '72'
})])