import { style } from '@vanilla-extract/css'
import { sprinkles } from '../../styles/sprinkles.css'

export const formSectionItem = style([sprinkles({
    paddingY: '16',
    borderBottomWidth: '1',
    borderStyle: 'solid',
    borderColor: 'box'
})])

export const formSectionItemButton = style([sprinkles({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: '2',
    borderStyle: 'solid',
    borderColor: 'box',
    borderRadius: '10',
    padding: '16',
    boxShadow: {
        hover: 'subHeader'
    },
    background: {
        active: 'buttonBackgroundActive'
    }
})])