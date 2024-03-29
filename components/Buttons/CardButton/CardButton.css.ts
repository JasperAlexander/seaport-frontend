import { style } from '@vanilla-extract/css'
import { sprinkles } from '../../../styles/sprinkles.css'

export const cardButtonContainer = style([sprinkles({
    // Added hover effect here for readability, effect is also defined in globals.css
    bottom: {
        base: '-40',
        hover: '0'
    },
    transition: 'bottom',
    width: 'full',
    position: 'absolute',
    left: '0',
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
    marginRight: '8',
    zIndex: '100'
})])

export const cardButton = style([sprinkles({
    display: 'inline-flex',
    gap: '8',
    alignItems: 'center',
    justifyContent: 'center',

    width: 'full',
    height: '36',

    background: {
        base: 'accentColor',
        hover: 'accentColorHover',
        active: 'accentColorHover'
    },
    opacity: { 
        disabled: 'disabled' 
    },
    cursor: { 
        disabled: 'default' 
    },
    boxShadow: {
        hover: 'subHeader'
    },

    borderBottomLeftRadius: '10',
    borderBottomRightRadius: '10',
    borderStyle: 'solid',
    borderWidth: '2',
    borderColor: 'accentColor',

    fontSize: '14',
    fontWeight: '500',
    color: 'accentColorText',

    paddingX: '24',
    paddingY: '16'
})])