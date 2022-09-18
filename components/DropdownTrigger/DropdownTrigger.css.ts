import { style } from '@vanilla-extract/css'
import { sprinkles } from '../../styles/sprinkles.css'

export const dropdownContentContainer = style([sprinkles({
    background: 'defaultBackground',
    position: 'relative',
    borderBottomLeftRadius: '10',
    borderBottomRightRadius: '10',
    fontSize: '14',
    fontWeight: '600',
    boxShadow: 'dropdown'
})])
