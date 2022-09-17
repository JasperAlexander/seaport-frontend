import { style } from '@vanilla-extract/css'
import { sprinkles } from '../../../styles/sprinkles.css'

export const roundButton = style([sprinkles({
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',

    borderRadius: '50p',
    boxShadow: {
        hover: 'subHeader'
    },
    background: {
        base: 'defaultBackground',
        active: 'buttonBackgroundActive'
    },

    opacity: { 
        disabled: 'disabled' 
    },
    cursor: { 
        base: 'pointer', 
        disabled: 'default' 
    },

    padding: '12'
})])