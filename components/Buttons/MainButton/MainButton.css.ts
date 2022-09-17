import { style } from '@vanilla-extract/css'
import { sprinkles } from '../../../styles/sprinkles.css'

export const mainButton = style([sprinkles({
    display: 'inline-flex',
    gap: '8',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    boxShadow: { 
        hover: 'subHeader' 
    },
    opacity: { 
        disabled: 'disabled' 
    },
    cursor: { 
        base: 'pointer', 
        disabled: 'default' 
    },

    borderRadius: '10',
    borderWidth: '2',
    borderStyle: 'solid'
})])