import { style } from '@vanilla-extract/css'
import { sprinkles } from '../../styles/sprinkles.css'

export const closeDialogContentButton = style([sprinkles({
    position: 'absolute',
    right: '24',
    top: '24',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
})])